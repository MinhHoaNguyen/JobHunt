import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/style.css';
import logo1 from '../img/com-logo-1.jpg';

const Job = () => {
    const [jobList, setJobList] = useState([]);
    const [fullTimeList, setFullTimeList] = useState([]);
    const [token, setToken] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve access_token from local storage
        const access_token = localStorage.getItem('auth_token');
        // Update the token state
        setToken(access_token !== null);
    }, []);

    const isFullTime = (job_nature) => job_nature === "Full Time";

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/jobs");
                setJobList(response.data);
                setFullTimeList(response.data.filter(job => isFullTime(job.job_nature)))
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);
    console.log(fullTimeList);

    const onApplyHandler = (id) => {
        console.log("You just click on Apply button for job id: ", id);
        if (token) {
            console.log("User is logged In");
            navigate(`/job-detail/${id}`);
        } else {
            console.log("User hasn't logged In");
        }
    }

    return (
        <div id="job" className="container-xxl py-5">
            <div className="container">
                <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1>
                <div className="tab-className text-center wow fadeInUp" data-wow-delay="0.3s">
                    <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                        <li className="nav-item">
                            <a className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" href="#tab-1">
                                <h6 className="mt-n1 mb-0">Featured</h6>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="d-flex align-items-center text-start mx-3 pb-3" data-bs-toggle="pill" href="#tab-2">
                                <h6 className="mt-n1 mb-0">Full Time</h6>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="d-flex align-items-center text-start mx-3 me-0 pb-3" data-bs-toggle="pill" href="#tab-3">
                                <h6 className="mt-n1 mb-0">Part Time</h6>
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" >
                        <div id="tab-1" className="tab-pane fade show p-0 active" >
                            {jobList && jobList.map(job => (
                                <div className="job-item p-4 mb-4" key={job.id}>
                                <div className="row g-4">
                                    <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                        <img className="flex-shrink-0 img-fluid border rounded" src={logo1} alt="" style={{ width: "80px", height: "80px" }} />
                                        <div className="text-start ps-4">
                                            <h5 className="mb-3">{job.title}</h5>
                                            <span className="text-truncate me-3"><i className="fa fa-map-marker-alt text-primary me-2"></i>{job.location}</span>
                                            <span className="text-truncate me-3"><i className="far fa-clock text-primary me-2"></i>{job.job_nature}</span>
                                            <span className="text-truncate me-0"><i className="far fa-money-bill-alt text-primary me-2"></i>${job.salary}</span>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                        <div className="d-flex mb-3">
                                
                                            <a className="btn btn-primary" key={job.id} onClick={() => onApplyHandler(job.id)}>Apply Now</a>
                                        </div>
                                        <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Date Line: 01 Jan, 2045</small>
                                    </div>
                                </div>
                            </div>
                            ))}
                            <a className="btn btn-primary py-3 px-5" href="">Browse More Jobs</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Job;