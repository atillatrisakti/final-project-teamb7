import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

function ItemBooking() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <div className="d-flex justify-content-start align-items-center">
      <div>
        <NavLink
          style={{
            color: "#000000",
            textDecoration: "none",
            fontWeight:
              window.location.pathname === "/booking/:id" || setFormSubmitted
                ? "bold"
                : "normal",
          }}
          activeStyle={{
            color: "#000000",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Isi Data Diri
        </NavLink>
        <FaAngleRight />
        <NavLink
          style={{
            color: "#000000",
            textDecoration: "none",
            fontWeight:
              (setFormSubmitted && window.location.pathname !== "/payment/:id") ||
              (!setFormSubmitted && window.location.pathname === "/")
                ? "normal"
                : "bold",
          }}
          activeStyle={{
            color: "#000000",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Bayar
        </NavLink>
      </div>
      <div>
        <FaAngleRight />
        <NavLink
          style={{
            color: "#000000",
            textDecoration: "none",
            fontWeight:
              setFormSubmitted &&
              setPaymentSuccess &&
              window.location.pathname === "/"
                ? "bold"
                : "normal",
          }}
          activeStyle={{
            color: "#000000",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Selesai
        </NavLink>
      </div>
    </div>
  );
}

export default ItemBooking;
