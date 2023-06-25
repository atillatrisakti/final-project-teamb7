import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Card } from "react-bootstrap";
import arrowAccor from "../assets/accordion/Suffix.svg";
import arrow from "../assets/search/Arrow.svg";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function Accordion1() {
  const params = useParams();

  const [isActive, setIsActive] = useState(false);
  const [flight, setFlight] = useState([]);

  // const departure_date = "2023-06-17T13:26:56.813Z";
  // const arrival_date = "2023-06-18T13:27:56.813Z";

  // const date =
  //   new Date(arrival_date).getTime() - new Date(departure_date).getTime();

  // const day = Math.floor(date / (1000 * 60 * 60 * 24));
  // const hour = Math.floor((date / (1000 * 60 * 60)) % 24);
  // const minute = Math.floor((date / (1000 * 60)) % 60);

  // console.log(day);
  // console.log(hour);
  // console.log(minute);

  useEffect(() => {
    async function getListFlight() {
      try {
        const response = await axios.get(
          `https://flight-booking-api-development.up.railway.app/api/web/flights?departure_airport_id=${params.departure_airport_id}&destination_airport_id=${params.destination_airport_id}&departure_date=${params.departure_date}&number_passenger=${params.number_passenger}&class_id=${params.class_id}`
        );
        setFlight(response.data.data);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    getListFlight();
  }, [params]);

  const activeButton = () => {
    setIsActive(false);
  };

  return (
    <div className="accordion-item2">
      <div className="accordion-title">
        {flight && flight.length > 0 ? (
          flight.map((item) => (
            <Card style={{ height: "127px", width: "750px" }} className="mt-2">
              <Row>
                <Col md={6}>
                  <div className="list-flight">
                    <img
                      src={item?.airplane_logo}
                      alt="plane-logo"
                      fluid
                      width="35"
                      className="ms-1"
                      style={{ float: "left" }}
                    />
                    <p className="mt-1 ms-5">
                      {item?.airplane_name} - {item?.airplane_class}
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <img
                    src={arrowAccor}
                    alt="arrowaccor"
                    fluid
                    width="30"
                    style={{ float: "right", cursor: "pointer" }}
                    className="me-2 mt-2"
                    onClick={() => setIsActive(!isActive)}
                  />
                  <span>
                    {}
                    {Math.floor(
                      (new Date(item?.arrival_date).getTime() -
                        new Date(item?.departure_date).getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) + "d "}
                    {Math.floor(
                      ((new Date(item?.arrival_date).getTime() -
                        new Date(item?.departure_date).getTime()) /
                        (1000 * 60 * 60)) %
                        24
                    ) + "h "}
                    {Math.floor(
                      ((new Date(item?.arrival_date).getTime() -
                        new Date(item?.departure_date).getTime()) /
                        (1000 * 60)) %
                        60
                    ) + "m"}
                  </span>
                </Col>
              </Row>
              <Container>
                <Row>
                  <Col md={2}>
                    <div className="ms-4 fw-bold">
                      {new Date(item?.departure_date).toLocaleTimeString("id", {
                        timeZone: item?.departure_city_time_zone,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="ms-4 fw-bold">
                      {item?.departure_airport_code}
                    </div>
                  </Col>
                  <Col md={2}>
                    <div>
                      <span></span>
                      <img src={arrow} alt="arrow" />
                    </div>
                  </Col>
                  <Col md={5} className="d-flex justify-content-end">
                    <div className="fw-bold">
                      {new Date(item?.arrival_date).toLocaleTimeString("id", {
                        timeZone: item?.arrival_city_time_zone,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      <br />
                      {item?.arrival_airport_code}
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-end fw-bold">
                      Rp.{item?.price}
                    </div>
                    <button
                      style={{ float: "right" }}
                      className="mt-2 btn-pilih"
                    >
                      Pilih
                    </button>
                  </Col>
                </Row>
              </Container>
            </Card>
          ))
        ) : (
          <h5 className="mt-3 mb-0 text-secondary">
            <b>Oops.. No result found</b>
          </h5>
        )}
      </div>

      {isActive && (
        <div>
          <div className="accordion-content">
            <Container className="my-2">
              <h5>Detail Penerbangan</h5>
              <Row>
                <Col md={6}>
                  <div className="fw-bold">07.00</div>
                  <div>3 Maret 2023</div>
                  <div className="fw-">
                    {flight[0]?.departure_airport} - Terminal 1A Domestik
                  </div>
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                  <div>
                    <p style={{ color: "#A06ECE", fontWeight: "700" }}>
                      Keberangkatan
                    </p>
                  </div>
                </Col>
              </Row>
              <div
                className="my-2"
                style={{
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid #D0D0D0",
                  display: "flex",
                  alignItems: "center",
                }}
              />

              <Container>
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginRight: "8px", marginBottom: "8px" }}>
                      <img
                        src={flight[0]?.airplane_logo}
                        alt="info"
                        fluid
                        width="30"
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {flight[0]?.airplane_name} - {flight[0]?.airplane_class}
                      </p>
                      <div style={{ marginBottom: "10px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          {flight[0]?.airplane_code}
                        </p>
                      </div>
                      <p style={{ margin: 0, fontWeight: "bold" }}>
                        Informasi:
                      </p>
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
              <div
                className="my-2"
                style={{
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid #D0D0D0",
                  display: "flex",
                  alignItems: "center",
                }}
              />
              <Row>
                <Col md={6}>
                  <div className="fw-bold">11.00</div>
                  <div>3 Maret 2023</div>
                  <div className="fw-">{flight[0]?.arrival_airport} </div>
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                  <div>
                    <p style={{ color: "#A06ECE", fontWeight: "700" }}>
                      Kedatangan
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accordion1;
