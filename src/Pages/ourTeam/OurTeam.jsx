import React, { useState } from 'react';
import billing from '../../img/OurProducts/image1.jpg';
import digitalmenu from '../../img/OurProducts/image2.jpeg';
import elearing from '../../img/elearning.jpg';
import ecommerce from '../../img/ecommerce.jpg';
import application from '../../img/application.jpg';
import './OurTeam.css';
import Footer from '../../components/footer/Footer';
import ServicesBannerImg from "../../img/BannerSections/ourProducts.jpg"
import imageStyles from "../../components/animation/imageLoader/imageLoader.module.css";

const OurTeam = () => {

    const mockData=[
        { img : billing, title: 'Billing Software', para: 'Billing software is a digital tool designed to automate invoicing' },
        { img : digitalmenu, title: 'Digital Menu', para: 'A digital menu is an interactive, electronic version of a restaurant' },
        { img : elearing, title: 'E-Learning Portal', para: 'An e-learning portal is an online platform that provides access to educational resources' },
        { img : ecommerce, title: 'E-Commerce Website', para: 'An e-commerce website is an online platform that enables businesses' },
        { img : application, title: 'Customized Software', para: 'BCustomized software is tailor-made software designed to meet the specific requirements' },
    ]

        const [loader, setLoader] = useState(true);
        const [error, setError] = useState(false);

    return (
          <div className='heading-custom'>
                   <div className='banner-section'>
                       {loader && !error && (
                                           <div className='loader'>
                                             <div className={imageStyles?.loader}></div>
                                           </div>
                                         )}
                                           <img
                                             src={ServicesBannerImg}
                                             className={`${loader || error ? "hidden" : ""}`}
                                             onLoad={() => setLoader(false)}
                                             onError={() => {
                                               setLoader(false);
                                               setError(true);
                                             }}
                                           />
                     <div className='black-screen'>
                       <div className='black-screen-content'>
                       <h1>Our Products</h1>
                       <p>We offer cutting-edge IT products, including software solutions, cloud services, and cybersecurity tools, designed to enhance business efficiency and security.</p>
                       </div>
                     </div>
                   </div>
        <div className="team py-5" style={{ padding: 0 }}>
            <div className=" px-0">
                <div className="">
                    <div className="section-title mb-5  fadeInUp" data-wow-delay="0.1s">
                        {/* <div className="sub-style">
                            <h4 className="sub-title px-3 mb-2">our products</h4>
                        </div> */}
                        <h4 className="display-4 mb-4 " style={{ fontWeight: "400", fontFamily: 'Poppins' }}>
                            Corpwings IT Service, Innovation
                        </h4>

                        <p className="mb-0" style={{ color: '#8d8d8d', fontSize: '18px', }}>
                            At Corpwings, innovation is at the heart of everything we do. Our IT services are designed to empower businesses to stay ahead in an ever-changing digital landscape. From cutting-edge technologies to tailored solutions, we are dedicated to creating impactful transformations for our clients.
                        </p>
                    </div>
                    <div className='card-data'>
                        {mockData?.map((item,index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-2 wow fadeInUp card-data-custom" data-wow-delay="0.1s">
                            <div className="team-item rounded">
                                <div className="team-img rounded-top  card-custom-image-div">
                                    <img src={item?.img} className="img-fluid rounded-top w-100" alt="Billing" />
                                </div>
                                <div className="team-content text-center border border-primary border-top-0 rounded-bottom p-4">
                                    <h5>{item?.title}</h5>
                                    <p className="mb-0">{item?.para}</p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    {/* <div className="row justify-content-center">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-2 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item rounded">
                                <div className="team-img rounded-top h-100">
                                    <img src={billing} className="img-fluid rounded-top w-100" alt="Billing" />
                                </div>
                                <div className="team-content text-center border border-primary border-top-0 rounded-bottom p-4">
                                    <h5>Billing Software</h5>
                                    <p className="mb-0">Billing software is a digital tool designed to automate invoicing</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-2 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="team-item rounded">
                                <div className="team-img rounded-top h-100">
                                    <img src={digitalmenu} className="img-fluid rounded-top w-100" alt="Digital Menu" />
                                </div>
                                <div className="team-content text-center border border-primary border-top-0 rounded-bottom p-4">
                                    <h5>Digital Menu</h5>
                                    <p className="mb-0">A digital menu is an interactive, electronic version of a restaurant</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-2 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="team-item rounded">
                                <div className="team-img rounded-top h-100">
                                    <img src={elearing} className="img-fluid rounded-top w-100" alt="E-Learning" />
                                </div>
                                <div className="team-content text-center border border-primary border-top-0 rounded-bottom p-4">
                                    <h5>E-Learning Portal</h5>
                                    <p className="mb-0">
                                    An e-learning portal is an online platform that provides access to educational resources</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-2 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="team-item rounded">
                                <div className="team-img rounded-top h-100">
                                    <img src={ecommerce} className="img-fluid rounded-top w-100" alt="E-Commerce" />
                                </div>
                                <div className="team-content text-center border border-primary border-top-0 rounded-bottom p-4">
                                    <h5>E-Commerce Website</h5>
                                    <p className="mb-0">An e-commerce website is an online platform that enables businesses</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-2 col-xl-2 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="team-item rounded">
                                <div className="team-img rounded-top h-100">
                                    <img src={application} className="img-fluid rounded-top w-100" alt="Customized Software" />
                                </div>
                                <div className="team-content text-center border border-primary border-top-0 rounded-bottom p-4">
                                    <h5>Customized Software</h5>
                                    <p className="mb-0">Customized software is tailor-made software designed to meet the specific requirements </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default OurTeam;
