import React, { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import "../styles/Payment.css";
import info from "../assets/booking/info.png";
import img from "../assets/booking/img.svg";
import mastercard from "../assets/booking/mastercard.svg";
import visa from "../assets/booking/visa.svg";
import amex from "../assets/booking/amex.svg";
import paypal from "../assets/booking/paypal.svg";
import gopay from "../assets/booking/Gopay.svg";
import { toast } from "react-toastify";
import ItemBooking from "../components/ItemBooking";

function Payment() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentClick = () => {
    setPaymentSuccess(true);
    toast.success("Terimakasih atas pembayaran transaksi", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const [selectedAccounts, setSelectedAccounts] = useState([]);

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
      ? "2px solid rgba(113, 38, 181, 0.75)"
      : "2px solid #ccc";
  };

  if (paymentSuccess) {
    return (
      <Container className="payment">
        <Row style={{ marginBottom: "30px" }}>
          <Col md={12}>
            <ItemBooking />
          </Col>
        </Row>
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
              <p style={{ margin: 0, color: "#7126b5" }}>Selamat!!</p>
              <p>Transaksi Pembayaran Tiket Sukses</p>
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
              Terbitkan Tiket
            </button>
            <Col>
              <button
                className="button"
                size="lg"
                style={{
                  backgroundColor: "#D0B7E6",
                  color: "#FFFFFF",
                  borderRadius: "10px",
                  marginTop: "10px",
                  border: "none",
                }}
                // onClick={handlePaymentClick}
              >
                Cari Penerbangan Lain
              </button>
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container className="payment">
      <Row>
        <Row style={{ marginBottom: "30px" }}>
          <Col md={12}>
            <ItemBooking />
          </Col>
        </Row>
        <Col md={6}>
          <Card style={{ border: "none", boxShadow: "none" }}>
            <Card.Title>Isi Data Pembayaran</Card.Title>
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
            className="button"
            size="lg"
            style={{
              backgroundColor: "#7126b5",
              borderRadius: "10px",
              // marginLeft: "60px",
              color: "#FFFFFF",
              border: "none",
              width: "600px",
            }}
            onClick={handlePaymentClick}
            disabled={paymentSuccess}
          >
            Payment
          </button>
        </Col>
        <Col md={6}>
          <Card
            className="detail"
            style={{ border: "none", boxShadow: "none" }}
          >
            <Row>
              <Col md={6}>
                <Card.Title
                  style={{
                    border: "none",
                    boxShadow: "none",
                    fontWeight: "bold",
                  }}
                >
                  Booking Code:
                </Card.Title>
              </Col>
              <Col>
                <div style={{ fontWeight: "bold", color: "#7126b5" }}>
                  6799ggYKb
                </div>
              </Col>
            </Row>
            <Card.Body>
              <Row>
                <Col
                  md={6}
                  style={{
                    color: "#151515",
                    fontFamily: "Poppins",
                    fontSize: "16px",
                  }}
                >
                  <div>07.00</div>
                  <div>3 Maret 2023</div>
                </Col>
                <Col md={6}>
                  <div
                    style={{
                      color: "#A06ECE",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      textAlign: "right",
                    }}
                  >
                    Keberangkatan
                  </div>
                </Col>
              </Row>
              <div
                style={{
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid #D0D0D0",
                }}
              >
                Soekarno Hatta - Terminal 1A Domestik
              </div>
              <Container>
                <div
                  className="info"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #D0D0D0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginRight: "8px" }}>
                      <img src={info} alt="info" fluid width="24" height="24" />
                    </div>
                    <div>
                      <h5 style={{ margin: 0 }}>Jet Air - Economy</h5>
                      <div style={{ marginBottom: "10px" }}>
                        <p style={{ margin: 0, fontSize: "14px" }}>JT - 203</p>
                      </div>
                      <p style={{ margin: 0 }}>Informasi:</p>
                      <p style={{ margin: 0, fontWeight: "normal" }}>
                        Baggage 20 kg
                      </p>
                      <p style={{ margin: 0, fontWeight: "normal" }}>
                        Cabin Baggage 7 kg
                      </p>
                      <p style={{ margin: 0, fontWeight: "normal" }}>
                        In Flight Entertainment
                      </p>
                    </div>
                  </div>
                </div>
              </Container>
              <Row>
                <Col
                  md={6}
                  style={{
                    color: "#151515",
                    fontFamily: "Poppins",
                    fontSize: "16px",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>07.00</div>
                  <div>3 Maret 2023</div>
                </Col>
                <Col md={6}>
                  <div
                    style={{
                      color: "#A06ECE",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      textAlign: "right",
                    }}
                  >
                    Keberangkatan
                  </div>
                </Col>
              </Row>
              <div
                style={{
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid #D0D0D0",
                }}
              >
                Soekarno Hatta - Terminal 1A Domestik
              </div>
              <Container
                style={{
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid #D0D0D0",
                  marginRight: "8px",
                }}
              >
                <div style={{ fontWeight: "bold" }}>Rincian Harga</div>
                <Row>
                  <Col md={6}>
                    <div>2 Adult</div>
                    <div>1 Baby</div>
                    <div>Tax</div>
                  </Col>
                  <Col>
                    <div>IDR 9.550.000</div>
                    <div>IDR 0</div>
                    <div>IDR 300.000</div>
                  </Col>
                </Row>
              </Container>
              <Row>
                <Col md={6} style={{ fontWeight: "bold" }}>
                  Total
                </Col>
                <Col md={6} style={{ fontWeight: "bold", color: "#7126b5" }}>
                  IDR 9.850.000
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Payment;
