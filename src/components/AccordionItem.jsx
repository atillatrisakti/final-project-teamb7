import React, { useEffect, useState } from "react";
import arrowAccor from "../assets/accordion/Suffix.svg";
import arrow from "../assets/search/Arrow.svg";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AccordionItem = (props, sort) => {
  const [item, setItem] = useState(props.item);
  const [isActive, setIsActive] = useState(false);
  const [flightFacilities, setFlightFacilities] = useState([]);

  useEffect(() => {
    async function getFlightFacilities() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/web/facilities`);
        setFlightFacilities(response.data.data);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    getFlightFacilities();
    // console.log(flightFacilities[0].name);
  }, []);
  return (
    <>
      <div className="accordion-title" key={props.index}>
        <Card style={{ height: "127px", width: "750px" }} className="mt-2">
          <Row>
            <Col md={6}>
              <div className="list-flight">
                <img src={item?.airplane_logo} alt="plane-logo" fluid width="35" className="ms-1" style={{ float: "left" }} />
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
                onClick={(e) => {
                  // e.preventDefault();
                  // e.target.value();
                  setIsActive(!isActive);
                }}
              />
            </Col>
          </Row>
          <Container>
            <Row>
              <Col md={2} className="d-flex align-items-center">
                <div className="ms-4 fw-bold">
                  {new Date(item?.departure_date).toLocaleTimeString("id", {
                    timeZone: item?.departure_city_time_zone,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <br />
                  {item?.departure_airport_code}
                </div>
              </Col>
              <Col md={4} className="d-flex justify-content-center align-items-center">
                <div>
                  <span className="d-flex justify-content-center font-count-time">
                    {Math.floor((new Date(item?.arrival_date).getTime() - new Date(item?.departure_date).getTime()) / (1000 * 60 * 60 * 24)) + "d "}
                    {Math.floor(((new Date(item?.arrival_date).getTime() - new Date(item?.departure_date).getTime()) / (1000 * 60 * 60)) % 24) + "h "}
                    {Math.floor(((new Date(item?.arrival_date).getTime() - new Date(item?.departure_date).getTime()) / (1000 * 60)) % 60) + "m"}
                  </span>
                  <img src={arrow} alt="arrow" className="d-flex justify-content-center" />
                  <span className="d-flex justify-content-center font-count-time">Direct</span>
                </div>
              </Col>
              <Col md={2} className="ps-5 pe-0 ms-1 d-flex align-items-center">
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
                <Icon icon="icon-park-outline:baggage-delay" color="#1b3260" width="25" height="25" />
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
                <Link to={`/booking/${item.id}/${item.numberPassenger}`} style={{ textDecoration: "none" }}>
                  <button style={{ float: "right" }} className="mt-2 btn-pilih">
                    Pilih
                  </button>
                </Link>
              </Col>
            </Row>
          </Container>
        </Card>
      </div>

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
                      {new Date(item?.departure_date).toLocaleTimeString("id", {
                        timeZone: item?.departure_city_time_zone,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </b>
                  </h5>
                </div>
                <div>{new Date(item?.departure_date).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</div>
                <div className="fw-bold mb-1">{item?.departure_airport}</div>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <div>
                  <p style={{ color: "#315bb0", fontWeight: "700" }}>Keberangkatan</p>
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
                  <div style={{ marginRight: "18px", marginBottom: "20px" }}>
                    <img src={item?.airplane_logo} alt="info" fluid width="30" />
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
                    <p style={{ margin: 0, fontWeight: "bold" }}>Informasi:</p>
                    {flightFacilities.map((facil) => (
                      <p style={{ margin: 0, fontWeight: "normal" }}>{facil.name}</p>
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
                <div>{new Date(item?.arrival_date).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</div>
                <div className="fw-bold mb-1">{item?.arrival_airport} </div>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <div>
                  <p style={{ color: "#315bb0", fontWeight: "700" }}>Kedatangan</p>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </>
  );
};

export default AccordionItem;
