import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import JobForm from "./JobForm";
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

    const navigate = useNavigate();

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

    const onApplySubmit = (e) => {
        navigate("/login")
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
                        {!authToken && <div><button className="btn btn-primary w-100" type="submit" onClick={onApplySubmit}>Apply Now</button></div>}
                        
                        {authToken && <JobForm jobId={id}/>}
                        
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
