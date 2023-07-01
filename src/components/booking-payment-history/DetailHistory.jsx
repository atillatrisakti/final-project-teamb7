import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function DetailHistory() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);
  const [detailTransaction, setDetailTransaction] = useState([]);
  const params = useParams();
  const number_passenger = params.number_passenger;

  //get history transaction
  useEffect(() => {
    const getTransactionData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API}/customer/transactions`,
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
            `${process.env.REACT_APP_API}/customer/transactions/${flight.id}`,
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
  const discountPrice =
    detailTransaction[0]?.flight.price -
    detailTransaction[0]?.flight.price *
      (detailTransaction[0]?.flight.discount / 100);

  const totalPrice =
    discountPrice + discountPrice * detailTransaction[0]?.flight.tax;

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
    <>
      <Card className="detail" style={{ border: "none", boxShadow: "none" }}>
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
                    detailTransaction[0]?.flight.departure_city_time_zone,
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
                <div style={{ marginRight: "8px", marginBottom: "20px" }}>
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
                  <p style={{ margin: 0, fontWeight: "normal" }}>ID: 12346</p>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: "normal",
                      color: "#315bb0",
                    }}
                  >
                    Penumpang 2 : Siti Aisyah
                  </p>
                  <p style={{ margin: 0, fontWeight: "normal" }}>ID: 12346</p>
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
                  timeZone: detailTransaction[0]?.flight.arrival_city_time_zone,
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
                <div>{number_passenger} Adult</div>
                <div>1 Baby</div>
                <div>Tax</div>
              </Col>
              <Col>
                <div>
                  {detailTransaction[0]?.flight.price -
                  detailTransaction[0]?.flight.price * (detailTransaction[0]?.flight.discount / 100)
                    ? detailTransaction[0]?.flight.price.toLocaleString(
                        "en-ID",
                        {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }
                      )
                    : "N/A"}
                </div>
                <div>IDR 0</div>
                <div>IDR {detailTransaction[0]?.flight.tax}</div>
              </Col>
            </Row>
          </Container>
          <Row>
            <Col md={6} style={{ fontWeight: "bold" }}>
              Total
            </Col>
            <Col md={6} style={{ fontWeight: "bold", color: "#315bb0" }}>
              {totalPrice.toLocaleString("en-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </Col>
          </Row>
          {renderActionButton()}
          {/* </Card.Body> */}
        </Card.Body>
      </Card>
    </>
  );
}

export default DetailHistory;
