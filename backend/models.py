from sqlalchemy import Column, Integer, String
from database import Base, engine

class User(Base):
    __tablename__ = "fs_users"

    id              = Column(Integer, primary_key=True, index=True)
    username        = Column(String, unique=True, index=True)
    hashed_password = Column(String)

User.metadata.create_all(bind=engine)
