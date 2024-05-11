import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../css/style.css';
import logo1 from '../img/com-logo-1.jpg';
import Footer from "./Footer";
import Navbar from "./Navbar";

const MyApplication = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [jobs, setJobs] = useState(null);
    const [authToken, setAuthToken] = useState('');
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        setAuthToken(token);
        if (!token) {
            navigate('/');
            // setTimeout(() => {
            //     navigate('/');
            // }, 2000);
        }
    }, [navigate]);

    useEffect(() => {
        const fetchMyApplication = async () => {
            try {
                const authToken = localStorage.getItem('auth_token');
                const response = await axios.get('http://localhost:8000/my-application', {
                    headers: {
                    'Authorization': `Bearer ${authToken}`
                    }
                });
                console.log(response.data);
                setJobs(response.data);
                const apps = response.data.map(job => ({
                    "application_id": job.applications[0].id,
                    "job_id": job.id,
                    "title": job.title,
                    "location": job.location,
                    "job_nature": job.job_nature,
                    "salary": job.salary,
                    "timestamp": job.applications[0].timestamp.split("T")[0]
                }));
                console.log("applications: ", apps);
                setApplications(apps);
            } catch (error) {
                console.error('Error fetching my applications:', error);
                if (error.response && error.response.status === 403) {
                    // Handle unauthenticated request gracefully
                    navigate('/login');
                } else {
                    throw error;
                }
            }
        };

        fetchMyApplication();
    }, [id]);

    // if (applications.length == 0 || !jobs) {
    //     return (
    //         <div className="container-xxl bg-white p-0">
    //             <Navbar />
    //             <div className="container-xxl py-5 bg-dark page-header mb-5">
    //                 <div className="container my-5 pt-5 pb-4">
    //                     <h1 className="display-3 text-white mb-3 animated slideInDown">My Application</h1>
    //                     <nav aria-label="breadcrumb">
    //                         <ol className="breadcrumb text-uppercase">
    //                             <li className="breadcrumb-item"><a href="/">Home</a></li>
    //                             <li className="breadcrumb-item"><a href="#">Job List</a></li>
    //                             <li className="breadcrumb-item text-white active" aria-current="page">My Application</li>
    //                         </ol>
    //                     </nav>
    //                 </div>
    //             </div>
    //             <ToastContainer className="foo" style={{ width: "400px" }} />
    //             <div style={{height: "calc(100vh - 900px)", marginLeft: "100px"}}>You haven't applied any jobs yet.</div>
    //             <Footer/>
    //         </div>
    //     );
    // }

    const onWithdrawHandler = async (id) => {
        console.log("You just clicked on Withdraw button for application id: ", id);
        try {
            await axios.delete(`http://localhost:8000/application/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            // Remove the deleted application from the state
            setApplications(prevApplications => prevApplications.filter(application => application.application_id !== id));
            toast.success("Withdraw successfully!", {
                position: "top-right",
                closeButton: false,
                autoClose: 2000
            });
        } catch (error) {
            console.error('Error while deleting record ', error);
            toast.error("Error while deleting record!",
                {
                    position: "top-right",
                    closeButton: false,
                    autoClose: 1000
                });
        }
    }

    return (
        <div className="container-xxl bg-white p-0">
            <Navbar />
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 pt-5 pb-4">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">My Application</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Job List</a></li>
                            <li className="breadcrumb-item text-white active" aria-current="page">My Application</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* <ToastContainer className="foo" style={{ width: "400px" }} /> */}
            {/* <div style={{minHeight: "calc(100vh - 900px)"}}> */}
            <div className="tab-content" >
                <div id="tab-1" className="tab-pane fade show p-0 active" >
                {applications && applications.map(application => (
                    <div className="application-item p-4 mb-4" key={application.application_id}>
                        <div className="row g-4">
                            <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                <img className="flex-shrink-0 img-fluid border rounded" src={logo1} alt="" style={{ width: "80px", height: "80px" }} />
                                <div className="text-start ps-4">
                                    <h5 className="mb-3">{application.title}</h5>
                                    <span className="text-truncate me-3"><i className="fa fa-map-marker-alt text-primary me-2"></i>{application.location}</span>
                                    <span className="text-truncate me-3"><i className="far fa-clock text-primary me-2"></i>{application.job_nature}</span>
                                    <span className="text-truncate me-0"><i className="far fa-money-bill-alt text-primary me-2"></i>${application.salary}</span>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                <div className="d-flex mb-3">
                                    <a className="btn btn-primary" onClick={() => onWithdrawHandler(application.application_id)}>Withdraw</a>
                                </div>
                                <small className="text-truncate"><i className="far fa-calendar-alt text-primary me-2"></i>Applied on: {application.timestamp}</small>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                </div>
            {/* </div> */}
            {applications.length == 0 && <div style={{height: "calc(100vh - 900px)", marginLeft: "100px"}}>You haven't applied any jobs yet.</div>}
            
            <Footer/>
        </div>
    )
}

export default MyApplication;
