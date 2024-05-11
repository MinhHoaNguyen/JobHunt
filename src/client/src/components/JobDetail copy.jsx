import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import Navbar from "./Navbar";

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [resumeFileErr, setResumeFileErr] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [responseError, setResponseError] = useState('');

    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/jobs/${id}`);
                setJob(response.data);
                console.log("response: ", response);
            } catch (error) {
                console.log(error);
            }
        };

        fetchJobDetail();
    }, [id]);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        setAuthToken(token);
        if (!token) {
        }
    }, []);

    if (!job) {
        return <div>Loading...</div>;
    }

    console.log("token: ", authToken)
    console.log("job: ", job);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setResponseError(false);

        if(!name.trim()) {
            setNameErr("Please enter your name.");
            // return;
        }
        if(!email.trim()) {
            setEmailErr("Please enter your email address.");
            // return;
        }
        if(!resumeFile) {
            setResumeFileErr("Please upload your resume.");
        }
        if(name.trim() && email.trim() && resumeFile) {
            // const formData = {
            //     authToken
            // };
            // console.log("formData: ", formData)
            try {
                // call api login
                await axios.post(`http://localhost:8000/jobs/${id}`, null, {
                    headers: {
                        'authToken': authToken,
                    }
                })
                    .then((response) => {
                        console.log(response);
                        toast.success("Apply successfully!",
                            {
                                position: "top-right",
                                closeButton: false,
                                autoClose: 2000
                            });
                    })
            } catch (error) {
                console.log(error);
                setResponseError(error.response.data.detail);
            }
        }
    }

    return (
        <div className="container-xxl bg-white p-0">
            <Navbar />
            {/* <About />
            <Job /> */}

        <div className="container-xxl py-5 bg-dark page-header mb-5">
            <div className="container my-5 pt-5 pb-4">
                <h1 className="display-3 text-white mb-3 animated slideInDown">Job Detail</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb text-uppercase">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Job List</a></li>
                        <li className="breadcrumb-item text-white active" aria-current="page">Job Detail</li>
                    </ol>
                </nav>
            </div>
        </div>

        <ToastContainer className="foo" style={{ width: "400px" }} />

        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="row gy-5 gx-4">
                    <div className="col-lg-8">
                        <div className="d-flex align-items-center mb-5">
                            <img className="flex-shrink-0 img-fluid border rounded" src="img/com-logo-2.jpg" alt="" style={{ width: "80px", height: "80px" }} />
                            <div className="text-start ps-4">
                                <h3 className="mb-3">{job.title}</h3>
                                <span className="text-truncate me-3"><i className="fa fa-map-marker-alt text-primary me-2"></i>{job.location}</span>
                                <span className="text-truncate me-3"><i className="far fa-clock text-primary me-2"></i>{job.job_nature}</span>
                                <span className="text-truncate me-0"><i className="far fa-money-bill-alt text-primary me-2"></i>${job.salary}</span>
                            </div>
                        </div>

                        <div className="mb-5">
                            <h4 className="mb-3">Job description</h4>
                            <p>{job.description}</p>
                            <h4 className="mb-3">Responsibility</h4>
                            <p>{job.responsibility}</p>
                            <ul className="list-unstyled">
                                {/* <li><i className="fa fa-angle-right text-primary me-2"></i>Dolor justo tempor duo ipsum accusam</li>
                                <li><i className="fa fa-angle-right text-primary me-2"></i>Elitr stet dolor vero clita labore gubergren</li>
                                <li><i className="fa fa-angle-right text-primary me-2"></i>Rebum vero dolores dolores elitr</li>
                                <li><i className="fa fa-angle-right text-primary me-2"></i>Est voluptua et sanctus at sanctus erat</li>
                                <li><i className="fa fa-angle-right text-primary me-2"></i>Diam diam stet erat no est est</li> */}
                            </ul>
                            <h4 className="mb-3">Qualifications</h4>
                            <p>{job.qualification}</p>
                            <ul className="list-unstyled">
                                {/* <li><i className="fa fa-angle-right text-primary me-2"></i>Dolor justo tempor duo ipsum accusam</li>
                                <li><i className="fa fa-angle-right text-primary me-2"></i>Elitr stet dolor vero clita labore gubergren</li>
                                <li><i className="fa fa-angle-right text-primary me-2"></i>Rebum vero dolores dolores elitr</li>
                                <li><i className="fa fa-angle-right text-primary me-2"></i>Est voluptua et sanctus at sanctus erat</li>
                                <li><i className="fa fa-angle-right text-primary me-2"></i>Diam diam stet erat no est est</li> */}
                            </ul>
                        </div>
                        {!authToken && <div><button className="btn btn-primary w-100" type="submit">Apply Now</button></div>}
                        
                        <div className="">
                        <h4 className="mb-4">Apply For The Job</h4>
                        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
                            {responseError && <div className="text-danger">{responseError}</div>}
                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <input type="text" className={`form-control ${nameErr && 'is-invalid'}`} placeholder="Your Name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setNameErr('');
                                    }}
                                    />
                                    {nameErr && <div className="invalid-feedback">{nameErr}</div>}
                                </div>
                                {/* {nameErr && <div>{nameErr}</div>} */}
                                <div className="col-12 col-sm-6">
                                    <input type="email" className={`form-control ${emailErr && 'is-invalid'}`} placeholder="Your Email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailErr('');
                                    }}
                                    />
                                    {emailErr && <div className="invalid-feedback">{emailErr}</div>}
                                </div>
                                <div className="col-12 col-sm-6">
                                    <input type="text" className="form-control" placeholder="Portfolio Website" />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <input type="file" className={`form-control bg-white ${resumeFileErr && 'is-invalid'}`}
                                    id="resume"
                                    onChange={(e) => {
                                        setResumeFile(e.target.files[0]);
                                        setResumeFileErr('');
                                    }}
                                    />
                                    {resumeFileErr && <div className="invalid-feedback">{resumeFileErr}</div>}
                                </div>
                                <div className="col-12">
                                    <textarea className="form-control" rows="5" placeholder="Coverletter"></textarea>
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary w-100" type="submit">Apply Now</button>
                                </div>
                            </div>
                        </form>
                    </div>
                        
                    </div>
        
                    <div className="col-lg-4">
                        <div className="bg-light rounded p-5 mb-4 wow slideInUp" data-wow-delay="0.1s">
                            <h4 className="mb-4">Job Summary</h4>
                            <p><i className="fa fa-angle-right text-primary me-2"></i>Published On: 01 Jan, 2045</p>
                            <p><i className="fa fa-angle-right text-primary me-2"></i>Vacancy: 123 Position</p>
                            <p><i className="fa fa-angle-right text-primary me-2"></i>Job Nature: {job.job_nature}</p>
                            <p><i className="fa fa-angle-right text-primary me-2"></i>Salary: ${job.salary}</p>
                            <p><i className="fa fa-angle-right text-primary me-2"></i>Location: {job.location}</p>
                            <p className="m-0"><i className="fa fa-angle-right text-primary me-2"></i>Date Line: 01 Jan, 2045</p>
                        </div>
                        <div className="bg-light rounded p-5 wow slideInUp" data-wow-delay="0.1s">
                            <h4 className="mb-4">Company Detail</h4>
                            <p className="m-0">{job.company}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <Footer/>
        </div>
    )
}

export default JobDetail;
