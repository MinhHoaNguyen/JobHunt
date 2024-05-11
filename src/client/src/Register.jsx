import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import './css/Login.css';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [usernameError, setUsernameError] = useState('');
    // const [emailError, setEmailError] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    const [responseError, setResponseError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseError(false);

        // const usernamePattern = /^[a-zA-Z0-9_-]+$/;
        // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // if (!username.trim()) {
        //     setUsernameError("Please enter a username.");
        //     return;
        // }
        // if (!usernamePattern.test(username.trim())) {
        //     setUsernameError('Username can only contain English letters, digits, "_", and "-".');
        //     return;
        // }
        // if (username.trim().length < 3) {
        //     setUsernameError('Username must be at least 3 characters.');
        //     return;
        // }
        // if (!email.trim()) {
        //     setEmailError("Please enter an email address.");
        //     return;
        // }
        // if (!emailPattern.test(email)) {
        //     setEmailError('Please enter a password.');
        //     return;
        // }
        // if (password.length < 8) {
        //     setPasswordError('Password must be at least 8 characters.');
        //     return;
        // }

        if (username && email && password) {
            console.log("username: ", username);
            console.log("email: ", email);
            console.log("password: ", password);

            const formData = {
                username,
                email,
                password
            };

            console.log(formData);

            try {
                // call api login
                await axios
                    .post("http://localhost:8000/register", formData)
                    .then((response) => {
                        console.log(response);
                        // add successfully notification
                        toast.success("Register successfully!",
                            {
                                position: "top-right",
                                closeButton: false,
                                autoClose: 2000
                            });
                        // reload page after success login
                        setTimeout(() => {
                            navigate('/login');
                        }, 2000);
                    })
            } catch (error) {
                console.log(error);
                setResponseError(true);
            }
        }

    }

    return (
        <div className="loginContainer">
            <ToastContainer className="foo" style={{ width: "400px" }} />
            <div className="wrapper">
                <h2 className="text-right">Welcome </h2>
                <div className="form-wrapper login">
                    <form onSubmit={handleSubmit}>
                        <h2>Registration</h2>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="person"></ion-icon>
                            </span>
                            {/* <input type="text" placeholder="Username"
                            required /> */}
                            {/* <input type="text" placeholder="Username"
                            className={`form-control ${usernameError && 'is-invalid'}`}
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError('');
                            }}
                            required /> */}
                            <input type="text" placeholder="Username"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            required />
                        </div>
                        {/* {usernameError && <div className='invalid-feedback'>
                            {usernameError}</div>} */}
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input type="email" placeholder="Email" 
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            required />
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="lock-closed"></ion-icon>
                            </span>
                            <input type="password" placeholder="Password" 
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            required />
                        </div>
                        <button type="submit">Register</button>
                        {responseError && <div className="errMsg">Account with username/email is not available.</div>}
                        <div className="sign-link">
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
