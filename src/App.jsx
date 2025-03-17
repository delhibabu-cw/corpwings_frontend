import React, { useState } from 'react';
import CustomNavbar from './components/nav/Nav';
import HomeImgScroll from './components/homeImgScroll/HomeImgScroll';
import Services from './components/services/Services'
import ChooseSection from './components/chooseSection/ChooseSection';
import Appointment from './components/appointment/Appointment';
import ClientProjects from './components/clientProjects/ClientProjects';
// import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import AdminLogin from './components/admin/AdminLogin';
import DownloadData from './components/admin/DownloadData';
import Intenship from './components/intenship/Intenship';
import ChatBot from './components/chatbot/chatbot';

const App = () => {

  console.log(import.meta.env);

  return (
    <div>
      {/* <div id="home"><HomeImgScroll /></div> */}
      <HomeImgScroll />
      <ClientProjects />
      <Services />
      <Intenship />
      <ChooseSection />
      <Appointment />
      <ChatBot />
      {/* <Contact /> */}
      <Footer />
      
    
    </div>
  );
};

export default App;
