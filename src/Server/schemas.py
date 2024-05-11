from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class ApplicationBase(BaseModel):
    user_id: int
    job_id: int

class ApplicationCreate(ApplicationBase):
    pass

class Application(ApplicationBase):
    id: int
    timestamp: Optional[datetime]

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserLoginResponse(UserBase):
    accessToken: str

    class Config:
        from_attributes = True

class UserResponse(UserBase):
    id: int

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class JobBase(BaseModel):
    title: str
    description: str
    responsibility: str
    qualification: str
    location: str
    job_nature: str
    salary: str
    company: str

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: int

    class Config:
        from_attributes = True