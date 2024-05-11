import React, { useEffect, useState } from 'react';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import '../css/style.css';

const Navbar = () => {
    const [token, setToken] = useState(false);

    useEffect(() => {
        // Retrieve access_token from local storage
        const access_token = localStorage.getItem('auth_token');
        // Update the token state
        setToken(access_token !== null);
    }, []);

    const onLogOutHandler = () => {
        // Remove access_token from local storage
        try {
            localStorage.removeItem('auth_token');
            // Update the token state to false
            toast.success("Log out successfully!",
                {
                    position: "top-right",
                    closeButton: false,
                    autoClose: 1000
                });
            setToken(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch(error) {
            console.log(error);
            toast.error("Error while logging out!",
                {
                    position: "top-right",
                    closeButton: false,
                    autoClose: 1000
                });
        }
    }

    return (
        <div>
            <ToastContainer className="foo" style={{ width: "400px" }}/>
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                <a href="index.html" className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                    <h1 className="m-0 text-primary">JobHunt</h1>
                </a>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        <a href="/" className="nav-item nav-link active">Home</a>
                        <AnchorLink href="#about" className="nav-item nav-link">About</AnchorLink>
                        <AnchorLink href="#job" className="nav-item nav-link">Job List</AnchorLink>
                        {/* <a href="Login.html" className="nav-item nav-link">Login</a> */}
                        {/* <Link to="/login" className="nav-item nav-link ">Login</Link> */}
                        {token && <a href="/my-application" className="nav-item nav-link" style={{cursor: "pointer"}}>My Application</a>}
                        {token && <a to="#" className="nav-item nav-link" style={{cursor: "pointer"}} onClick={onLogOutHandler}>Log Out</a>}
                        {!token && <Link to="/login" className="nav-item nav-link ">Login</Link>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;