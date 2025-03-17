import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ServicesPage.css";
import SoftwareDeveloping from '../../img/services/Developing/image1.jpg';
import AppDeveloping from '../../img/AppDeveloping.jpg';
import WebDeveloping from '../../img/WebDeveloping.jpg';
import Nocode from '../../img/Nocode.jpg';
import BrandInteriorDesign from '../../img/services/Developing/image4.jpg';
import BannerDesign from '../../img/services/Developing/image5.jpg';
import PosterDesign from '../../img/services/Developing/image2.webp';
import LogoDesign from '../../img/services/Developing/image3.jpg';
import SEO from '../../img/SEEO.jpg';
import SocialMedia from '../../img/social media.jpg';
import ContentMarketing from '../../img/content marketing.jpg';
import TrademarkRegistartion from '../../img/services/Developing/image6.jpg';
import TaxFilling from '../../img/services/Developing/image7.jpg';
import BusinessConsultancy from '../../img/services/Developing/image8.webp';
import FranchiseEnquiry from '../../img/services/Developing/image9.jpeg';
import TeamManagement from '../../img/services/Developing/image10.jpg';
import BrandRegistration from '../../img/services/Developing/image11.jpg';
import Footer from '../../components/footer/Footer';

import ServicesBannerImg from "../../img/BannerSections/services.jpg"
import imageStyles from "../../components/animation/imageLoader/imageLoader.module.css";

const ServicesPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();

  // Refs for each section
  const developingRef = useRef(null);
  const designingRef = useRef(null);
  const marketingRef = useRef(null);
  const brandingRef = useRef(null);

  // Mapping sections to refs
  const sectionRefs = {
    developing: developingRef,
    designing: designingRef,
    digitalMarketing: marketingRef,
    branding: brandingRef
  };

  // Scroll to section when id changes
  useEffect(() => {
    if (id && sectionRefs[id]) {
      const offset = 80; // Adjust this value based on your navbar height
      const element = sectionRefs[id].current;
  
      if (element) {
        const topPosition = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: topPosition, behavior: "smooth" });
      }
    }
  }, [id]);

  
  // useEffect(() => {
  //   if (id && sectionRefs[id]) {
  //     sectionRefs[id].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // }, [id]);

  const developingData = [
    { img: SoftwareDeveloping, title: "Software Developing", desc: "Creating software applications through coding and testing for various industries."},
    { img: AppDeveloping, title: "App Developing", desc: "Building mobile and web applications to enhance user experience and functionality."},
    { img: WebDeveloping, title: "Web Developing", desc: "Designing and developing websites for businesses and online presence." },
    { img: Nocode, title: "Nocode Developing", desc: "Creating applications without coding using drag-and-drop platforms." },
  ];

  const designingData = [
    { img: PosterDesign, title: "Poster Designing", desc: "Crafting visually appealing posters for marketing and promotions." },
    { img: LogoDesign, title: "Logo Designing", desc: "Designing unique logos to establish brand identity." },
    { img: BrandInteriorDesign, title: "Brand Interior Designing", desc: "Enhancing interior spaces to align with a brand’s identity and theme." },
    { img: BannerDesign, title: "Banners Designing", desc: "Creating engaging banners for advertisements and promotions." },
  ];

  const marketingData = [
    { img: SEO, title: "SEO", desc: "Optimizing websites to improve search engine rankings and visibility." },
    { img: SocialMedia, title: "Social Media", desc: "Managing social platforms to increase engagement and brand awareness." },
    { img: ContentMarketing, title: "Content Marketing", desc: "Creating and distributing valuable content to attract and retain customers." },
  ];

  const brandingData = [
    { img: BrandRegistration, title: "Brand Registration", desc: "Legally registering a brand to establish ownership and protection." },
    { img: TrademarkRegistartion, title: "TradeMark Registration", desc: "Securing legal rights to a brand name, logo, or symbol." },
    { img: BusinessConsultancy, title: "Business Consultancy", desc: "Providing expert advice to improve business strategies and growth." },
    { img: FranchiseEnquiry, title: "Franchise Enquiry", desc: "Guiding businesses on expanding through franchising opportunities." },
    { img: TaxFilling, title: "Tax Filling", desc: "Preparing and submitting tax returns in compliance with regulations." },
    { img: TeamManagement, title: "Team Management", desc: "Leading and organizing teams for efficient workflow and productivity." },
  ];

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
          <h1>Services</h1>
          <p>Providing comprehensive technology solutions, including software development, cybersecurity, cloud computing, and IT support to enhance business operations.</p>
          </div>
        </div>
      </div>
      <div className="container-fluid service py-4">
        <div className="container py-5" ref={developingRef}>
          <div className="section-title mb-5">
            <h1 className="mb-4">Developing</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {developingData.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4 col-xl-3 card-data"
                onClick={() => navigate(`/services/developing`)}>
                <div className="service-item rounded">
                  <div className="service-img rounded-top image-custom">
                    <img src={service.img} className="img-fluid rounded-top w-100 h-100" alt={service.title} />
                  </div>
                  <div className="service-content rounded-bottom bg-light p-4">
                    <h5 className="mb-4">{service.title}</h5>
                    <p className="mb-4">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container py-5" ref={designingRef}>
          <div className="section-title mb-5">
            <h1 className="mb-4">Designing</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {designingData.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4 col-xl-3 card-data"
                onClick={() => navigate(`/services/designing`)}>
                <div className="service-item rounded">
                  <div className="service-img rounded-top image-custom">
                    <img src={service.img} className="img-fluid rounded-top w-100 h-100" alt={service.title} />
                  </div>
                  <div className="service-content rounded-bottom bg-light p-4">
                    <h5 className="mb-4">{service.title}</h5>
                    <p className="mb-4">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container py-5" ref={marketingRef}>
          <div className="section-title mb-5">
            <h1 className="mb-4">Digital Marketing</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {marketingData.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4 col-xl-3 card-data"
                onClick={() => navigate(`/services/marketing`)}>
                <div className="service-item rounded">
                  <div className="service-img rounded-top image-custom">
                    <img src={service.img} className="img-fluid rounded-top w-100 h-100" alt={service.title} />
                  </div>
                  <div className="service-content rounded-bottom bg-light p-4">
                    <h5 className="mb-4">{service.title}</h5>
                    <p className="mb-4">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container py-5" ref={brandingRef}>
          <div className="section-title mb-5">
            <h1 className="mb-4">Branding</h1>
          </div>
          <div className="row g-4 justify-content-center">
            {brandingData.map((service, index) => (
              <div key={index} className="col-md-6 col-lg-4 col-xl-3 card-data"
                onClick={() => navigate(`/services/branding`)}>
                <div className="service-item rounded">
                  <div className="service-img rounded-top image-custom">
                    <img src={service.img} className="img-fluid rounded-top w-100 h-100" alt={service.title} />
                  </div>
                  <div className="service-content rounded-bottom bg-light p-4">
                    <h5 className="mb-4">{service.title}</h5>
                    <p className="mb-4">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  );
}

export default ServicesPage;
