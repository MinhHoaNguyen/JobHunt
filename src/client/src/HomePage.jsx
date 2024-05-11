import React from 'react';
import About from './components/About';
import Footer from './components/Footer';
import Job from './components/Job';
import Navbar from './components/Navbar';
import './css/style.css';

const HomePage = () => {
    return(
        <div className="container-xxl bg-white p-0">
            <Navbar />
            <About />
            <Job />
            <Footer/>
        </div>
    )
}

export default HomePage;