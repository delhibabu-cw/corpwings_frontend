import React from "react";
import creative from "../../img/creative.png";
import collob from "../../img/collob.png";
import expert from "../../img/expert.png";
import roll from "../../img/roll.png";
import "./ChooseSection.css"

const ChooseSection = () => {

    const mockData = [
        { img : creative, title : 'CUSTOMIZED SOLUTIONS' , para : 'At Customized Solution, we understand that managing and ever changing IT world isnt easy while focusing on your core business.'},
        { img : collob, title : 'CREATIVE SOLUTION' , para : 'Creative thinking enables you to challenge current ideas and understand the urgency, relevance, and purpose of new solutions'},
        { img : expert, title : 'EXPERT TEAMS' , para : 'The idea of an expert team is that, first the skills or expertise of each individual team member,maintain technology product.'},
        { img : roll, title : 'ROL-DRIVEN APPROACH' , para : 'ROI used to evaluate the efficiency of an organizations learning investments,access control mechanism defined around.'}
    ]

  return (
    <div class="container-fluid feature py-3">
      <div class="container py-5">
        <div class="section-title mb-5 wow fadeInUp" data-wow-delay="0.1s">
          <div class="sub-style">
            <h4 class="sub-title px-3 mb-0">Why Choose Us</h4>
          </div>
          <h1 class="display-3 mb-4">
            Why Choose Us? Get Your Life Style Back
          </h1>
          <p class="mb-0">
            With our website creation service, we craft tailored online
            platforms that captivate, engage, and convert.Whether you're a
            budding startup or an established enterprise, we're here to elevate
            your online presence and propel your business to new heights.
          </p>
        </div>
        <div class="row g-4 justify-content-center">
            {mockData?.map((item,index) => (
                <div
                class="col-md-6 col-lg-4 col-xl-3 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div class="row-cols-1 feature-item p-4">
                  <div class="col-12">
                    <div class="feature-icon mb-4">
                      <div class="p-3 d-inline-flex bg-white rounded">
                        <img
                          src={item?.img}
                          style={{
                            width: "80px",
                            height: "64px",
                          }}
                          alt="Creative"
                        />
                      </div>
                    </div>
                    <div class="feature-content d-flex flex-column">
                      <h5 class="mb-4">{item?.title}</h5>
                      <p class="mb-0">
                        {item?.para}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseSection;
