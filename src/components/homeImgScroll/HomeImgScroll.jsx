import React, { useState, useEffect } from "react";
import Homeimage1 from "../../img/Homeimage1.jpg";
import Homeimage2 from "../../img/Homeimage2.jpg";
import "./HomeImgScroll.css";
import { Link } from "react-router-dom";

const images = [Homeimage1, Homeimage2, Homeimage1, Homeimage2];
const texts= [
  'Start Your Career, The Next Big Thing In The IT Industry',
  `Unlock Your Digital Transformation, Navigating the Dream's`,
  `Your Technical Problems, Our IT Expert Solution`,
  `Solving Breaks, Building Trust`
]
const HomeImgScroll = () => {

  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    setZoom(true);
    
    const zoomTimeout = setTimeout(() => {
      setZoom(false);
    }, 5500);
    
    const imageTimeout = setTimeout(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setZoom(true);
    }, 8000);
    return () => {
      clearTimeout(zoomTimeout);
      clearTimeout(imageTimeout);
    };
  }, [currentImage]);

  return (
    <div className="home-img-scroll">
      <div className={`image-container ${zoom ? "zoom" : ""}`}>
        <img src={images[currentImage]} alt={`Slide ${currentImage + 1}`} />
      </div>
      <div className="text-container">
        <h1>{texts[currentImage]}</h1>
        {/* <h1>{texts[currentImage].length > 50 ? 
        texts[currentImage].slice(0,50+"...") : texts[currentImage]}</h1> */}
        <Link className="btn btn-primary" to={'/enrollNow'}>Enroll Now</Link>
      </div>
    </div>
  );
};

export default HomeImgScroll;
