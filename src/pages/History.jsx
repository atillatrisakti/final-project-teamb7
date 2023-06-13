import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import info from "../assets/booking/info.png";
import loc from "../assets/booking/loc.svg";
import thin from "../assets/booking/thin.svg";
import right from "../assets/booking/right.svg";
import "../styles/History.css";
import NoHistory from "../components/NoHistory";

function History() {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [activeMonth, setActiveMonth] = useState(null);
  const [isCardActive, setIsCardActive] = useState(false);
  const [orderStatus, setOrderStatus] = useState("issued");
  const hasOrderHistory = true;

  const handleCardClick = (index) => {
    setShowOrderDetails(true);
    setIsCardActive(true);
    setActiveMonth(index);
  };
  const handlePrintTicket = () => {
    console.log("Printing ticket");
  };

  const renderActionButton = () => {
    if (orderStatus === "issued") {
      return (
        <button className="btn-tiket" onClick={handlePrintTicket}>
          Cetak Tiket
        </button>
      );
    } else if (orderStatus === "unpaid") {
      return <button className="btn-tiket">Lanjut Bayar</button>;
    }
    return null;
  };
  return (
    <Container className="history">
      {hasOrderHistory ? (
        <Row>
          <Col md={6}>
            <Card
              className="history-booking"
              style={{ border: "none", boxShadow: "none" }}
            >
              <Card.Body>
                <Card
                  className="by-month"
                  style={{ border: "none", boxShadow: "none" }}
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Maret 2023
                    </Card.Title>
                    <Card
                      className={`history-month ${
                        activeMonth === 0 && isCardActive ? "active" : ""
                      }`}
                      onClick={() => handleCardClick(0)}
                    >
                      <button
                        className="btn-status"
                        style={{
                          backgroundColor: "#73CA5C",
                          color: "#FFFFFF",
                          borderRadius: "20px",
                          border: "none",
                        }}
                      >
                        Issued
                      </button>
                      <Container
                        style={{
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          borderBottom: "1px solid #D0D0D0",
                          marginRight: "8px",
                        }}
                      >
                        <Row>
                          <Col md={4}>
                            <div style={{ display: "flex", alignItems: "top" }}>
                              <div style={{ marginRight: "8px" }}>
                                <img
                                  src={loc}
                                  alt="loc"
                                  fluid
                                  width="24"
                                  height="24"
                                />
                              </div>
                              <div>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                  }}
                                >
                                  Jakarta
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "normal",
                                    fontSize: "14px",
                                  }}
                                >
                                  1 Maret 2023
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "normal",
                                    fontSize: "14px",
                                  }}
                                >
                                  07.00
                                </p>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div>
                                <img
                                  src={thin}
                                  alt="thin"
                                  fluid
                                  width="105"
                                  height="24"
                                />
                                <img
                                  src={right}
                                  alt="right"
                                  fluid
                                  width="5"
                                  height="10"
                                />
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div style={{ display: "flex", alignItems: "top" }}>
                              <div style={{ marginRight: "8px" }}>
                                <img
                                  src={loc}
                                  alt="loc"
                                  fluid
                                  width="24"
                                  height="24"
                                />
                              </div>
                              <div>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                  }}
                                >
                                  Jakarta
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "normal",
                                    fontSize: "14px",
                                  }}
                                >
                                  1 Maret 2023
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "normal",
                                    fontSize: "14px",
                                  }}
                                >
                                  07.00
                                </p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                      <Container>
                        <Row>
                          <Col md={4} style={{ fontWeight: "bold" }}>
                            <div>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                }}
                              >
                                Booking Code:
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "normal",
                                  fontSize: "14px",
                                }}
                              >
                                shar785TD
                              </p>
                            </div>
                          </Col>
                          <Col>
                            <div>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                }}
                              >
                                Class:
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "normal",
                                  fontSize: "14px",
                                }}
                              >
                                Business
                              </p>
                            </div>
                          </Col>
                          <Col style={{ fontWeight: "bold", color: "#7126b5" }}>
                            IDR 9.850.000
                          </Col>
                        </Row>
                      </Container>
                    </Card>
                    <Card
                      className={`history-month ${
                        activeMonth === 1 && isCardActive ? "active" : ""
                      }`}
                      onClick={() => handleCardClick(1)}
                      style={{ marginTop: "10px" }}
                    >
                      <button
                        className="btn-status"
                        style={{
                          backgroundColor: "#FF0000",
                          color: "#FFFFFF",
                          borderRadius: "20px",
                          border: "none",
                        }}
                      >
                        Unpaid
                      </button>
                      <Container
                        style={{
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          borderBottom: "1px solid #D0D0D0",
                          marginRight: "8px",
                        }}
                      >
                        <Row>
                          <Col md={4}>
                            <div style={{ display: "flex", alignItems: "top" }}>
                              <div style={{ marginRight: "8px" }}>
                                <img
                                  src={loc}
                                  alt="loc"
                                  fluid
                                  width="24"
                                  height="24"
                                />
                              </div>
                              <div>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                  }}
                                >
                                  Jakarta
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "normal",
                                    fontSize: "14px",
                                  }}
                                >
                                  1 Maret 2023
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "normal",
                                    fontSize: "14px",
                                  }}
                                >
                                  07.00
                                </p>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <div>
                                <img
                                  src={thin}
                                  alt="thin"
                                  fluid
                                  width="105"
                                  height="24"
                                />
                                <img
                                  src={right}
                                  alt="right"
                                  fluid
                                  width="5"
                                  height="10"
                                />
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div style={{ display: "flex", alignItems: "top" }}>
                              <div style={{ marginRight: "8px" }}>
                                <img
                                  src={loc}
                                  alt="loc"
                                  fluid
                                  width="24"
                                  height="24"
                                />
                              </div>
                              <div>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                  }}
                                >
                                  Jakarta
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "normal",
                                    fontSize: "14px",
                                  }}
                                >
                                  1 Maret 2023
                                </p>
                                <p
                                  style={{
                                    margin: 0,
                                    fontWeight: "normal",
                                    fontSize: "14px",
                                  }}
                                >
                                  07.00
                                </p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                      <Container>
                        <Row>
                          <Col md={4} style={{ fontWeight: "bold" }}>
                            <div>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                }}
                              >
                                Booking Code:
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "normal",
                                  fontSize: "14px",
                                }}
                              >
                                shar785TD
                              </p>
                            </div>
                          </Col>
                          <Col>
                            <div>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                }}
                              >
                                Class:
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "normal",
                                  fontSize: "14px",
                                }}
                              >
                                Business
                              </p>
                            </div>
                          </Col>
                          <Col style={{ fontWeight: "bold", color: "#7126b5" }}>
                            IDR 9.850.000
                          </Col>
                        </Row>
                      </Container>
                    </Card>
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            {showOrderDetails && (
              <Card
                className="detail"
                style={{ border: "none", boxShadow: "none" }}
              >
                <Card.Body>
                  <Card.Title
                    style={{
                      border: "none",
                      boxShadow: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Detail Pesanan
                    <button
                      className="btn-status"
                      style={{
                        backgroundColor: "#73CA5C",
                        color: "#FFFFFF",
                        borderRadius: "20px",
                        border: "none",
                        fontSize: "16px",
                      }}
                    >
                      {orderStatus.charAt(0).toUpperCase() +
                        orderStatus.slice(1)}
                    </button>
                  </Card.Title>
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
                  {/* <Card.Body> */}
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
                          <img
                            src={info}
                            alt="info"
                            fluid
                            width="24"
                            height="24"
                          />
                        </div>
                        <div>
                          <h5 style={{ margin: 0 }}>Jet Air - Economy</h5>
                          <div style={{ marginBottom: "10px" }}>
                            <p style={{ margin: 0, fontSize: "14px" }}>
                              JT - 203
                            </p>
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
                    <Col
                      md={6}
                      style={{ fontWeight: "bold", color: "#7126b5" }}
                    >
                      IDR 9.850.000
                    </Col>
                  </Row>
                  {renderActionButton()}
                  {/* </Card.Body> */}
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      ) : (
        <Container className="history">
          <NoHistory />
        </Container>
      )}
    </Container>
  );
}

export default History;
