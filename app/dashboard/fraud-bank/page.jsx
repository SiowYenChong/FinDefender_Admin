// Add this at the top of your file to mark it as a Client Component
"use client";

import BubbleMap from "@/ui/dashboard/bubbleMap/bubbleMap";
import { useEffect, useState } from "react";

const FraudPage = () => {
  return (
    <div>
      <h1>Fraud Bank - Fraud Detection</h1>
      <BubbleMap /> {/* Render the BubbleMap component */}
    </div>
  );
};

export default FraudPage;
