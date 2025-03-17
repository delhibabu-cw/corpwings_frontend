import React from "react";
import "./LoaderPage.css"; // Import the CSS file

const LoaderPage = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <span className="loaderPage"></span>
      </div>
    </div>
  );
};

export default LoaderPage;
