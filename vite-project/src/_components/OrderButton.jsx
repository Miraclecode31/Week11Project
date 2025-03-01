import React from "react";

const OrderButton = ({ movieTitle, onOrder }) => {
  return (
    <button
      onClick={() => onOrder(movieTitle)}
      style={{
        backgroundColor: "#28a745",
        color: "#fff",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
        fontSize: "16px",
      }}
    >
      Order Now
    </button>
  );
};

export default OrderButton;
