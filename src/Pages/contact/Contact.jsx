import React from 'react';
// import './Contact.css'; // Assuming you have a separate CSS file for styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Footer from '../../components/footer/Footer';

const Contact = () => {
  return (
   <div>
     <div className="container-fluid contact py-5">
      <div className="container py-5">
        <div className="section-title mb-5 wow fadeInUp" data-wow-delay="0.1s">
          <div className="sub-style mb-4">
            <h4 className="sub-title text-white px-3 mb-0">Contact Us</h4>
          </div>
          <p className="mb-0 text-black-50" style={{ fontSize: '30px', fontFamily: "'Times New Roman', Times, serif" }}>
            Feel free to reach out to us using the contact information below, and well get back to you as soon as possible
          </p>
        </div>
        <div className="row g-4 align-items-center">
          <div className="col-lg-5 col-xl-5 contact-form wow fadeInLeft" data-wow-delay="0.1s">
            <h2 className="display-5 text-white mb-2">Get in Touch</h2>
            <p className="mb-4 text-white">The contact form is currently inactive. You can contact us any time.</p>
            <form action="https://formsubmit.co/corpwingsofficial@gmail.com" method="post">
              <div className="row g-3">
                <div className="col-lg-12 col-xl-6">
                  <div className="form-floating">
                    <input type="text" name="Name" className="form-control bg-transparent border border-white" id="name" placeholder="Your Name" />
                    <label htmlFor="name">Your Name</label>
                  </div>
                </div>
                <div className="col-lg-12 col-xl-6">
                  <div className="form-floating">
                    <input type="email" name="Email" className="form-control bg-transparent border border-white" id="email" placeholder="Your Email" />
                    <label htmlFor="email">Your Email</label>
                  </div>
                </div>
                <div className="col-lg-12 col-xl-6">
                  <div className="form-floating">
                    <input type="tel" name="Phone" className="form-control bg-transparent border border-white" id="phone" placeholder="Phone" />
                    <label htmlFor="phone">Your Phone</label>
                  </div>
                </div>
                <div className="col-lg-12 col-xl-6">
                  <div className="form-floating">
                    <input type="text" name="Need" className="form-control bg-transparent border border-white" id="project" placeholder="Project" />
                    <label htmlFor="project">Your Need</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <textarea name="Message" className="form-control bg-transparent border border-white" placeholder="Leave a message here" id="message" style={{ height: '160px' }}></textarea>
                    <label htmlFor="message">Message</label>
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" name="send message" className="btn btn-light text-primary w-100 py-3">SUBMIT NOW</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-2 col-xl-2 wow fadeInUp" data-wow-delay="0.5s">
            <div className="bg-transparent rounded">
              <div className="d-flex flex-column align-items-center text-center mb-4">
                <div className="bg-white d-flex align-items-center justify-content-center mb-3" style={{ width: '90px', height: '90px', borderRadius: '50px' }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className="text-primary" />
                </div>
                <h4 className="text-dark">Addresses</h4>
                <p className="mb-0 text-white">Address: 22, Raja St, Teachers Colony, Pudupet, Ambapuram, Gudiyatham, Tamil Nadu 632602</p>
              </div>
              <div className="d-flex flex-column align-items-center text-center mb-4">
                <div className="bg-white d-flex align-items-center justify-content-center mb-3" style={{ width: '90px', height: '90px', borderRadius: '50px' }}>
                  <FontAwesomeIcon icon={faPhoneAlt} size="2x" className="text-primary" />
                </div>
                <h4 className="text-dark">Mobile</h4>
                <p className="mb-0 text-white">6380341944</p>
              </div>
              <div className="d-flex flex-column align-items-center text-center">
                <div className="bg-white d-flex align-items-center justify-content-center mb-3" style={{ width: '90px', height: '90px', borderRadius: '50px' }}>
                  <FontAwesomeIcon icon={faEnvelopeOpen} size="2x" className="text-primary" />
                </div>
                <h4 className="text-dark">Email</h4>
                <p className="mb-0 text-white">corpwingsofficial@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-xl-5 wow fadeInRight" data-wow-delay="0.3s">
            <div className="d-flex justify-content-center mb-4">
              <a className="btn btn-lg-square btn-light rounded-circle mx-2" href="https://www.facebook.com/profile.php?id=61551346386976&mibextid=ZbWKwL">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a className="btn btn-lg-square btn-light rounded-circle mx-2" href="https://twitter.com/Corpwings_offi?t=jx8nPpPWYghfRuiRBeZw8w&s=08">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a className="btn btn-lg-square btn-light rounded-circle mx-2" href="https://www.instagram.com/corpwings_official?igsh=MW95bHQyODcyOTFwag==">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a className="btn btn-lg-square btn-light rounded-circle mx-2" href="https://www.linkedin.com/groups/9514782">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
            <div className="rounded h-100">
              <iframe
                className="rounded w-100"
                style={{ height: '500px' }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7472.989538742909!2d78.8676071!3d12.947211099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43f5c50c94d14ed%3A0x3d91dab7f64a8487!2sCorp%20Wings%20IT%20Service%20and%20Consultancy!5e1!3m2!1sen!2sin!4v1738221046141!5m2!1sen!2sin"
                width="600"
                height="450"
                // style={{ border: '0' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
   </div>
  );
};

export default Contact;