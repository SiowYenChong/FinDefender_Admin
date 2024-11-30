// app/ui/dashboard/components/badge.js
import React from "react";

// Badge component for displaying labels or statuses
export const Badge = ({ children, color = "gray", className, ...props }) => {
  const badgeColors = {
    gray: "bg-gray-200 text-gray-800",
    green: "bg-green-200 text-green-800",
    red: "bg-red-200 text-red-800",
    blue: "bg-blue-200 text-blue-800",
    yellow: "bg-yellow-200 text-yellow-800",
    orange: "bg-orange-200 text-orange-800",
    purple: "bg-purple-200 text-purple-800",
  };

  // Choose the color class based on the passed color prop
  const badgeClass = badgeColors[color] || badgeColors.gray;

  return (
    <span
      className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${badgeClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
