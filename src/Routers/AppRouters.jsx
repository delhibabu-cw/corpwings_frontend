import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import ServicesPage from "../Pages/Services";
import IntershipPage from "../Pages/Interships";
import CustomNavbar from "../components/nav/Nav";
import AboutPage from "../Pages/about/AboutPage";
import OurTeam from "../Pages/ourTeam/OurTeam";
import ScrollToTop from "../components/scrollToTop";
import Blog from "../Pages/blog/Blog";
import Contact from "../Pages/contact/Contact";
import EnrollNowPage from "../Pages/EnrollNow";
import CarrersPage from "../Pages/carrers";
import CarrersSinglePage from "../Pages/careersSinglePage";
import NoDataFound from "../components/noDataFound";

const AppRouters = () => {


  return (
    <div>

      <BrowserRouter>
      <ScrollToTop/>
      <CustomNavbar />
        <Routes>
          
          <Route path="/" element={<App />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services/:id?" element={<ServicesPage />} />
          <Route path="/internship" element={<IntershipPage />} />
          <Route path="/products" element={<OurTeam />} />
          <Route path="/careers" element={<CarrersPage />} />
          <Route path="/careers/:id?" element={<CarrersSinglePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contactUs" element={<Contact />} />
          <Route path="/enrollNow" element={<EnrollNowPage />} />
          <Route path="*" element={<NoDataFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouters;
