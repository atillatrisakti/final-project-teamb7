import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import loc from "../assets/booking/loc.svg";
import thinarrow from "../assets/search/Arrow.svg";
import "../styles/History.css";
import NoHistory from "../components/NoHistory";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../assets/account/fi_arrow-left.svg";
import axios from "axios";
import { toast } from "react-toastify";

function History() {
  const navigate = useNavigate();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [activeMonth, setActiveMonth] = useState(null);
  const [isCardActive, setIsCardActive] = useState(false);
  const hasOrderHistory = true;
  const [transaction, setTransaction] = useState([]);
  const [detailTransaction, setDetailTransaction] = useState([]);

  //get history transaction
  useEffect(() => {
    const getTransactionData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://flight-booking-api-development.up.railway.app/api/customer/transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const transaction = response.data.data;
        setTransaction(transaction);
        console.log(transaction);

        const detailPromises = transaction.map(async (flight) => {
          const detailResponse = await axios.get(
            `https://flight-booking-api-development.up.railway.app/api/customer/transactions/${flight.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const detailData = detailResponse.data.data;
          return detailData;
        });

        const detailResults = await Promise.all(detailPromises);
        setDetailTransaction(detailResults);
        // console.log(detailResults);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };

    getTransactionData();
  }, []);

  //count price
  const totalPrice =
    detailTransaction[0]?.flight.price +
    detailTransaction[0]?.flight.price * detailTransaction[0]?.flight.tax;

  const handleCardClick = (transactionId, index) => {
    const newIsCardActive = Array(transaction.length).fill(false);
    const newShowOrderDetails = Array(transaction.length).fill(false);

    newIsCardActive[index] = true;
    newShowOrderDetails[index] = !showOrderDetails[index];

    setIsCardActive(newIsCardActive);
    setShowOrderDetails(newShowOrderDetails);
    setActiveTransaction(transactionId);
    setActiveMonth(index);
  };

  const handleLanjutBayar = () => {
    const transactionId = detailTransaction[0]?.flight.id;
    if (transactionId) {
      navigate(`/payment/${transactionId}`);
    }
  };

  const renderActionButton = () => {
    if (transaction[0]?.status === "issued") {
      return (
        <button className="btn-tiket" style={{ backgroundColor: "#1B3260" }}>
          Cetak Tiket
        </button>
      );
    } else if (transaction[0]?.status === "unpaid") {
      return (
        <button
          className="btn-tiket"
          style={{ backgroundColor: "#FF0000" }}
          onClick={handleLanjutBayar}
        >
          Lanjut Bayar
        </button>
      );
    }
    return null;
  };

  return (
    <Container>
      <div className="header">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <div
            className="list mx-4 mt-3"
            style={{ backgroundColor: "#315bb0" }}
          >
            <img src={arrow} alt="left-arrow" />
            Beranda
          </div>
        </Link>
      </div>
      {hasOrderHistory ? (
        transaction.map((transaction, index) => (
          <Row key={transaction.id}>
            <Col md={6}>
              <Card
                className="history-booking"
                style={{
                  border: "none",
                  boxShadow: "none",
                  marginLeft: "20px",
                }}
              >
                <Card.Body>
                  {/* <Card
                    className="by-month"
                    style={{ border: "none", boxShadow: "none" }}
                  >
                    <Card.Body>
                      <Card.Title
                        style={{
                          fontWeight: "bold",
                        }}
                      ></Card.Title> */}
                  <Card
                    className={`history-month ${
                      isCardActive[index] && showOrderDetails[index]
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleCardClick(transaction.id, index)}
                  >
                    <button
                      className="btn-status"
                      style={{
                        backgroundColor:
                          transaction.status === "unpaid"
                            ? "#FF0000"
                            : transaction.status === "paid"
                            ? "#73CA5C"
                            : null,
                        color: "#FFFFFF",
                        borderRadius: "20px",
                        border: "none",
                      }}
                    >
                      {transaction.status}
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
                                {detailTransaction[0]?.flight.departure_city}
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "normal",
                                  fontSize: "14px",
                                }}
                              >
                                {new Date(
                                  detailTransaction[0]?.flight.departure_date
                                ).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "normal",
                                  fontSize: "14px",
                                }}
                              >
                                {new Date(
                                  detailTransaction[0]?.flight.departure_date
                                ).toLocaleTimeString("id", {
                                  timeZone:
                                    detailTransaction[0]?.flight
                                      .departure_city_time_zone,
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <span className="d-flex justify-content-center font-count-time">
                                {Math.floor(
                                  (new Date(
                                    detailTransaction[0]?.flight.arrival_date
                                  ).getTime() -
                                    new Date(
                                      detailTransaction[0]?.flight.departure_date
                                    ).getTime()) /
                                    (1000 * 60 * 60 * 24)
                                ) + "d "}
                                {Math.floor(
                                  ((new Date(
                                    detailTransaction[0]?.flight.arrival_date
                                  ).getTime() -
                                    new Date(
                                      detailTransaction[0]?.flight.departure_date
                                    ).getTime()) /
                                    (1000 * 60 * 60)) %
                                    24
                                ) + "h "}
                                {Math.floor(
                                  ((new Date(
                                    detailTransaction[0]?.flight.arrival_date
                                  ).getTime() -
                                    new Date(
                                      detailTransaction[0]?.flight.departure_date
                                    ).getTime()) /
                                    (1000 * 60)) %
                                    60
                                ) + "m"}
                              </span>
                              <img
                                src={thinarrow}
                                alt="arrow"
                                className="d-flex justify-content-center"
                                style={{ width: "120px", height: "auto" }}
                              />
                              <span className="d-flex justify-content-center font-count-time">
                                Direct
                              </span>
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
                                {detailTransaction[0]?.flight.arrival_city}
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "normal",
                                  fontSize: "14px",
                                }}
                              >
                                {new Date(
                                  detailTransaction[0]?.flight.arrival_date
                                ).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </p>
                              <p
                                style={{
                                  margin: 0,
                                  fontWeight: "normal",
                                  fontSize: "14px",
                                }}
                              >
                                {new Date(
                                  detailTransaction[0]?.flight.arrival_date
                                ).toLocaleTimeString("id", {
                                  timeZone:
                                    detailTransaction[0]?.flight
                                      .arrival_city_time_zone,
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
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
                              {detailTransaction[0]?.flight.airplane_class}
                            </p>
                          </div>
                        </Col>
                        <Col style={{ fontWeight: "bold", color: "#315bb0" }}>
                          IDR {totalPrice}
                        </Col>
                      </Row>
                    </Container>
                  </Card>
                  {/* </Card.Body>
                  </Card> */}
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              {showOrderDetails[index] && (
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
                          backgroundColor:
                            transaction.status === "unpaid"
                              ? "#FF0000"
                              : transaction.status === "paid"
                              ? "#73CA5C"
                              : null,
                          color: "#FFFFFF",
                          borderRadius: "20px",
                          border: "none",
                          fontSize: "16px",
                        }}
                      >
                        {transaction.status}
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
                        <div style={{ fontWeight: "bold", color: "#315bb0" }}>
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
                        }}
                      >
                        <div style={{ fontWeight: "bold" }}>
                          {new Date(
                            detailTransaction[0]?.flight.departure_date
                          ).toLocaleTimeString("id", {
                            timeZone:
                              detailTransaction[0]?.flight
                                .departure_city_time_zone,
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div>
                          {new Date(
                            detailTransaction[0]?.flight.departure_date
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div
                          style={{
                            color: "#315bb0",
                            textAlign: "right",
                            fontWeight: "bold",
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
                        fontWeight: "bold",
                      }}
                    >
                      {detailTransaction[0]?.flight.departure_airport}
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
                          <div
                            style={{ marginRight: "8px", marginBottom: "20px" }}
                          >
                            <img
                              src={detailTransaction[0]?.flight.airplane_logo}
                              alt="info"
                              fluid
                              width="24"
                              height="24"
                            />
                          </div>
                          <div>
                            <h5
                              style={{
                                margin: 0,
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {detailTransaction[0]?.flight.airplane_name} -
                              {detailTransaction[0]?.flight.airplane_class}
                            </h5>
                            <div style={{ marginBottom: "10px" }}>
                              <p style={{ margin: 0, fontSize: "14px" }}>
                                {detailTransaction[0]?.flight.airplane_code}
                              </p>
                            </div>
                            <p style={{ margin: 0 }}>Informasi:</p>
                            <p
                              style={{
                                margin: 0,
                                fontWeight: "normal",
                                color: "#315bb0",
                              }}
                            >
                              Penumpang 1 : Siti Aisyah
                            </p>
                            <p style={{ margin: 0, fontWeight: "normal" }}>
                              ID: 12346
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontWeight: "normal",
                                color: "#315bb0",
                              }}
                            >
                              Penumpang 2 : Siti Aisyah
                            </p>
                            <p style={{ margin: 0, fontWeight: "normal" }}>
                              ID: 12346
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
                        }}
                      >
                        <div style={{ fontWeight: "bold" }}>
                          {new Date(
                            detailTransaction[0]?.flight.arrival_date
                          ).toLocaleTimeString("id", {
                            timeZone:
                              detailTransaction[0]?.flight
                                .arrival_city_time_zone,
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div>
                          {new Date(
                            detailTransaction[0]?.flight.arrival_date
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div
                          style={{
                            color: "#315bb0",
                            textAlign: "right",
                            fontWeight: "bold",
                          }}
                        >
                          Kedatangan
                        </div>
                      </Col>
                    </Row>
                    <div
                      style={{
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        borderBottom: "1px solid #D0D0D0",
                        fontWeight: "bold",
                      }}
                    >
                      {detailTransaction[0]?.flight.arrival_airport}
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
                          <div>IDR {detailTransaction[0]?.flight.price}</div>
                          <div>IDR 0</div>
                          <div>IDR {detailTransaction[0]?.flight.tax}</div>
                        </Col>
                      </Row>
                    </Container>
                    <Row>
                      <Col md={6} style={{ fontWeight: "bold" }}>
                        Total
                      </Col>
                      <Col
                        md={6}
                        style={{ fontWeight: "bold", color: "#315bb0" }}
                      >
                        IDR {totalPrice}
                      </Col>
                    </Row>
                    {renderActionButton()}
                    {/* </Card.Body> */}
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        ))
      ) : (
        <Container className="history">
          <NoHistory />
        </Container>
      )}
    </Container>
  );
}

export default History;
