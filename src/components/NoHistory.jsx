import React from "react";
import { Col, Row } from "react-bootstrap";
import "../styles/Payment.css";
import img from "../assets/booking/img.svg";

function NoHistory() {
  return (
    <div className="d-flex justify-content-start align-items-center">
      <Row>
        <Col md={12} className="payment-success">
          <img
            src={img}
            alt="img"
            fluid
            width="204"
            height="204"
            style={{ marginTop: "100px" }}
          />
          <div className="payment-success">
            <p style={{ margin: 0, color: "#7126b5" }}>
              Oops Riwayat Pesanan Kosong!!
            </p>
            <p>Anda belum melakukan pemesanan penerbangan</p>
          </div>
        </Col>
        <Col className="payment-success">
          <button
            className="button"
            size="lg"
            style={{
              backgroundColor: "#7126b5",
              color: "#FFFFFF",
              borderRadius: "10px",
              marginTop: "30px",
              border: "none",
            }}
            // onClick={handlePaymentClick}
          >
            Cari Penerbangan
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default NoHistory;
