import '../css/bootstrap.min.css';

function Footer() {
    return(
        <div className="Footer mt-auto">
            <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Company</h5>
                            <a className="btn btn-link text-white-50" href="">About Us</a>
                            <a className="btn btn-link text-white-50" href="">Contact Us</a>
                            <a className="btn btn-link text-white-50" href="">Our Services</a>
                            <a className="btn btn-link text-white-50" href="">Privacy Policy</a>
                            <a className="btn btn-link text-white-50" href="">Terms & Condition</a>
                        </div>
                        
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-white mb-4">Contact</h5>
                            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Location, City, Country</p>
                            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                            <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-youtube"></i></a>
                                <a className="btn btn-outline-light btn-social" href=""><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;