"use client"; // Mark this component as client-side

import React, { useState } from "react";
import styles from "./ResolveReport.module.css"; // Import the CSS module

const ResolveReport = ({ report, onBack }) => {
  const [status, setStatus] = useState(report.status || "Unresolved");
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal state
  const [modalImage, setModalImage] = useState(null); // To store the image URL for the modal

  // Function to handle resolving the report
  const handleResolve = () => {
    setStatus("Resolved");
    // You can add any logic to update the status in the database here
    alert("Report has been resolved!");
  };

  // Function to open the modal with the clicked image
  const handleImageClick = (imageUrl) => {
    const extractedUrl = extractImageURL(imageUrl); // Extract the base URL
    setModalImage(extractedUrl); // Set the modal image URL
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalImage(null); // Reset the modal image when closed
  };

  // Format created_at to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // This will format the date to a readable string
  };

  // Function to remove the token from the URL
  const extractImageURL = (url) => {
    if (typeof url === 'string' && url.includes('?')) {
      return url.split('?')[0]; // Remove the token part of the URL
    }
    return url; // If the URL does not contain a '?', return it as is
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>Back to Reports</button>
      <h2>Resolve Report</h2>
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

        <p><strong>Status:</strong> {status}</p>
      </div>
      <button className={styles.resolveButton} onClick={handleResolve}>Mark as Resolved</button>

      {/* Modal to display image */}
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

export default ResolveReport;
