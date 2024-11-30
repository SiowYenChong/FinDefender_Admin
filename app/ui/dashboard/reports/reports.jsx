"use client"; // Mark this component as client-side

import { useState, useEffect } from "react";
import styles from "./reports.module.css"; // Import the CSS file
import ReportDetails from "./ReportDetails"; // Import the ReportDetails component
import supabase from "@/lib/supabaseClient"; // Import Supabase client

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null); // To track selected report

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
    setSelectedReport(report); // Set the clicked report to state
  };

  const handleBackToTable = () => {
    setSelectedReport(null); // Reset to show the table view again
  };

  return (
    <div className={styles.container}>
      {selectedReport ? (
        // Render ReportDetails when a report is selected
        <ReportDetails report={selectedReport} onBack={handleBackToTable} />
      ) : (
        // Render Table when no report is selected
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Creditor Account</th>
              <th>Debtor Account</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} onClick={() => handleReportClick(report)}>
                <td>{report.creditor_account_number}</td>
                <td>{report.debitor_account_number}</td>
                <td>{report.transaction_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reports;
