
// import '../../css/style.css';
import Developing from '../../img/services/developing1.jpg';
import Designing from '../../img/services/designingnew1.webp';
import DigitalMarketing from '../../img/services/marketing1.avif';
import Branding from '../../img/services/brandingnew1.webp';
import "./Services.css"
import { useNavigate } from "react-router-dom";

const serviceData = [
    { img: Developing, title: "Developing", path: 'developing', desc: "Crafting high-performance, scalable, and secure web & mobile applications tailored to your business needs." },
    { img: Designing, title: "Designing", path: 'designing', desc: "Creating visually stunning and user-friendly designs that enhance brand identity and user experience." },
    { img: DigitalMarketing, title: "Digital Marketing", path: 'digitalMarketing', desc: "Driving growth through SEO, social media, and targeted advertising to boost online presence." },
    { img: Branding, title: "Branding", path: 'branding', desc: "Building a strong, memorable brand identity that sets you apart from the competition." },
]

const Services = () => {

    const navigate = useNavigate()

    return (
        <div className="container-fluid service py-4">
            <div className="container py-5">
                <div className="section-title mb-5">
                    <h1 className=" mb-4">OUR SERVICES</h1>
                </div>
                <div className="row g-4 justify-content-center">
                    {serviceData.map((service, index) => (
                        <div key={index} className="col-md-6 col-lg-4 col-xl-3 card-data"
                        onClick={()=>navigate(`/services/${service.path}`)}>
                            <div className="service-item rounded">
                                <div className="service-img rounded-top image-custom">
                                    <img src={service.img} className="img-fluid rounded-top w-100 h-100" alt={service.title} />
                                </div>
                                <div className="service-content rounded-bottom bg-light p-4">
                                    <h5 className="mb-4">{service.title}</h5>
                                    <p className="mb-3">{service.desc}</p>
                                    <h6 className='text-decoration-underline'>See More</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-5">
                            <button className="btn btn-primary" onClick={() => navigate('/services')}>See More</button>
                        </div>
            </div>
        </div>
    );
};

export default Services;
