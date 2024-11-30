// app/ui/dashboard/components/card.js
import React from "react";

// Card container component
export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// CardHeader component (for the header section)
export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 border-b bg-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
};

// CardTitle component (for the title in the header)
export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={`text-xl font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
};

// CardContent component (for the main content inside the card)
export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// CardFooter component (for the footer section)
export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 border-t bg-gray-50 ${className}`} {...props}>
      {children}
    </div>
  );
};
