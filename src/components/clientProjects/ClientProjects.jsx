import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./clientProject.css";
import Marquee from "react-fast-marquee";

const LogoSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 5, // Default to show 5 logos
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // Continuous scrolling
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // Mobile view breakpoint
        settings: {
          slidesToShow: 2, // Show only 2 logos on smaller screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450, // Mobile view breakpoint
        settings: {
          slidesToShow: 1, // Show only 2 logos on smaller screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  const logos = [
    "/img/logos/bismillah.png",
    "/img/logos/green naturals.png",
    "/img/logos/logo1.png",
    "/img/logos/logo2.png",
    "/img/logos/logo3.png",
    "/img/logos/logo4.jpg",
    "/img/logos/maya.jpg",
    "/img/logos/logo5.png",
  ];

  return (
    <div className="container-fluid logo-slider ">
      <div className="container py-2 text-center">
        <h1 className="mb-5 mt-4 text-uppercase">Our Trusted Partners</h1>
        <Marquee
          className="marquee-container"
          direction="left"
          speed={25}
          loop={0}
          gradient={false}
        >
          <div className="marquee-grid">
            {logos?.map((item, index) => (
              <div key={index} className="marquee-item">
                <img src={item} alt="" className="marquee-image" />
              </div>
            ))}
          </div>
        </Marquee>
         {/* <Slider {...settings}>
          {logos.map((logo, index) => (
           <div key={index} className="logo-slide">
             <img src={logo} alt={`Logo ${index + 1}`} className="" />
           </div>
         ))}
        </Slider>  */}
      </div>
    </div>
  );
};

export default LogoSlider;
