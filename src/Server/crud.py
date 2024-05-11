from passlib.context import CryptContext
from sqlalchemy.orm import Session, joinedload
from datetime import datetime

import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_pw = pwd_context.hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        password=hashed_pw
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_job_list(db: Session):
    return db.query(models.Job).all()

def get_job_by_id(db: Session, job_id: int):
    return db.query(models.Job).filter(models.Job.id == job_id).first()

def get_application_by_id(db: Session, application_id: int):
    return db.query(models.Application).filter(models.Application.id == application_id).first()

def get_applications_by_user_id(db: Session, user_id: int):
    return db.query(models.Application).filter(models.Application.user_id == user_id).all()

def get_application_by_user_id_and_job_id(db: Session, user_id: int, job_id: int):
    return db.query(models.Application).filter(
        models.Application.user_id == user_id,
        models.Application.job_id == job_id
    ).first()

def get_application_detail_by_user_id(db: Session, user_id: int):
    applied_job_detail = (
        db.query(models.Job)
        .join(models.Application, models.Job.id == models.Application.job_id)
        .filter(models.Application.user_id == user_id)
        .options(joinedload(models.Job.applications))
        .all()
    )

    return applied_job_detail

def create_application(db: Session, user_id: int, job_id: int):
    timestamp = datetime.now()
    db_application = models.Application(
        user_id=user_id,
        job_id=job_id,
        timestamp= timestamp
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

def delete_application_by_id(db: Session, application_id: int):
    application = get_application_by_id(db, application_id)

    db.delete(application)
    db.commit()

    return application

def create_job(db: Session, job: schemas.JobCreate):
    db_job = models.Job(
        title=job.title,
        description=job.description,
        responsibility=job.responsibility,
        qualification=job.qualification,
        location=job.location,
        job_nature=job.job_nature,
        salary=job.salary,
        company=job.company
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job