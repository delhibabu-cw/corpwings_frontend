import { useState } from 'react';
import '../../css/style.css';
import './Intenship.css';

import software1 from '../../img/software1.jpg';
import digital2 from '../../img/digital2.jpg';
import grapic from '../../img/grapic.jpg';
import ADS from '../../img/ADS.jpg';
import AI from '../../img/AI.jpg';
import selfDelopment from '../../img/selfDelopment.jpg';
import itsector from '../../img/itsector.jpg';
import PP from '../../img/PP.jpg';
import sharemark from '../../img/sharemark.jpg';
import cyber from '../../img/cyber.jpg';
import { useNavigate } from 'react-router-dom';

const services = [
    { imgSrc: software1, title: 'SOFTWARE DEVELOPING', para: 'Software development involves designing, coding, and testing applications. It helps create innovative solutions for businesses and consumers.' },
    { imgSrc: digital2, title: 'DIGITAL MARKETING', para: 'Digital marketing promotes brands through SEO, social media, and online ads. It helps businesses reach and engage their target audience.' },
    { imgSrc: grapic, title: 'GRAPHIC DESIGNING', para : 'Graphic design enhances communication through visuals, typography, and layouts. It is essential for branding, advertising, and digital content.' },
    { imgSrc: AI, title: 'ARTIFICIAL INTELLIGENCE', para: 'AI develops smart systems that learn, analyze, and automate tasks. It improves efficiency and decision-making across industries.' },
    { imgSrc: ADS, title: 'ADMINISTRATIVE TECHNICAL SUPPORT' },
    { imgSrc: cyber, title: 'CYBER SECURITY' },
    { imgSrc: selfDelopment, title: 'SELF DEVELOPMENT' },
    { imgSrc: itsector, title: 'FUNDAMENTALS OF IT SECTOR' },
    { imgSrc: PP, title: 'PROJECT PREPARATION' },
    { imgSrc: sharemark, title: 'INVESTMENT & SHARE MARKETING' },
];

const Intenship = () => {

    const navigate = useNavigate()
    const [showAll, setShowAll] = useState(false);
    
    return (
        <div>
            <div className="container-fluid service intenship">
                <div className="container py-5">
                    <div className="section-title mb-5 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="sub-style">
                            <h4 className="sub-title px-3 mb-1">What We Do</h4>
                        </div>
                        <h1 className="display-4 mb-4">OUR INTERNSHIP SERVICES</h1>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
                        {(showAll ? services : services.slice(0, 4)).map((service, index) => (
                            <div key={index} className="col wow fadeInUp" data-wow-delay={`${0.1 * (index + 1)}s`}>
                                <div className="service-item rounded h-100">
                                    <div className="service-img rounded-top">
                                        <img src={service.imgSrc} className="img-fluid rounded-top w-100" alt={`internship ${index}`} />
                                    </div>
                                    <div className="service-content rounded-bottom bg-light p-4">
                                        <div className="service-content-inner">
                                            <h5 className="mb-3">{service.title}</h5>
                                            <p className="mb-2">{service.para}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                        <div className="text-center mt-4">
                            <button className="btn btn-primary" onClick={() => navigate('/internship')}>See More</button>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Intenship;
