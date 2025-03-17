import '../../css/style.css';
import HeroImage from '../../img/hero.jpg';  // Add a hero image
import servicesData from './servicesData';  // Create a separate file for services data

const AllServices = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section text-center text-white py-5" style={{ 
                backgroundImage: `url(${HeroImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                height: '300px'
            }}>
                <h1 className="display-3">All Services</h1>
                <p className="lead">Explore our complete range of services</p>
            </div>

            {/* Services List */}
            <div className="container py-5">
                <div className="row g-4 justify-content-center">
                    {servicesData.map((service, index) => (
                        <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                            <div className="service-item rounded">
                                <div className="service-img rounded-top">
                                    <img src={service.img} className="img-fluid rounded-top w-100" alt={service.title} />
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
    );
};

export default AllServices;
