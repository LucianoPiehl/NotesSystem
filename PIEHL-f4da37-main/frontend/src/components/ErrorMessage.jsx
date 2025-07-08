// src/components/ErrorMessage.jsx
import React from "react";

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;
  return (
   <div style={{
     backgroundColor: "#f8d7da",
     color: "#721c24",
     border: "1px solid #f5c6cb",
     padding: "10px 40px 10px 10px",
     borderRadius: "5px",
     position: "fixed",
     bottom: "20px",
     left: "50%",
     transform: "translateX(-50%)",
     maxWidth: "90vw",
     boxSizing: "border-box",
     wordWrap: "break-word",
     zIndex: 9999
   }}>

      {message}
      <button
        onClick={onClose}
        style={{

          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          color: "#721c24"
        }}

        aria-label="Close error message"
      >
        &times;
      </button>
    </div>
  );
};

export default ErrorMessage;
