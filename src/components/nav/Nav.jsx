import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cwlogo from "../../img/Cwlogo.jpg";
import "./Nav.css";
import AdminLogin from "../admin/AdminLogin";
import DownloadData from "../admin/DownloadData";
import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../../api-service/authApi";
import LoaderPage from "../loaderPage";

function CustomNavbar() {
  const location = useLocation();

  const navigate = useNavigate()

  const ServicesRouteRegex = /^\/services(\/[\w-&]+)?$/;
  const CarrersRouteRegex = /^\/careers(\/[\w-&]+)?$/;

  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const hasToken = Boolean(localStorage.getItem("access-token"));

  const profileApiData = useQuery({
    queryKey : ['profileApiData'],
    queryFn: () => getProfileApi(),
    enabled : hasToken
  })

  const profileData = profileApiData?.data?.data?.result

  const handleLogout = () => {
    console.log('clicked.....................');
  
    [
      'access-token',
      'role',
      'roleName',
      'userId',
      'refreshToken',
      'name'
    ].forEach((item) => localStorage.removeItem(item));
    navigate('/')
    // Force page reload to reflect changes
    window.location.reload();
  };
  
  

  return (
    <>
    <Navbar bg="white" expand="lg" fixed="top" className="navbar-light navbar-css">
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand className="p-2">
          <img
            src={Cwlogo}
            height="40"
            className="d-inline-block align-text-top"
            alt="Logo"
          />
        </Navbar.Brand>

        {/* Navbar Toggle */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">

          {profileData?.role?.name === 'ADMIN' ? (
            <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/careers" className={CarrersRouteRegex.test(location.pathname) ? "active" : ""}>
            Careers
            </Nav.Link>
            <Nav.Link as={Link} to="/enrollNow" className={location.pathname === '/enrollNow' ? "active" : ""}>
              EnrollNow
            </Nav.Link>
          </Nav>
          ) : (
            <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={location.pathname === "/about" ? "active" : ""}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/services" className={ServicesRouteRegex.test(location.pathname) ? "active" : ""}>
              Services
            </Nav.Link>
            <Nav.Link as={Link} to="/internship" className={location.pathname === "/internship" ? "active" : ""}>
              Internship
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className={location.pathname === "/products" ? "active" : ""}>
              Our Products
            </Nav.Link>
            <Nav.Link as={Link} to="/careers" className={CarrersRouteRegex.test(location.pathname) ? "active" : ""}>
            Careers
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" className={location.pathname === "/blog" ? "active" : ""}>
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/contactUs" className={location.pathname === "/contactUs" ? "active" : ""}>
              Contact Us
            </Nav.Link>
          </Nav>
          )}
          
          {profileData?.role?.name === 'ADMIN' ? (
            <div className="admin-buttons">
              <Button className="btn-primary rounded-pill text-white py-2 px-4 ms-lg-3 btn-2"
            onClick={handleLogout}>
              Logout
            </Button>
            </div>
          ) : (
          <div>
            {/* <Button
            className="btn-primary rounded-pill text-white py-2 px-4 ms-lg-3 btn-1"
            onClick={() => navigate('/enrollNow')}
          >
            Enroll Now
          </Button> */}
          <Button className="btn-primary rounded-pill text-white py-2 px-4 ms-lg-3 btn-2"
          onClick={()=>setShowAdminLogin(true)}>
           Admin Login
          </Button>
          </div>
        )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
    
      {/* Conditionally Render Admin Login as an Overlay */}
      {showAdminLogin  && (
        <AdminLogin  onClose={()=>setShowAdminLogin(!showAdminLogin)} />
      )}

      {/* Admin Panel - Render only if authenticated as admin */}
      {/* {isAdmin && (
        <DownloadData />
      )} */}

      {(profileApiData?.isLoading || profileApiData?.isFetching) && <LoaderPage/>}
    </>
    
  );
}

export default CustomNavbar;
