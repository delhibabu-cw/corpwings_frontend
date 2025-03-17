import React from 'react';
import './AdminLogin.css'; // Reuse the same CSS file

const DownloadData = ({ onClose }) => {
  const handleDownload = async () => {
    alert('Data Processing'); // Alert the user that data processing is starting

    try {
      const response = await fetch('http://localhost:6000/auth/download-user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Create a Blob object from the response
        const blob = await response.blob();
        const contentDisposition = response.headers.get('Content-Disposition');
        const fileName = contentDisposition ? contentDisposition.split('filename=')[1] : 'data.xlsx';
        const url = window.URL.createObjectURL(blob);

        // Create a link element and simulate a click to download the file
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        // Remove the link element after the download
        document.body.removeChild(link);

        // Notify user that the download was successful
        alert('Data downloaded successfully');

        // Close the admin panel after successful download
        onClose();
      } else {
        alert('Failed to download data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-container">
        <h2>Admin Panel</h2>
        <button onClick={handleDownload}>Download Data</button>
      </div>
    </div>
  );
};

export default DownloadData;
