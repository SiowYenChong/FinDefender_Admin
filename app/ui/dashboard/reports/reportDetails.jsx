"use client"; // Mark this component as client-side

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react"; // You can use this icon if needed
import styles from "./reportdetails.module.css"; // Import the CSS file
import { supabase } from "@/lib/supabaseClient"; // Import supabase client

const ReportDetails = ({ report, onBack }) => {
  const [updatedReport, setUpdatedReport] = useState(report);

  // Fetch report data from Supabase
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const { data, error } = await supabase
          .from("submitted_report")
          .select("*")
          .eq("id", report.id) // Fetch a report by ID
          .single(); // Ensure we get only one report

        if (error) {
          console.error("Error fetching report:", error);
        } else {
          setUpdatedReport(data); // Set the fetched data to state
        }
      } catch (err) {
        console.error("Unexpected error fetching report:", err);
      }
    };

    if (report?.id) {
      fetchReportData();
    }
  }, [report?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReport({ ...updatedReport, [name]: value });
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">Report Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground">Creditor Account Number</h3>
            <p className="text-lg">{updatedReport?.creditor_account_number}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground">Debtor Account Number</h3>
            <p className="text-lg">{updatedReport?.debitor_account_number}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground">Creditor Email</h3>
            <input
              type="email"
              name="creditor_email"
              value={updatedReport?.creditor_email}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground">Creditor Phone Number</h3>
            <input
              type="tel"
              name="creditor_phone_number"
              value={updatedReport?.creditor_phone_number}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground">Mode of Contact</h3>
            <select
              name="mode_of_contact"
              value={updatedReport?.mode_of_contact}
              onChange={handleInputChange}
              className="input"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="in-person">In-Person</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <h3 className="font-semibold text-sm text-muted-foreground">Description</h3>
            <textarea
              name="description"
              value={updatedReport?.description}
              onChange={handleInputChange}
              className="input"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground">Images</h3>
            {updatedReport?.image_1 || updatedReport?.image_2 || updatedReport?.image_3 ? (
              <div>
                {updatedReport?.image_1 && (
                  <a
                    href={updatedReport.image_1}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    View Image 1
                  </a>
                )}
                {updatedReport?.image_2 && (
                  <a
                    href={updatedReport.image_2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    View Image 2
                  </a>
                )}
                {updatedReport?.image_3 && (
                  <a
                    href={updatedReport.image_3}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    View Image 3
                  </a>
                )}
              </div>
            ) : (
              "No images uploaded"
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button variant="destructive" className="w-full sm:w-auto" onClick={onBack}>
            <AlertCircle className="mr-2 h-4 w-4" />
            Back to Reports
          </Button>
          <Button variant="primary" className="w-full sm:w-auto">
            Submit Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReportDetails;
