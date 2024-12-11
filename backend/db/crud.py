from sqlalchemy.orm import Session
from db import models
from utils import u_hash


def get_user_by_username(_db: Session, username: str):
    return _db.query(models.User).filter(models.User.username == username).first()


def create_user(_db: Session, user: models.UserCreate):
    hashed_password = u_hash.hash_password(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    _db.add(db_user)
    _db.commit()
    return "complete"
