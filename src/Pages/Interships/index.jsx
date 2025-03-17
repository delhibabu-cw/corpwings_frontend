import React, { useState } from "react";
import "./Internship.css";
import software1 from "../../img/software1.jpg";
import digital2 from "../../img/digital2.jpg";
import grapic from "../../img/grapic.jpg";
import ADS from "../../img/ADS.jpg";
import AI from "../../img/AI.jpg";
import selfDelopment from "../../img/selfDelopment.jpg";
import itsector from "../../img/itsector.jpg";
import PP from "../../img/PP.jpg";
import sharemark from "../../img/sharemark.jpg";
import cyber from "../../img/cyber.jpg";
import imageStyles from "../../components/animation/imageLoader/imageLoader.module.css";
import Footer from "../../components/footer/Footer";
import ServicesBannerImg from "../../img/BannerSections/internship.jpg";

const IntershipPage = () => {
  const services = [
    {
      imgSrc: software1,
      title: "SOFTWARE DEVELOPING",
      para: "Software development involves designing, coding, and testing applications. It helps create innovative solutions for businesses and consumers.",
    },
    {
      imgSrc: digital2,
      title: "DIGITAL MARKETING",
      para: "Digital marketing promotes brands through SEO, social media, and online ads. It helps businesses reach and engage their target audience.",
    },
    {
      imgSrc: grapic,
      title: "GRAPHIC DESIGNING",
      para: "Graphic design enhances communication through visuals, typography, and layouts. It is essential for branding, advertising, and digital content.",
    },
    {
      imgSrc: AI,
      title: "ARTIFICIAL INTELLIGENCE",
      para: "AI develops smart systems that learn, analyze, and automate tasks. It improves efficiency and decision-making across industries.",
    },
    {
      imgSrc: ADS,
      title: "ADMINISTRATIVE TECHNICAL SUPPORT",
      para: "This field ensures smooth IT operations by troubleshooting and managing systems. It helps maintain efficiency in businesses and organizations.",
    },
    {
      imgSrc: cyber,
      title: "CYBER SECURITY",
      para: "Cybersecurity protects networks and data from cyber threats and attacks. It ensures privacy, security, and trust in digital systems.",
    },
    {
      imgSrc: selfDelopment,
      title: "SELF DEVELOPMENT",
      para: "Self-development focuses on improving skills, mindset, and productivity. It helps individuals grow personally and professionally.",
    },
    {
      imgSrc: itsector,
      title: "FUNDAMENTALS OF IT SECTOR",
      para: "The IT sector covers computing, networking, and software development. It is the backbone of digital transformation and innovation.",
    },
    {
      imgSrc: PP,
      title: "PROJECT PREPARATION",
      para: "Project preparation involves planning, research, and risk management. It ensures smooth execution and goal achievement.",
    },
    {
      imgSrc: sharemark,
      title: "INVESTMENT & SHARE MARKETING",
      para: "Investment and share marketing involve buying and selling stocks. Strategic decisions maximize profits and financial growth.",
    },
  ];

  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="heading-custom">
      <div className="banner-section">
        {loader && !error && (
          <div className="loader">
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
        <div className="black-screen">
          <div className="black-screen-content">
            <h1>Internships</h1>
            <p>
              Gain hands-on experience in software development, cybersecurity,
              cloud computing, and IT support to build practical skills for a
              successful tech career.
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid service intenship">
        <div className="container py-5 mt-5">
          <div
            className="section-title mb-5 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <h1 className="display-6 mb-4">Our Internship Services</h1>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
            {services?.map((service, index) => (
              <div
                key={index}
                className="col wow fadeInUp"
                data-wow-delay={`${0.1 * (index + 1)}s`}
              >
                <div className="service-item rounded h-100">
                  <div className="loader">
                    {loader && !error && (
                      <div className={imageStyles?.loader}></div>
                    )}
                  </div>
                  <div className=" internship-image">
                    <img
                      src={service.imgSrc}
                      className={`${loader || error ? "hidden" : "hidden"}`}
                      onLoad={() => setLoader(false)}
                      onError={() => {
                        setLoader(false);
                        setError(true);
                      }}
                      alt={`internship ${index}`}
                    />
                  </div>
                  <div className="service-content rounded-bottom bg-light p-4">
                    <div className="service-content-inner">
                      <h5 className="mb-3">{service.title}</h5>
                      <p className="mb-2 text-black-50">{service.para}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IntershipPage;
