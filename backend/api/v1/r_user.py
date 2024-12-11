from datetime import timedelta
from fastapi import APIRouter, Body, Depends, HTTPException, Header, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from sqlalchemy.orm import Session
import db
from utils import auth

router = APIRouter()


@router.post("/register")
def register_user(user: db.models.UserCreate, _db: Session = Depends(db.conn.get_db)):
    db_user = db.crud.get_user_by_username(_db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return db.crud.create_user(_db=_db, user=user)


@router.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), _db: Session = Depends(db.conn.get_db)):
    user = auth.authenticate_user(form_data.username, form_data.password, _db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)

    user_data = {
        "u_name":    user.username,
        "u_group_id":user.group_id,
        "u_role_id": user.role_id 
    }
    
    access_token = auth.encode_jwt(
        data=user_data,
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/verify-token/{token}")
async def verify_user_token(token: str):
    # path parameter approach
    payload = auth.verify_token(token=token)
    return payload


@router.get("/verify-token")
async def verify_user_token(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=403, detail="Invalid or missing token")

    token = authorization.split(" ")[1]
    payload = auth.verify_token(token=token)  # Validate the token
    return payload
