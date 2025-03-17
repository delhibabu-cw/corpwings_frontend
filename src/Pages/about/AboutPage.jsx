import React, { useState } from "react";
import About1 from "../../img/About1.jpeg";
import "./About.css";
import Footer from "../../components/footer/Footer";
import ServicesBannerImg from "../../img/BannerSections/aboutUs.jpg";
import imageStyles from "../../components/animation/imageLoader/imageLoader.module.css";

const AboutPage = () => {
  
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
            <h1>About Us</h1>
            <p>
              We provide innovative IT solutions, including software
              development, cybersecurity, and digital transformation, to help
              businesses thrive in the digital era.
            </p>
          </div>
        </div>
      </div>
      <div class="container-fluid about bg-light py-3 mt-5">
        <div class="container py-5">
          <div class="row g-5 align-items-center">
            <div class="col-lg-5 wow fadeInLeft" data-wow-delay="0.2s">
              <div class="about-img pb-5 ps-5">
                <img
                  src={About1}
                  class="img-fluid rounded w-100"
                  style={{ objectFit: "cover", height: "450px" }} // Set a custom height
                  alt=""
                />
              </div>
            </div>
            <div
              class="col-lg-7 wow fadeInRight section-custom"
              data-wow-delay="0.4s"
            >
              <div class="section-title text-start mb-5">
                <h4 class="sub-title pe-3 mb-3 st-h4 section-custom">
                  About Us
                </h4>
                <h4 class="display-5 mb-4  section-custom">
                  With a focus on innovation & creativity
                </h4>
                <p class="mb-3" style={{ color: "#8d8d8d", fontSize: "18px" }}>
                  Welcome to Corpwings, where we transform your digital dreams
                  into reality. With our website creation service, we craft
                  tailored online platforms that captivate, engage, and convert.
                  Our team of seasoned designers and developers meticulously
                  curate every aspect of your website, ensuring seamless
                  functionality, stunning aesthetics, and user-friendly
                  navigation.
                </p>
                <div class="mb-4">
                  <p class="text-secondary">
                    <i class="fa fa-check text-primary "></i>Quality of content.
                  </p>
                  <p class="text-secondary">
                    <i class="fa fa-check text-primary "></i> Level of user
                    engagement.
                  </p>
                  <p class="text-secondary">
                    <i class="fa fa-check text-primary "></i>Mobile-friendliness
                    & Number and quality of inbound links
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
