import React from 'react';
import DigitalMarketing from '../../img/DigitalMarketing.jpg';
import seeee from '../../img/seeee.jpg';
import GraphicDesign from '../../img/GraphicDesign.jpg';
import Footer from '../../components/footer/Footer';

const Blog = () => {
  return (
    <div>
      <div className="container-fluid blog py-5">
        <div className="container py-5">
          <div className="section-title mb-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="sub-style">
              <h4 className="sub-title px-3 mb-0">Our Blog</h4>
            </div>
            <h1 className="display-3 mb-4">INNOVATIVE AND OPTIMIZE SOLUTIONS</h1>
            <p className="mb-0" style={{ color: '#8d8d8d', fontSize: '18px' }}>With our website creation service, we craft tailored online platforms that captivate, engage, and convert. Whether you're a budding startup or an established enterprise, we're here to elevate your online presence and propel your business to new heights. Partner with Corpwings and unlock the potential of the digital world today.</p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.1s">
              <div className="blog-item rounded">
                <div className="blog-img">
                  <img src={DigitalMarketing} className="img-fluid w-100" alt="" />
                </div>
                <div className="blog-centent p-4">
                  <a href="https://your-website.com/digital-marketing" className="h4" style={{ textDecoration: 'none' }}>DIGITAL MARKETING IN TamilNadu</a>
                  <p className="my-4">Whether you're a budding startup or an established enterprise, we're here to elevate your online presence and propel your business to new heights. Partner with Corpwings and unlock the potential of the digital world today.</p>
                  <a href="https://your-website.com/digital-marketing" className="btn btn-primary rounded-pill text-white py-2 px-4 mb-1">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.3s">
              <div className="blog-item rounded">
                <div className="blog-img">
                  <img src={seeee} className="img-fluid w-100" alt="" />
                </div>
                <div className="blog-centent p-4">
                  <a href="https://seeweads.netlify.app/" className="h4" style={{ textDecoration: 'none' }}>Government projects and tenders</a><br /><br />
                  <p className="my-4">
                    Government projects and tenders involve public sector contracts for goods, services, or infrastructure development, typically awarded through a competitive bidding process.</p>
                  <a href="https://seeweads.netlify.app/" className="btn btn-primary rounded-pill text-white py-2 px-4 mb-1">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.5s">
              <div className="blog-item rounded">
                <div className="blog-img z-0">
                  <img src={GraphicDesign} className="img-fluid w-100 z-0" alt="" />
                </div>
                <div className="blog-centent p-4">
                  <h3>Upcoming ......</h3>
                  <p className="my-4">Process Going on...</p>
                  <a href="https://corpwings.in" className="btn btn-primary rounded-pill text-white py-2 px-4 mb-1">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Blog;
