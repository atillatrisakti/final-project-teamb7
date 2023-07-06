import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function DetailHistory({ selectedTransactionId }) {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);
  const [detailTransaction, setDetailTransaction] = useState([]);
  const [number_passenger, setNumber_passenger] = useState([]);

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
        const passengerCounts = detailResults.reduce(
          (acc, detailData, index) => {
            const transactionId = transaction[index].id;
            const count = detailData.passengers.length;
            return { ...acc, [transactionId]: count };
          },
          {}
        );

        setNumber_passenger(passengerCounts);
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

  useEffect(() => {
    const passengerCounts = detailTransaction.map(
      (detailData) => detailData.passengers.length
    );
    setNumber_passenger(passengerCounts);
  }, [detailTransaction]);

  //count price
  const discountPrice =
    number_passenger[selectedTransactionId] *
    (detailTransaction[selectedTransactionId]?.flight.price -
      detailTransaction[selectedTransactionId]?.flight.price *
        (detailTransaction[selectedTransactionId]?.flight.discount / 100));

  const totalPrice =
    discountPrice +
    discountPrice *
      (detailTransaction[selectedTransactionId]?.flight.tax / 100);

  const handleLanjutBayar = () => {
    const transactionId = detailTransaction[selectedTransactionId]?.flight.id;
    const passengers = number_passenger[selectedTransactionId];
    if (transactionId) {
      navigate(`/payment/${transactionId}/${passengers}`);
    }
  };

  const renderActionButton = () => {
    if (transaction[selectedTransactionId]?.status === "paid") {
      return (
        <button className="btn-tiket" style={{ backgroundColor: "#1B3260" }}>
          Cetak Tiket
        </button>
      );
    } else if (transaction[selectedTransactionId]?.status === "unpaid") {
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
                  transaction[selectedTransactionId]?.status === "unpaid"
                    ? "#FF0000"
                    : transaction[selectedTransactionId]?.status === "paid"
                    ? "#73CA5C"
                    : transaction[selectedTransactionId]?.status ===
                        "expired" ||
                      transaction[selectedTransactionId]?.status === "cancelled"
                    ? "#73706F"
                    : null,
                color: "#FFFFFF",
                borderRadius: "20px",
                border: "none",
                fontSize: "16px",
              }}
            >
              {transaction[selectedTransactionId]?.status}
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
          <Row>
            <Col
              md={6}
              style={{
                color: "#151515",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {new Date(
                  detailTransaction[
                    selectedTransactionId
                  ]?.flight.departure_date
                ).toLocaleTimeString("id", {
                  timeZone:
                    detailTransaction[selectedTransactionId]?.flight
                      .departure_city_time_zone,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>
                {new Date(
                  detailTransaction[
                    selectedTransactionId
                  ]?.flight.departure_date
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
            {detailTransaction[selectedTransactionId]?.flight.departure_airport}
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
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "8px" }}>
                  <img
                    src={
                      detailTransaction[selectedTransactionId]?.flight
                        .airplane_logo
                    }
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
                    {
                      detailTransaction[selectedTransactionId]?.flight
                        .airplane_name
                    }{" "}
                    -{" "}
                    {
                      detailTransaction[selectedTransactionId]?.flight
                        .airplane_class
                    }
                  </h5>
                  <div style={{ marginBottom: "10px" }}>
                    <p style={{ margin: 0, fontSize: "16px" }}>
                      {
                        detailTransaction[selectedTransactionId]?.flight
                          .airplane_code
                      }
                    </p>
                  </div>
                  <b>
                    <p style={{ margin: 0 }}>Informasi:</p>
                  </b>
                  {detailTransaction[selectedTransactionId] &&
                  detailTransaction[selectedTransactionId].passengers
                    ? detailTransaction[selectedTransactionId].passengers
                        .slice(0, number_passenger[selectedTransactionId])
                        .map((passenger, passengerIndex) => (
                          <div key={passengerIndex}>
                            <p
                              style={{
                                margin: 0,
                                fontWeight: "normal",
                                color: "#315bb0",
                              }}
                            >
                              Penumpang {passengerIndex + 1}:{" "}
                              {passenger.passenger_name}
                            </p>
                            <p style={{ margin: 0, fontWeight: "normal" }}>
                              ID: {passenger.transaction_detail_id}
                            </p>
                          </div>
                        ))
                    : null}
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
                  detailTransaction[selectedTransactionId]?.flight.arrival_date
                ).toLocaleTimeString("id", {
                  timeZone:
                    detailTransaction[selectedTransactionId]?.flight
                      .arrival_city_time_zone,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>
                {new Date(
                  detailTransaction[selectedTransactionId]?.flight.arrival_date
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
            {detailTransaction[selectedTransactionId]?.flight.arrival_airport}
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
                <div>{number_passenger[selectedTransactionId]} Penumpang</div>
              </Col>
              <Col>
                <div>
                  {discountPrice.toLocaleString("en-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div>Tax</div>
              </Col>
              <Col>
                <div>
                  {detailTransaction[selectedTransactionId]?.flight.tax.toFixed(
                    0
                  ) + "%"}
                </div>
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
        </Card.Body>
      </Card>
    </>
  );
}

export default DetailHistory;
