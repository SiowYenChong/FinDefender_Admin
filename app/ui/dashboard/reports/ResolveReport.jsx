"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js"; // Import Supabase client
import styles from "./ResolveReport.module.css"; // Import the CSS module

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ResolveReport = ({ report, onBack }) => {
  const [status, setStatus] = useState(report.status || "Unresolved");
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal state
  const [modalImage, setModalImage] = useState(null); // To store the image URL for the modal
  const [loading, setLoading] = useState(false); // To manage loading state

  // Function to handle resolving the report
  const handleResolve = async () => {
    const userConfirmed = window.confirm(
      "Warning: This report will be marked as resolved and permanently removed from the reports database. Do you want to proceed?"
    );

    if (!userConfirmed) {
      return; // Exit if the user cancels the action
    }

    try {
      setLoading(true);
      // Delete the record from the database
      const { error } = await supabase
        .from("submitted_report") // Replace "reports" with your actual table name
        .delete()
        .eq("id", report.id); // Match the report ID

      if (error) {
        console.error("Error deleting report:", error.message);
        alert("Failed to resolve the report. Please try again.");
        setLoading(false);
        return;
      }

      setStatus("Resolved");
      alert("Report has been resolved and removed from the database!");
      onBack(); // Navigate back to the reports list after resolving
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to open the modal with the clicked image
  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl); // Set the modal image URL
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

  console.log("Report Data:", report);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        Back to Reports
      </button>
      <h2>Resolve Report</h2>
      <div className={styles.details}>
        <p><strong>Transaction ID:</strong> {report.transaction_id}</p>
        <p><strong>Date Created:</strong> {report.created_at ? formatDate(report.created_at) : "N/A"}</p>
        <p><strong>Creditor Account:</strong> {report.creditor_account_number}</p>
        <p><strong>Debitor Account:</strong> {report.debitor_account_number}</p>
        <p><strong>Creditor Email:</strong> {report.creditor_email}</p>
        <p><strong>Creditor Phone Number:</strong> {report.creditor_phone_number}</p>
        <p><strong>Mode of Contact:</strong> {report.mode_of_contact}</p>
        <p><strong>Description:</strong> {report.description}</p>

        {/* Display attached images if they exist and make them clickable */}
        {report.image_1?.signedURL && (
          <p>
            <strong>Image 1:</strong>
            <img
              src={report.image_1.signedURL}
              alt="Image 1"
              className={styles.image}
              onClick={() => handleImageClick(report.image_1.signedURL)}
            />
          </p>
        )}
        {report.image_2?.signedURL && (
          <p>
            <strong>Image 2:</strong>
            <img
              src={report.image_2.signedURL}
              alt="Image 2"
              className={styles.image}
              onClick={() => handleImageClick(report.image_2.signedURL)}
            />
          </p>
        )}
        {report.image_3?.signedURL && (
          <p>
            <strong>Image 3:</strong>
            <img
              src={report.image_3.signedURL}
              alt="Image 3"
              className={styles.image}
              onClick={() => handleImageClick(report.image_3.signedURL)}
            />
          </p>
        )}

        <p><strong>Status:</strong> {status}</p>
      </div>
      <button
        className={styles.resolveButton}
        onClick={handleResolve}
        disabled={loading}
      >
        {loading ? "Resolving..." : "Mark as Resolved"}
      </button>

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
