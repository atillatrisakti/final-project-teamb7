import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/Payment.css";
import { Link } from "react-router-dom";
import noresult from "../assets/noresult/Group 33.svg";

function NoHistory() {
  return (
    <Container>
      <div className="d-flex justify-content-start justify-content-center align-items-center">
        <Row>
          <Col md={12} className="payment-success">
            <img
              src={noresult}
              alt="img"
              fluid
              width="204"
              height="204"
              style={{ marginTop: "100px" }}
            />
            <div className="payment-success">
              <p style={{ margin: 0, color: "#1B3260" }}>
                Oops Riwayat Pesanan Kosong!!
              </p>
              <p>Anda belum melakukan pemesanan penerbangan</p>
            </div>
          </Col>
          <Col className="payment-success">
            <Link to={`/`} style={{ textDecoration: "none" }}>
              <button
                className="button-booking"
                size="lg"
                style={{
                  backgroundColor: "#1B3260",
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  marginTop: "30px",
                  border: "none",
                }}
              >
                Cari Penerbangan
              </button>
            </Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default NoHistory;
