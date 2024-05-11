import React from 'react';
import '../css/style.css';
import about1 from '../img/about-1.jpg';
import about2 from '../img/about-2.jpg';
import about3 from '../img/about-3.jpg';
import about4 from '../img/about-4.jpg';

const About = () => {
    return (
        <div id="about" className="container-xxl py-5">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                        <div className="row g-0 about-bg rounded overflow-hidden">
                            <div className="col-6 text-start">
                                <img className="img-fluid w-100" src={about1}/>
                            </div>
                            <div className="col-6 text-start">
                                <img className="img-fluid" src={about2} style={{ width: '85%', marginTop: '15%' }} />
                            </div>
                            <div className="col-6 text-end">
                                <img className="img-fluid" src={about3} style={{ width: '85%' }} />
                            </div>
                            <div className="col-6 text-end">
                                <img className="img-fluid w-100" src={about4} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <h1 className="mb-4">We Help To Get The Best Job</h1>
                        <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab quis dicta tenetur sapiente quam quos non qui iusto. Magnam, eos. In reiciendis at, dolore facere et non debitis incidunt nobis.</p>
                        <p><i className="fa fa-check text-primary me-3"></i>Lorem ipsum dolor sit amet</p>
                        <p><i className="fa fa-check text-primary me-3"></i>Lorem ipsum dolor sit amet</p>
                        <p><i className="fa fa-check text-primary me-3"></i>Lorem ipsum dolor sit amet</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;