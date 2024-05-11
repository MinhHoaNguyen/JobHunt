import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const JobForm = ({jobId}) => {
    console.log('Job ID:', jobId);
    // const { id } = useParams();
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
        const token = localStorage.getItem('auth_token');
        setAuthToken(token);
        if (!token) {
        }
    }, []);

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
                await axios.post(`http://localhost:8000/jobs/${jobId}`, null, {
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
    )
}

export default JobForm;
