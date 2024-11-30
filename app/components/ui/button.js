// button.js or button.jsx
import React from 'react';

const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export { Button }; // Named export

// Or using default export
export default Button;
