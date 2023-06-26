import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Card } from "react-bootstrap";
import arrowAccor from "../assets/accordion/Suffix.svg";
import arrow from "../assets/search/Arrow.svg";
import { toast } from "react-toastify";
<<<<<<< HEAD
import { Link, useParams } from "react-router-dom";
=======
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
>>>>>>> 2ccfdc23e256196235c465675ef791ed4004e5aa

function Accordion1() {
  const params = useParams();

  const [isActive, setIsActive] = useState(false);
  const [flight, setFlight] = useState([]);
  const [flightFacilities, setFlightFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getListFlight() {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://flight-booking-api-development.up.railway.app/api/web/flights?departure_airport_id=${params.departure_airport_id}&destination_airport_id=${params.destination_airport_id}&departure_date=${params.departure_date}&number_passenger=${params.number_passenger}&class_id=${params.class_id}`
        );
        setFlight(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.message);
      }
    }
    getListFlight();
  }, [params]);

  useEffect(() => {
    async function getFlightFacilities() {
      try {
        const response = await axios.get(
          `https://flight-booking-api-development.up.railway.app/api/web/facilities`
        );
        setFlightFacilities(response.data.data);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    getFlightFacilities();
    // console.log(flightFacilities[0].name);
  }, []);

  const activeButton = () => {
    setIsActive(false);
  };

  return (
    <div className="accordion-item2">
      {loading ? (
        <h1 className="text-center">Loading...</h1>
      ) : flight && flight.length > 0 ? (
        flight.map((item) => (
          <>
            <div className="accordion-title">
              <Card
                style={{ height: "127px", width: "750px" }}
                className="mt-2"
              >
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
<<<<<<< HEAD
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
                    <Link
                      to={`/booking/${item.id}?number_passenger=${item.numberPassenger}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{ float: "right" }}
                        className="mt-2 btn-pilih"
                      >
                        Pilih
                      </button>
                    </Link>
=======
                  <Col md={6}>
                    <img
                      src={arrowAccor}
                      alt="arrowaccor"
                      fluid
                      width="30"
                      style={{ float: "right", cursor: "pointer" }}
                      className="me-2 mt-2"
                      onClick={(e) => {
                        // e.preventDefault();
                        // e.target.value();
                        setIsActive(!isActive);
                      }}
                    />
>>>>>>> 2ccfdc23e256196235c465675ef791ed4004e5aa
                  </Col>
                </Row>
                <Container>
                  <Row>
                    <Col md={2} className="d-flex align-items-center">
                      <div className="ms-4 fw-bold">
                        {new Date(item?.departure_date).toLocaleTimeString(
                          "id",
                          {
                            timeZone: item?.departure_city_time_zone,
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                        <br />
                        {item?.departure_airport_code}
                      </div>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <div>
                        <span className="d-flex justify-content-center font-count-time">
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
                        <img
                          src={arrow}
                          alt="arrow"
                          className="d-flex justify-content-center"
                        />
                        <span className="d-flex justify-content-center font-count-time">
                          Direct
                        </span>
                      </div>
                    </Col>
                    <Col
                      md={2}
                      className="ps-5 pe-0 ms-1 d-flex align-items-center"
                    >
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
                    <Col md="auto" className="d-flex align-items-center ps-0">
                      <Icon
                        icon="icon-park-outline:baggage-delay"
                        color="#1b3260"
                        width="25"
                        height="25"
                      />
                    </Col>
                    <Col md={3} className="ms-1 pe-0">
                      <div className="d-flex justify-content-end fw-bold">
                        {(item?.price).toLocaleString("en-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
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
            </div>
            {/* '''''''''''''''''''''''''' */}
            <div className="accordion-content">
              {isActive && (
                <Container className="mb-2">
                  <Row>
                    <Row className="mt-2">
                      <h6>
                        <b style={{ color: "#1b3260" }}>Detail Penerbangan</b>
                      </h6>
                    </Row>
                    <Col md={6}>
                      <div>
                        <h5>
                          <b>
                            {new Date(item?.departure_date).toLocaleTimeString(
                              "id",
                              {
                                timeZone: item?.departure_city_time_zone,
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </b>
                        </h5>
                      </div>
                      <div>
                        {new Date(item?.departure_date).toLocaleDateString(
                          "id-ID",
                          { day: "2-digit", month: "long", year: "numeric" }
                        )}
                      </div>
                      <div className="fw-bold mb-1">
                        {item?.departure_airport}
                      </div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                      <div>
                        <p style={{ color: "#315bb0", fontWeight: "700" }}>
                          Keberangkatan
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <div
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
                        <div
                          style={{ marginRight: "18px", marginBottom: "20px" }}
                        >
                          <img
                            src={item?.airplane_logo}
                            alt="info"
                            fluid
                            width="30"
                          />
                        </div>
                        <div>
                          <p
                            className="mt-2"
                            style={{
                              margin: 0,
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                          >
                            {item?.airplane_name} - {item?.airplane_class}
                          </p>
                          <div style={{ marginBottom: "10px" }}>
                            <p
                              style={{
                                margin: 0,
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {item?.airplane_code}
                            </p>
                          </div>
                          <p style={{ margin: 0, fontWeight: "bold" }}>
                            Informasi:
                          </p>
                          {flightFacilities.map((facil) => (
                            <p style={{ margin: 0, fontWeight: "normal" }}>
                              {facil.name}
                            </p>
                          ))}
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
                      <div className="fw-bold">
                        {new Date(item?.arrival_date).toLocaleTimeString("id", {
                          timeZone: item?.arrival_city_time_zone,
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div>
                        {new Date(item?.arrival_date).toLocaleDateString(
                          "id-ID",
                          { day: "2-digit", month: "long", year: "numeric" }
                        )}
                      </div>
                      <div className="fw-bold mb-1">
                        {item?.arrival_airport}{" "}
                      </div>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                      <div>
                        <p style={{ color: "#315bb0", fontWeight: "700" }}>
                          Kedatangan
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}
            </div>
          </>
        ))
      ) : (
        <h5 className="mt-3 mb-0 text-secondary">
          <b>Oops.. No result found</b>
        </h5>
      )}
    </div>
  );
}

export default Accordion1;
