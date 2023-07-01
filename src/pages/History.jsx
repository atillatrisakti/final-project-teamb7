import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import loc from "../assets/booking/loc.svg";
import thinarrow from "../assets/search/Arrow.svg";
import "../styles/History.css";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../assets/account/fi_arrow-left.svg";
import axios from "axios";
import { toast } from "react-toastify";
import NoHistory from "../components/NoHistory";
import DetailHistory from "../components/booking-payment-history/DetailHistory";

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
        const response = await axios.get(`${process.env.REACT_APP_API}/customer/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const transaction = response.data.data;
        setTransaction(transaction);
        console.log(transaction);

        const detailPromises = transaction.map(async (flight) => {
          const detailResponse = await axios.get(`${process.env.REACT_APP_API}/customer/transactions/${flight.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
  const discountPrice = detailTransaction[0]?.flight.price - detailTransaction[0]?.flight.price * (detailTransaction[0]?.flight.discount / 100);

  const totalPrice = discountPrice + discountPrice * detailTransaction[0]?.flight.tax;

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
        <button className="btn-tiket" style={{ backgroundColor: "#FF0000" }} onClick={handleLanjutBayar}>
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
          <div className="list mx-4 mt-3" style={{ backgroundColor: "#315bb0" }}>
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
                  <Card className={`history-month ${isCardActive[index] && showOrderDetails[index] ? "active" : ""}`} onClick={() => handleCardClick(transaction.id, index)}>
                    <button
                      className="btn-status"
                      style={{
                        backgroundColor: transaction.status === "unpaid" ? "#FF0000" : transaction.status === "paid" ? "#73CA5C" : null,
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
                              <img src={loc} alt="loc" fluid width="24" height="24" />
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
                                {new Date(detailTransaction[0]?.flight.departure_date).toLocaleDateString("en-GB", {
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
                                {new Date(detailTransaction[0]?.flight.departure_date).toLocaleTimeString("id", {
                                  timeZone: detailTransaction[0]?.flight.departure_city_time_zone,
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
                                {Math.floor((new Date(detailTransaction[0]?.flight.arrival_date).getTime() - new Date(detailTransaction[0]?.flight.departure_date).getTime()) / (1000 * 60 * 60 * 24)) + "d "}
                                {Math.floor(((new Date(detailTransaction[0]?.flight.arrival_date).getTime() - new Date(detailTransaction[0]?.flight.departure_date).getTime()) / (1000 * 60 * 60)) % 24) + "h "}
                                {Math.floor(((new Date(detailTransaction[0]?.flight.arrival_date).getTime() - new Date(detailTransaction[0]?.flight.departure_date).getTime()) / (1000 * 60)) % 60) + "m"}
                              </span>
                              <img src={thinarrow} alt="arrow" className="d-flex justify-content-center" style={{ width: "120px", height: "auto" }} />
                              <span className="d-flex justify-content-center font-count-time">Direct</span>
                            </div>
                          </div>
                        </Col>
                        <Col>
                          <div style={{ display: "flex", alignItems: "top" }}>
                            <div style={{ marginRight: "8px" }}>
                              <img src={loc} alt="loc" fluid width="24" height="24" />
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
                                {new Date(detailTransaction[0]?.flight.arrival_date).toLocaleDateString("en-GB", {
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
                                {new Date(detailTransaction[0]?.flight.arrival_date).toLocaleTimeString("id", {
                                  timeZone: detailTransaction[0]?.flight.arrival_city_time_zone,
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
                          {totalPrice.toLocaleString("en-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </Col>
                      </Row>
                    </Container>
                  </Card>
                  {/* </Card.Body>
                  </Card> */}
                </Card.Body>
              </Card>
            </Col>
            {/* ========== Detail Pesanan ========== */}
            <Col md={6}>{showOrderDetails[index] && <DetailHistory />}</Col>
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
