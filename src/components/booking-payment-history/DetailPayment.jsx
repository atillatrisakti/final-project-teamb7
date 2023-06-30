import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailPayment() {
  const [detailFlight, setDetailFlight] = useState([]);
  const { id } = useParams();
  const [facilities, setFacilities] = useState([]);
  const number_passenger = id.number_passenger;

  //count price
  const discountPrice =
    number_passenger *
    (detailFlight[0]?.price -
      detailFlight[0]?.price * (detailFlight[0]?.discount / 100));
  const totalPrice = discountPrice + discountPrice * detailFlight[0]?.tax;

  //get detail flight
  useEffect(() => {
    async function getDetailFlight() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/flights/${id}`
        );
        setDetailFlight(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDetailFlight();
  }, [id]);

  //get facilities
  useEffect(() => {
    async function getFacilities() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/facilities`
        );
        setFacilities(response.data.data);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    getFacilities();
    // console.log(flightFacilities[0].name);
  }, []);
  return (
    <>
      <Card className="detail" style={{ border: "none", boxShadow: "none" }}>
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
        <Card.Body>
          <Row>
            <Col
              md={6}
              style={{
                color: "#151515",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {new Date(detailFlight[0]?.departure_date).toLocaleTimeString(
                  "id",
                  {
                    timeZone: detailFlight[0]?.departure_city_time_zone,
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </div>
              <div>
                {new Date(detailFlight[0]?.departure_date).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
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
            {detailFlight[0]?.departure_airport}
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
                    src={detailFlight[0]?.airplane_logo}
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
                    {detailFlight[0]?.airplane_name} -
                    {detailFlight[0]?.airplane_class}
                  </h5>
                  <div style={{ marginBottom: "10px" }}>
                    <p style={{ margin: 0, fontSize: "14px" }}>
                      {detailFlight[0]?.airplane_code}
                    </p>
                  </div>
                  <p style={{ margin: 0 }}>Informasi:</p>
                  <p style={{ margin: 0, fontWeight: "normal" }}>
                    {facilities.map((facility) => (
                      <p style={{ margin: 0, fontWeight: "normal" }}>
                        {facility.name}
                      </p>
                    ))}
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
                {new Date(detailFlight[0]?.arrival_date).toLocaleTimeString(
                  "id",
                  {
                    timeZone: detailFlight[0]?.arrival_city_time_zone,
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </div>
              <div>
                {new Date(detailFlight[0]?.arrival_date).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
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
            {detailFlight[0]?.arrival_airport}
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
                  {(
                    number_passenger *
                    (detailFlight[0]?.price -
                      detailFlight[0]?.price *
                        (detailFlight[0]?.discount / 100))
                  ).toLocaleString("en-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </div>
                <div>IDR 0</div>
                <div>IDR {detailFlight[0]?.tax}</div>
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
        </Card.Body>
      </Card>
    </>
  );
}

export default DetailPayment;
