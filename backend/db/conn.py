from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import dotenv
CFG = dotenv.dotenv_values(".env")
SQLALCHEMY_DATABASE_URL = CFG['PYNASONIC_PG']

# The `connect_args` parameter is needed only for SQLite.
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
