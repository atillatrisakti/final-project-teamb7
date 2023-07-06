import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import "../styles/Payment.css";
import noresult from "../assets/noresult/Group 33.svg";
import mastercard from "../assets/booking/mastercard.svg";
import visa from "../assets/booking/visa.svg";
import amex from "../assets/booking/amex.svg";
import paypal from "../assets/booking/paypal.svg";
import gopay from "../assets/booking/Gopay.svg";
import { toast } from "react-toastify";
import ItemBooking from "../components/booking-payment-history/ItemBooking";
import DetailPayment from "../components/booking-payment-history/DetailPayment";
import axios from "axios";
import { Link } from "react-router-dom";
import arrow from "../assets/account/fi_arrow-left.svg";

function Payment() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  //handle payment
  const handlePaymentClick = () => {
    setPaymentSuccess(true);
    toast.success("Terimakasih atas pembayaran transaksi", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  //handle checkbox
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedAccounts([value]);
    } else {
      setSelectedAccounts([]);
    }
  };

  const getCardBorderStyle = (account) => {
    return selectedAccounts.includes(account)
      ? "2px solid rgba(27, 50, 90)"
      : "2px solid #ccc";
  };

  if (paymentSuccess) {
    return (
      <Container>
        <div>
          {/* <Row style={{ marginBottom: "30px" }}>
          <Col md={12}>
            <ItemBooking />
          </Col>
        </Row> */}
          <div className="header">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <div
                className="list mx-4 mt-3"
                style={{ backgroundColor: "#1b3260" }}
              >
                <img src={arrow} alt="left-arrow" />
                Beranda
              </div>
            </Link>
          </div>
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
                <p style={{ margin: 0, color: "#1B3260" }}>Selamat!!</p>
                <p>Transaksi Pembayaran Tiket Sukses</p>
              </div>
            </Col>
            <Col className="payment-success">
              <button
                className="button-booking"
                size="lg"
                style={{
                  backgroundColor: "#1B3260",
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  marginTop: "30px",
                  border: "none",
                  width: "400px",
                }}
              >
                Terbitkan Tiket
              </button>
              <Col>
                <Link to={`/`} style={{ textDecoration: "none" }}>
                  <button
                    className="button-booking"
                    size="lg"
                    style={{
                      backgroundColor: "#5173b8",
                      color: "#FFFFFF",
                      borderRadius: "10px",
                      marginTop: "10px",
                      border: "none",
                      width: "400px",
                    }}
                  >
                    Cari Penerbangan Lain
                  </button>
                </Link>
              </Col>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
  return (
    <Container className="payment">
      <Row>
        {/* <Row style={{ marginBottom: "30px" }}>
          <Col md={12}>
            <ItemBooking />
          </Col>
        </Row> */}
        <Col md={6}>
          <Card
            style={{ border: "none", boxShadow: "none", marginTop: "30px" }}
          >
            <Card.Title style={{ fontWeight: "bold" }}>
              Isi Data Pembayaran
            </Card.Title>
            <div className="method">
              <section>
                <details style={{ marginBottom: "20px" }}>
                  <summary>Gopay</summary>
                  <div
                    style={{
                      marginTop: "20px",
                      marginBottom: "10px",
                      padding: "10px",
                      border: getCardBorderStyle("Gopay"),
                    }}
                  >
                    <label>
                      <input
                        type="checkbox"
                        value="Gopay"
                        checked={selectedAccounts.includes("Gopay")}
                        onChange={handleCheckboxChange}
                      />
                      <img
                        src={gopay}
                        alt="img"
                        fluid
                        width="100"
                        height="60"
                      />
                    </label>
                  </div>
                </details>
                <details style={{ marginBottom: "20px" }}>
                  <summary>Virtual Account</summary>
                  <div
                    style={{
                      marginTop: "20px",
                      marginBottom: "10px",
                      padding: "10px",
                      border: getCardBorderStyle("BRI Virtual Account"),
                    }}
                  >
                    <label>
                      <input
                        type="checkbox"
                        value="BRI Virtual Account"
                        checked={selectedAccounts.includes(
                          "BRI Virtual Account"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      BRI Virtual Account
                    </label>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: getCardBorderStyle("BCA Virtual Account"),
                    }}
                  >
                    <label>
                      <input
                        type="checkbox"
                        value="BCA Virtual Account"
                        checked={selectedAccounts.includes(
                          "BCA Virtual Account"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      BCA Virtual Account
                    </label>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: getCardBorderStyle("Mandiri Virtual Account"),
                    }}
                  >
                    <label>
                      <input
                        type="checkbox"
                        value="Mandiri Virtual Account"
                        checked={selectedAccounts.includes(
                          "Mandiri Virtual Account"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      Mandiri Virtual Account
                    </label>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: getCardBorderStyle("BNI Virtual Account"),
                    }}
                  >
                    <label>
                      <input
                        type="checkbox"
                        value="BNI Virtual Account"
                        checked={selectedAccounts.includes(
                          "BNI Virtual Account"
                        )}
                        onChange={handleCheckboxChange}
                      />
                      BNI Virtual Account
                    </label>
                  </div>
                  <div
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      border: getCardBorderStyle("Bank Lainnya"),
                    }}
                  >
                    <label>
                      <input
                        type="checkbox"
                        value="Bank Lainnya"
                        checked={selectedAccounts.includes("Bank Lainnya")}
                        onChange={handleCheckboxChange}
                      />
                      Bank Lainnya
                    </label>
                  </div>
                </details>
                <details style={{ marginBottom: "20px" }}>
                  <summary>Credit Card</summary>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      src={mastercard}
                      alt="img"
                      fluid
                      width="50"
                      height="50"
                      style={{ margin: "0 5px" }}
                    />
                    <img
                      src={visa}
                      alt="img"
                      fluid
                      width="50"
                      height="50"
                      style={{ margin: "0 5px" }}
                    />
                    <img
                      src={amex}
                      alt="img"
                      fluid
                      width="50"
                      height="50"
                      style={{ margin: "0 5px" }}
                    />
                    <img
                      src={paypal}
                      alt="img"
                      fluid
                      width="50"
                      height="50"
                      style={{ margin: "0 5px" }}
                    />
                  </div>
                  <Form
                    style={{
                      justifyContent: "center",
                      marginTop: "50px",
                      marginLeft: "120px",
                    }}
                  >
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="5631 80867 7544"
                        style={{
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          borderBottom: "1px solid #D0D0D0",
                          width: "400px",
                        }}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Card Holder Name</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="siti"
                        style={{
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          borderBottom: "1px solid #D0D0D0",
                          width: "400px",
                        }}
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="000"
                            style={{
                              borderTop: "none",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: "1px solid #D0D0D0",
                              width: "100px",
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="07/24"
                            style={{
                              borderTop: "none",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: "1px solid #D0D0D0",
                              width: "80px",
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </details>
              </section>
            </div>
          </Card>
          <button
            className="button-booking"
            size="lg"
            style={{
              backgroundColor: "#1B3260",
              borderRadius: "10px",
              color: "#FFFFFF",
              border: "none",
              width: "580px",
            }}
            onClick={handlePaymentClick}
            disabled={paymentSuccess}
          >
            Bayar
          </button>
        </Col>
        <Col md={6}>
          <DetailPayment />
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
