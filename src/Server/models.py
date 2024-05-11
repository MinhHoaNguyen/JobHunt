from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, TIMESTAMP
from sqlalchemy.orm import relationship

from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    password = Column(String)
    email = Column(String, unique=True)

    applications = relationship("Application", back_populates="user")

class Job(Base):
    __tablename__= "jobs"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(Text)
    responsibility = Column(Text)
    qualification = Column(Text)
    location = Column(String)
    job_nature = Column(String)
    salary = Column(String)
    company = Column(Text)

    applications = relationship("Application", back_populates="job")

class Application(Base):
    __tablename__= "applications"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    timestamp = Column(TIMESTAMP)

    user = relationship("User", back_populates="applications")
    job= relationship("Job", back_populates="applications")
