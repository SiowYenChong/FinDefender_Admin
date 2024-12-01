"use client"; // Mark this component as client-side

import { useState, useEffect } from "react";
import styles from "./reports.module.css"; // Import the CSS file
import ViewReport from "./ViewReport"; // Import the ViewReport component
import ResolveReport from "./ResolveReport"; // Import the ResolveReport component
import supabase from "@/lib/supabaseClient"; // Import Supabase client

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null); // To track selected report
  const [currentPage, setCurrentPage] = useState("table"); // Track current page (table, view, resolve)
  const [filterImages, setFilterImages] = useState(false); // To filter reports with attached images
  const [filterContactMode, setFilterContactMode] = useState(""); // To filter by mode of contact

  // Fetch data from Supabase when component mounts
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from("submitted_report") // Table name
          .select("*"); // Select all columns (or specify columns if needed)

        if (error) {
          console.error("Error fetching reports:", error);
        } else {
          setReports(data); // Set the fetched data to state
        }
      } catch (err) {
        console.error("Error during fetch operation:", err);
      }
    };

    fetchReports();
  }, []); // Empty dependency array means it runs once when the component mounts

  const handleReportClick = (report) => {
    setSelectedReport(report);
    setCurrentPage("view"); // Switch to the view page
  };

  const handleResolveClick = (report) => {
    setSelectedReport(report);
    setCurrentPage("resolve"); // Switch to the resolve page
  };

  const handleBackToTable = () => {
    setCurrentPage("table"); // Go back to the table view
    setSelectedReport(null); // Clear selected report
  };

  // Format created_at to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // This will format the date to a readable string
  };

  // Helper function to check if any images are attached
  const hasAttachedImages = (report) => {
    return (
      report.image_1 || report.image_2 || report.image_3 // Check if any image field is not empty
    );
  };

  // Filter reports based on attached images and mode of contact
  const filteredReports = reports.filter((report) => {
    const hasImages = filterImages ? hasAttachedImages(report) : true;
    const matchesContactMode = filterContactMode ? report.mode_of_contact === filterContactMode : true;

    return hasImages && matchesContactMode;
  });

  return (
    <div className={styles.container}>
      {/* Show filters only when on the table page */}
      {currentPage === "table" && (
        <div className={styles.filters}>
          {/* Filter for reports with attached images */}
          <div className={styles.filterItem}>
            <input
              type="checkbox"
              checked={filterImages}
              onChange={() => setFilterImages(!filterImages)}
              id="filterImages"
            />
            <label htmlFor="filterImages">Filter reports with attached images</label>
          </div>

          {/* Filter by mode of contact */}
          <div className={styles.filterItem}>
            <label htmlFor="modeOfContact">Mode of Contact:</label>
            <select
              id="modeOfContact"
              value={filterContactMode}
              onChange={(e) => setFilterContactMode(e.target.value)}
            >
              <option value="">All</option>
              <option value="facebook">Facebook</option>
              <option value="telegram">Telegram</option>
              <option value="whatsapp">WhatsApp</option>
              {/* Add other modes of contact here as needed */}
            </select>
          </div>
        </div>
      )}

      {currentPage === "table" && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date Created</th> {/* New column for created_at */}
              <th>Creditor Account</th>
              <th>Mode of Contact</th>
              <th>Description</th>
              <th>Attached Images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={index}>
                <td>{report.transaction_id}</td>
                <td>{report.created_at ? formatDate(report.created_at) : 'N/A'}</td> {/* Format and show created_at */}
                <td>{report.creditor_account_number}</td>
                <td>{report.mode_of_contact}</td>
                <td>{report.description}</td>
                <td>
                  {hasAttachedImages(report) ? "Yes" : "No"} {/* Show if images are attached */}
                </td>
                <td>
                  <button onClick={() => handleReportClick(report)}>[View]</button>
                  <button onClick={() => handleResolveClick(report)}>[Resolve]</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {currentPage === "view" && (
        <ViewReport report={selectedReport} onBack={handleBackToTable} />
      )}

      {currentPage === "resolve" && (
        <ResolveReport report={selectedReport} onBack={handleBackToTable} />
      )}
    </div>
  );
};

export default Reports;
