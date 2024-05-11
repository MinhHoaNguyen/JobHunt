import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './css/Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const [errMsg, setErrMsg] = useState(false);

    const onChangeForm = (label, e) => {
        setLoginForm({ ...loginForm, [label]: e.target.value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setErrMsg(false);
        console.log(loginForm);

        try {
            // call api login
            await axios
                .post("http://localhost:8000/login", loginForm)
                .then((response) => {
                    console.log(response);
                    // save token to local storage
                    localStorage.setItem("auth_token", response.data.accessToken);
                    // localStorage.setItem(
                    //     "auth_token_type",
                    //     response.data.result.token_type
                    // );

                    // add successfully notification
                    toast.success("Login successfully!",
                        {
                            position: "top-right",
                            closeButton: false,
                            autoClose: 2000
                        });
                    // reload page after success login
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                })
        } catch (error) {
            console.log(error);
            setErrMsg(true);
        }
    }

    const CloseButton = ({ closeToast }) => (
        <i
            className="material-icons"
            onClick={closeToast}
        >
            delete
        </i>
    );

    return (
        <React.Fragment>
            <div className="loginContainer">
                <ToastContainer className="foo" style={{ width: "400px" }} />
                <div className="wrapper">
                    <h2 className="text-right">Welcome </h2>
                    <div className="form-wrapper login">
                        <form onSubmit={onSubmitHandler}>
                            <h2>Login</h2>
                            <div className="input-box">
                                <span className="icon">
                                    <ion-icon name="person"></ion-icon>
                                </span>
                                <input type="text" placeholder="Username"
                                    onChange={(e) => {
                                        onChangeForm("username", e);
                                    }}
                                    required
                                />
                            </div>
                            <div className="input-box">
                                <span className="icon">
                                    <ion-icon name="lock-closed"></ion-icon>
                                </span>
                                <input type="password" placeholder="Password"
                                    onChange={(e) => {
                                        onChangeForm("password", e);
                                    }}
                                    required />
                            </div>

                            <button type="submit">Login</button>
                            {errMsg && <div className="errMsg">Wrong username and password combination!</div>}
                            <div className="sign-link">
                                <p>Don't have an account? <Link to="/register">Register</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;