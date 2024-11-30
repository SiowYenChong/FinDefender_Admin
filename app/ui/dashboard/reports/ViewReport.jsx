"use client"; // Mark this component as client-side

import React, { useState } from "react"; // Import useState from React
import styles from "./ViewReport.module.css"; // Import the CSS module

// Format created_at to a readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // This will format the date to a readable string
};

// Function to extract image URL if necessary (could be a URL construction logic)
const extractImageURL = (imageName) => {
  return `/path/to/images/${imageName}`; // Replace with actual logic to get image URL
};

const ViewReport = ({ report, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [modalImage, setModalImage] = useState(""); // Modal image state

  // Function to open the modal with the clicked image
  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };
  
  // Function to close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>Back to Reports</button>
      <h2>Report Details</h2>
      <div className={styles.details}>
        <p><strong>Transaction ID:</strong> {report.transaction_id}</p>
        <p><strong>Date Created:</strong> {report.created_at ? formatDate(report.created_at) : 'N/A'}</p>
        <p><strong>Creditor Account:</strong> {report.creditor_account_number}</p>
        <p><strong>Debitor Account:</strong> {report.debitor_account_number}</p>
        <p><strong>Creditor Email:</strong> {report.creditor_email}</p>
        <p><strong>Creditor Phone Number:</strong> {report.creditor_phone_number}</p>
        <p><strong>Mode of Contact:</strong> {report.mode_of_contact}</p>
        <p><strong>Description:</strong> {report.description}</p>
        
        {/* Display attached images if they exist and make them clickable */}
        {report.image_1 && (
          <p><strong>Image 1:</strong> 
            <img 
              src={extractImageURL(report.image_1)} 
              alt="Image 1" 
              className={styles.image} 
              onClick={() => handleImageClick(report.image_1)} 
            />
          </p>
        )}
        {report.image_2 && (
          <p><strong>Image 2:</strong> 
            <img 
              src={extractImageURL(report.image_2)} 
              alt="Image 2" 
              className={styles.image} 
              onClick={() => handleImageClick(report.image_2)} 
            />
          </p>
        )}
        {report.image_3 && (
          <p><strong>Image 3:</strong> 
            <img 
              src={extractImageURL(report.image_3)} 
              alt="Image 3" 
              className={styles.image} 
              onClick={() => handleImageClick(report.image_3)} 
            />
          </p>
        )}
      </div>

      {/* Modal to display larger image */}
      {isModalOpen && (
        <div className={styles.modal} onClick={handleModalClose}>
          <div className={styles.modalContent}>
            <img src={modalImage} alt="Large view" className={styles.modalImage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewReport;
