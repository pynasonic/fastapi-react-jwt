from pydantic import BaseModel
from sqlalchemy import ARRAY, TIMESTAMP, Column, Integer, String, func
from db.conn import Base, engine

class User(Base):
    __tablename__ = "fs_users"

    id              = Column(Integer, primary_key=True, index=True)
    username        = Column(String, unique=True, index=True)
    email           = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    group_id        = Column(ARRAY(Integer), nullable=True)
    role_id         = Column(ARRAY(Integer), nullable=True)
    status          = Column(String)
    note            = Column(String)
    created_at      = Column(TIMESTAMP, server_default=func.now())  


User.metadata.create_all(bind=engine)

class UserCreate(BaseModel):
    username: str
    password: str
    group_id: list[int] = []