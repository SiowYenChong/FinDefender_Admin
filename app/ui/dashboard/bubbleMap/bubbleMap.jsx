"use client";
import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/highcharts-more"; // Required for bubble charts
import supabase from "@/lib/supabaseClient"; // Replace with your Supabase client path

const BubbleMap = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: reports, error } = await supabase
        .from("submitted_report")
        .select("creditor_account_number, debitor_account_number, mode_of_contact");

      if (error) {
        console.error("Error fetching reports:", error);
      } else {
        // Group by creditor-debitor-mode_of_contact and count occurrences
        const groupedData = reports.reduce((acc, report) => {
          const key = `${report.creditor_account_number}-${report.debitor_account_number}-${report.mode_of_contact}`;
          acc[key] = acc[key] ? acc[key] + 1 : 1;
          return acc;
        }, {});

        // Transform grouped data into bubble chart format
        const bubbleData = Object.entries(groupedData).map(([key, count]) => {
          const [creditor, debitor, mode] = key.split("-");
          return {
            x: parseInt(creditor.slice(-4), 10), // Use last digits of creditor as x-axis
            y: parseInt(debitor.slice(-4), 10), // Use last digits of debitor as y-axis
            z: count, // Count of reports as bubble size
            name: `Creditor: ${creditor}, Debitor: ${debitor}, Mode: ${mode}`,
            mode, // Additional mode info
          };
        });

        setData(bubbleData);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading Bubble Map...</p>;
  }

  const options = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zooming: {
        type: "xy",
      },
    },
    title: {
      text: "Fraud Cases by Creditor-Debitor Activity and Mode of Contact",
    },
    xAxis: {
      gridLineWidth: 1,
      title: {
        text: "Creditor Account (Last 4 Digits)",
      },
    },
    yAxis: {
      gridLineWidth: 1,
      title: {
        text: "Debitor Account (Last 4 Digits)",
      },
    },
    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        "<tr><th colspan='2'><h3>{point.name}</h3></th></tr>" +
        "<tr><th>Reports:</th><td>{point.z}</td></tr>" +
        "<tr><th>Mode:</th><td>{point.mode}</td></tr>",
      footerFormat: "</table>",
    },
    series: [
      {
        data,
        colorByPoint: true,
      },
    ],
  };

  return (
    <figure className="figure w-100">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <style jsx>{`
        figure {
          margin-top: 3em;
          margin-bottom: 3em;
        }
      `}</style>
    </figure>
  );
};

export default BubbleMap;
