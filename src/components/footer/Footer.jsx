import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faAngleRight, faMapMarkerAlt, faEnvelope, faPhone, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'
const Footer = () => {
    return (
        <div>
            <div className="container-fluid footer py-3 wow fadeIn" data-wow-delay="0.2s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column">
                                <h4 className="text-white mb-4">CORPWINGS</h4>
                                <p className="text-white">
                                    Welcome to Corpwings, where we transform your digital dreams into reality. With our website creation
                                    service, we craft tailored online platforms that captivate, engage, and convert.
                                </p>
                                
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={faShare} className="fa-2x text-white me-3" />
                                    <a
                                        className="btn-square btn btn-primary text-white rounded-circle d-flex justify-content-center align-items-center mx-1"
                                        href="https://www.facebook.com/profile.php?id=61551671053085&mibextid=JRoKGi"
                                        style={{ width: '40px', height: '40px' }} // Adjust the size as needed
                                    >
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a>

                                    <a
                                        className="btn-square btn btn-primary text-white rounded-circle d-flex justify-content-center align-items-center mx-1"
                                        href="https://twitter.com/Corpwings_offi?t=jx8nPpPWYghfRuiRBeZw8w&s=08"
                                        style={{ width: '40px', height: '40px' }} // Adjust the size as needed
                                    >  <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                    <a
                                        className="btn-square btn btn-primary text-white rounded-circle d-flex justify-content-center align-items-center mx-1"
                                        href="https://www.instagram.com/corpwings_official/?igsh=NG1xYWZmd3Zsb2dp"
                                        style={{ width: '40px', height: '40px' }} // Adjust the size as needed
                                    >   <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                    <a
                                        className="btn-square btn btn-primary text-white rounded-circle d-flex justify-content-center align-items-center mx-1"
                                        href="https://www.linkedin.com/in/corp-wings-584097306/"
                                        style={{ width: '40px', height: '40px' }} // Adjust the size as needed
                                    >   <FontAwesomeIcon icon={faLinkedinIn} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column text-white">
                                <h4 className="mb-4 text-white">Quick Links</h4>
                                <a href="about.html" className="text-white d-flex align-items-center mb-2">
                                    <FontAwesomeIcon icon={faAngleRight} className="me-2" /> About Us
                                </a>
                                <a href="contact.html" className="text-white d-flex align-items-center mb-2">
                                    <FontAwesomeIcon icon={faAngleRight} className="me-2" /> Contact Us
                                </a>
                                <a href="blog.html" className="text-white d-flex align-items-center mb-2">
                                    <FontAwesomeIcon icon={faAngleRight} className="me-2" /> Our Blog & News
                                </a>
                                <a href="team.html" className="text-white d-flex align-items-center mb-2">
                                    <FontAwesomeIcon icon={faAngleRight} className="me-2" /> Our Team
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column text-white">
                                <h4 className="mb-4 text-white">CorpWings Services</h4>
                                <a href="service.html" className="text-white d-flex align-items-center mb-2">
                                    <FontAwesomeIcon icon={faAngleRight} className="me-2" /> All Services
                                </a>
                                <a href="service.html" className="text-white d-flex align-items-center mb-2">
                                    <FontAwesomeIcon icon={faAngleRight} className="me-2" /> Developing
                                </a>
                                <a href="service.html" className="text-white d-flex align-items-center mb-2">
                                    <FontAwesomeIcon icon={faAngleRight} className="me-2" /> Designing
                                </a>
                                <a href="service.html" className="text-white d-flex align-items-center mb-2">
                                    <FontAwesomeIcon icon={faAngleRight} className="me-2" /> Digital Marketing
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-3">
                            <div className="footer-item d-flex flex-column text-white">
                                <h4 className="mb-4 text-white">Contact Info</h4>
                                <a href="#" className="text-white d-flex align-items-center mb-2">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> Address: 22, Raja St, Teachers Colony, Pudupet, Ambapuram, Gudiyatham, Tamil Nadu 632602
                                </a>
                                <a href="mailto:corpwingsofficial@gmail.com" className="text-white d-flex align-items-center mb-2">
                                    <FontAwesomeIcon icon={faEnvelope} className="me-2" /> corpwingsofficial@gmail.com
                                </a>
                                <a href="tel:6380341944" className="text-white d-flex align-items-center mb-2">
                                    <FontAwesomeIcon icon={faPhone} className="me-2" /> 6380341944
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid copyright py-4">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-md-0">
                            <span className="text-white d-flex align-items-center">
                                <FontAwesomeIcon icon={faCopyright} className="text-light me-2" />
                                <a href="#" className="text-white">corpwings</a>, All right reserved.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
