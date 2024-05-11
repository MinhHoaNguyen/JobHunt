from typing import List, Union
from passlib.context import CryptContext
from fastapi import Depends, FastAPI, HTTPException, Header
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from authentication import create_access_token, RequiredLogin, get_current_user_id
from fastapi.middleware.cors import CORSMiddleware

import crud, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = {
    "http://localhost",
    "http://localhost:3000",
}
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials =True,
    allow_methods = ["*"],
    allow_headers= ["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Add mock data
jobs = [
    {
        "title": "Developer",
        "description": "manager description",
        "responsibility": "manager responsibility",
        "qualification": "Bachelor's Degree in electrical engineering, physics, chemical engineering, IC manufacturing, or process technology related fields. Higher education preferred.\n10+ years of experience in the semiconductor industry.",
        "location": "San Jose, CA",
        "job_nature": "Full Time",
        "salary": "170000",
        "company": "ASML is an Equal Opportunity Employer that values and respects the importance of a diverse and inclusive workforce. It is the policy of the company to recruit, hire, train and promote persons in all job titles without regard to race, color, religion, sex, age, national origin, veteran status, disability, sexual orientation, or gender identity. We recognize that diversity and inclusion is a driving force in the success of our company."
    },
    {
        "title": "Marketing Manager",
        "description": "The Marketing Manager will develop ideas and recommendations that create property awareness and excitement, as well as execute tactical, revenue generating initiatives.",
        "responsibility": "Write marketing project creative briefs for design team and outside partners; oversee creative and copy development of marketing projects.",
        "qualification": "Demonstrated experience in Budget management. \n Proficient in Microsoft Office (Excel, Powerpoint, Word).",
        "location": "Fremont, CA",
        "job_nature": "Full Time",
        "salary": "120000",
        "company": "ASML is an Equal Opportunity Employer that values and respects the importance of a diverse and inclusive workforce. It is the policy of the company to recruit, hire, train and promote persons in all job titles without regard to race, color, religion, sex, age, national origin, veteran status, disability, sexual orientation, or gender identity. We recognize that diversity and inclusion is a driving force in the success of our company."
    },
    {
        "title": "Product Designer",
        "description": "manager description",
        "responsibility": "Design flows and experiences that are simple and elegant",
        "qualification": "5+ years of experience.\n Proficiency in Figma. \n Experience with Figma libraries.",
        "location": "San Jose, CA",
        "job_nature": "Full Time",
        "salary": "102000",
        "company": "ASML is an Equal Opportunity Employer that values and respects the importance of a diverse and inclusive workforce. It is the policy of the company to recruit, hire, train and promote persons in all job titles without regard to race, color, religion, sex, age, national origin, veteran status, disability, sexual orientation, or gender identity. We recognize that diversity and inclusion is a driving force in the success of our company."
    },
    {
        "title": "Creative Designer",
        "description": "manager description",
        "responsibility": "manager responsibility",
        "qualification": "Bachelor's Degree in electrical engineering, physics, chemical engineering, IC manufacturing, or process technology related fields. Higher education preferred.\n10+ years of experience in the semiconductor industry.",
        "location": "San Jose, CA",
        "job_nature": "Full Time",
        "salary": "150000",
        "company": "ASML is an Equal Opportunity Employer that values and respects the importance of a diverse and inclusive workforce. It is the policy of the company to recruit, hire, train and promote persons in all job titles without regard to race, color, religion, sex, age, national origin, veteran status, disability, sexual orientation, or gender identity. We recognize that diversity and inclusion is a driving force in the success of our company."
    },
    {
        "title": "Wordpress Developer",
        "description": "manager description",
        "responsibility": "manager responsibility",
        "qualification": "3-7 years of professional software engineering experience in a business setting. \n 3-5 years experience in C# and SQL.\n Experience in Blazor a plus.",
        "location": "Los Angeles, CA",
        "job_nature": "Full Time",
        "salary": "13000",
        "company": "ASML is an Equal Opportunity Employer that values and respects the importance of a diverse and inclusive workforce. It is the policy of the company to recruit, hire, train and promote persons in all job titles without regard to race, color, religion, sex, age, national origin, veteran status, disability, sexual orientation, or gender identity. We recognize that diversity and inclusion is a driving force in the success of our company."
    },
    {
        "title": "Dental Assistant",
        "description": "manager description",
        "responsibility": "manager responsibility",
        "qualification": "Bachelor's Degree in electrical engineering, physics, chemical engineering, IC manufacturing, or process technology related fields. Higher education preferred.\n10+ years of experience in the semiconductor industry.",
        "location": "San Jose, CA",
        "job_nature": "Full Time",
        "salary": "12000",
        "company": "ASML is an Equal Opportunity Employer that values and respects the importance of a diverse and inclusive workforce. It is the policy of the company to recruit, hire, train and promote persons in all job titles without regard to race, color, religion, sex, age, national origin, veteran status, disability, sexual orientation, or gender identity. We recognize that diversity and inclusion is a driving force in the success of our company."
    },
    {
        "title": "Receptionist",
        "description": "Serve visitors by greeting, welcoming, and directing them appropriately. \n Notify relevant employees when visitors arrive.",
        "responsibility": "Organize the reception area while complying with office procedures, rules, and regulations.\n Arrange meetings, schedules, and travel accommodations for senior staff.",
        "qualification": "All qualified applicants will receive consideration for employment without regard to race, color, national origin, age, ancestry, religion, sex, sexual orientation, gender identity, gender expression, marital status, disability, medical condition, genetic information, pregnancy, or military or veteran status. We consider all qualified applicants, including those with criminal histories, in a manner consistent with state and local laws, including the City of Los Angeles' Fair Chance Initiative for Hiring Ordinance.",
        "location": "Jurupa Valley, CA",
        "job_nature": "Part Time",
        "salary": "50000",
        "company": "ASML is an Equal Opportunity Employer that values and respects the importance of a diverse and inclusive workforce. It is the policy of the company to recruit, hire, train and promote persons in all job titles without regard to race, color, religion, sex, age, national origin, veteran status, disability, sexual orientation, or gender identity. We recognize that diversity and inclusion is a driving force in the success of our company."
    },
    {
        "title": "Accountant",
        "description": "The Staff Accountant is responsible for assisting with the preparation of monthly financial reports maintaining the general ledger, customer billing, assisting with the annual audit, and other accounting duties as assigned.",
        "responsibility": "Financial Reporting: Assist in the preparation and distribution of internal financial statements and reports, maintaining the highest quality, reliability, and accuracy.\n Billing: Audit, generate and send out invoices to customers in accordance with contracts. Maintain accurate customer records of all recurring and one time billing activities. Timely upload of invoices to customers portals when applicable to ensure timely payments. Point of contact to customers for billing and invoicing. Work closely with Sales and Operations to ensure customer accounts are set up correctly, and work with customers to ensure billing information and special instructions are addressed.",
        "qualification": "Ability to think analytically.\n Mastery of basic math and statistics.\n Ability to work independently. \nAbility to collaborate with the managerial staff of various departments.\n Excellent organizational skills. ",
        "location": "San Diego County, CA",
        "job_nature": "Part Time",
        "salary": "70000",
        "company": "ASML is an Equal Opportunity Employer that values and respects the importance of a diverse and inclusive workforce. It is the policy of the company to recruit, hire, train and promote persons in all job titles without regard to race, color, religion, sex, age, national origin, veteran status, disability, sexual orientation, or gender identity. We recognize that diversity and inclusion is a driving force in the success of our company."
    },
]

session = SessionLocal()
for job in jobs:
    db_job = models.Job(**job)
    session.add(db_job)
session.commit()
session.close()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/jobs", response_model=schemas.Job)
async def create_job(job: schemas.JobCreate, db: Session = Depends(get_db)):
    return crud.create_job(db, job=job)

@app.post("/register", response_model=schemas.UserResponse)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if crud.get_user_by_email(db, user.email) or crud.get_user_by_username(db, user.username):
        raise HTTPException(
            status_code=400,
            detail="Account with username/email is registered"
        )
    return crud.create_user(db, user)

@app.post("/login", response_model=schemas.UserLoginResponse)
async def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    username = user.username
    db_user = crud.get_user_by_username(db, username)
    print(db_user)

    if db_user is None or not pwd_context.verify(secret=user.password, hash=db_user.password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password.",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(minutes=int(43200))
    access_token = create_access_token(data={"sub": str(db_user.id)}, expires_delta=access_token_expires)
    print(access_token)
    return {
        "username": db_user.username,
        "email": db_user.email,
        "accessToken": access_token
    }

@app.get("/jobs", response_model=List[schemas.Job])
async def get_job_list(db: Session = Depends(get_db)):
    return crud.get_job_list(db)

@app.get("/jobs/{job_id}", response_model=schemas.Job)
async def get_job_by_id(job_id: int, db: Session = Depends(get_db)):
    job = crud.get_job_by_id(db, job_id)
    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )
    return job

@app.post("/jobs/{job_id}", response_model=schemas.Application)
async def apply_job(job_id: int,
    authToken: str = Header(None),
    db: Session = Depends(get_db)):
# async def apply_job(job_id: int, db: Session = Depends(get_db), user_id=Depends(RequiredLogin())):
    if not authToken:
        raise HTTPException(status_code=401, detail="Authorization token is missing")
    user_id = get_current_user_id(authToken)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid authorization token")
    print(f"user_id: {user_id}")
    application = crud.get_application_by_user_id_and_job_id(db, user_id, job_id)
    if application:
        raise HTTPException(status_code=400, detail="You already applied to this job")
    
    db_application = crud.create_application(db, user_id, job_id)
    if db_application is None:
        raise HTTPException(
            status_code=400,
            detail="Error while applying for the job."
        )
    return db_application

@app.get("/my-application")
async def get_my_applications(db: Session=Depends(get_db), user_id=Depends(RequiredLogin())):
    return crud.get_application_detail_by_user_id(db, user_id)

@app.delete("/application/{application_id}", response_model=schemas.Application)
async def delete_application(application_id: int, db: Session=Depends(get_db), user_id=Depends(RequiredLogin())):
    db_application = crud.get_application_by_id(db, application_id)
    if db_application is None:
        raise HTTPException(
            status_code=404,
            detail="Application is not found."
        )
    return crud.delete_application_by_id(db, application_id)