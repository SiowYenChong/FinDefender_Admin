"use client";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import supabase from "@/lib/supabaseClient"; // Replace with your Supabase client path

const ChartComponent = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data for category-based fraud likelihood
      const { data: categoryReports, error: categoryError } = await supabase
        .from("fraud_detection_report")
        .select("category, fraud_likelihood");

      if (categoryError) {
        console.error("Error fetching category fraud reports:", categoryError);
      } else {
        const groupedCategoryData = categoryReports.reduce((acc, report) => {
          const { category, fraud_likelihood } = report;
          if (!acc[category]) {
            acc[category] = { count: 0, totalFraud: 0 };
          }
          acc[category].count += 1;
          acc[category].totalFraud += fraud_likelihood;
          return acc;
        }, {});

        const chartCategoryData = Object.entries(groupedCategoryData).map(([category, { totalFraud, count }]) => ({
          name: category,
          y: totalFraud / count,
        }));

        setCategoryData(chartCategoryData);
      }

      // Fetch data for mode_of_contact-based fraud likelihood
      const { data: contactReports, error: contactError } = await supabase
        .from("submitted_report")
        .select("mode_of_contact, id");

      if (contactError) {
        console.error("Error fetching contact fraud reports:", contactError);
      } else {
        const { data: fraudDetectionReports, error: fraudDetectionError } = await supabase
          .from("fraud_detection_report")
          .select("fraud_likelihood, submitted_report_id");

        if (fraudDetectionError) {
          console.error("Error fetching fraud detection reports:", fraudDetectionError);
        } else {
          const contactChartData = contactReports.map((report) => {
            const fraudReports = fraudDetectionReports.filter(
              (fraudReport) => fraudReport.submitted_report_id === report.id
            );

            const avgFraudLikelihood =
              fraudReports.reduce((sum, fraudReport) => sum + fraudReport.fraud_likelihood, 0) /
              fraudReports.length;

            return {
              name: report.mode_of_contact,
              y: avgFraudLikelihood || 0,
            };
          });

          // Grouping modes of contact
          const groupedContactData = contactChartData.reduce((acc, item) => {
            const key = ["whatsapp", "facebook", "telegram"].includes(item.name.toLowerCase())
              ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
              : "Others";

            if (!acc[key]) {
              acc[key] = { totalFraud: 0, count: 0 };
            }
            acc[key].totalFraud += item.y;
            acc[key].count += 1;

            return acc;
          }, {});

          const finalContactData = Object.entries(groupedContactData).map(([name, { totalFraud, count }]) => ({
            name,
            y: totalFraud / count,
          }));

          setContactData(finalContactData);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return <p>Loading Chart...</p>;
  }

  // Chart options for category-based fraud likelihood (Column Chart)
  const categoryOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Average Fraud Likelihood by Category",
    },
    xAxis: {
      categories: categoryData.map((item) => item.name),
      title: {
        text: "Fraud Categories",
      },
    },
    yAxis: {
      title: {
        text: "Average Fraud Likelihood",
      },
      min: 0,
    },
    tooltip: {
      pointFormat: "<b>{point.y}%</b> average fraud likelihood",
    },
    series: [
      {
        name: "Fraud Likelihood",
        data: categoryData.map((item) => item.y),
        color: "#FF5733",
      },
    ],
  };

  // Chart options for mode_of_contact-based fraud likelihood (Column Chart)
  const contactOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Average Fraud Likelihood by Mode of Contact",
    },
    xAxis: {
      categories: ["WhatsApp", "Facebook", "Telegram", "Others"],
      title: {
        text: "Mode of Contact",
      },
    },
    yAxis: {
      title: {
        text: "Average Fraud Likelihood",
      },
      min: 0,
    },
    tooltip: {
      pointFormat: "<b>{point.y}%</b> average fraud likelihood",
    },
    series: [
      {
        name: "Fraud Likelihood",
        data: contactData.map((item) => item.y),
        color: "#33FF57",
      },
    ],
  };

  return (
    <div>
      <figure className="figure w-100">
        <HighchartsReact highcharts={Highcharts} options={categoryOptions} />
        <HighchartsReact highcharts={Highcharts} options={contactOptions} />
      </figure>
      <style jsx>{`
        figure {
          margin-top: 3em;
          margin-bottom: 3em;
        }
      `}</style>
    </div>
  );
};

export default ChartComponent;
