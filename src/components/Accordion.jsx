import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Card } from "react-bootstrap";
import arrowAccor from "../assets/accordion/Suffix.svg";
import arrow from "../assets/search/Arrow.svg";

const Accordion = () => {
  const [isActive, setIsActive] = useState(false);
  const [flight, setFlight] = useState([]);

  useEffect(() => {
    async function getListFlight() {
      try {
        const response = await axios.get("https://flight-booking-api-development.up.railway.app/api/web/flights?departure_airport_id=1&destination_airport_id=2&departure_date=2023-06-13&number_passenger=1&class_id=1");
        setFlight(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getListFlight();
  }, []);

  return (
    <div className="accordion-item2">
      <div className="accordion-title">
        <Card style={{ height: "127px", width: "750px" }} className="mt-2">
          <Row>
            <Col md={6}>
              <div className="list-flight">
                <img src={flight[0]?.airplane_logo} alt="plane-logo" fluid width="35" className="ms-1" style={{ float: "left" }} />
                <p className="mt-1 ms-5">
                  {flight[0]?.airplane_name} - {flight[0]?.airplane_class}
                </p>
              </div>
            </Col>
            <Col md={6}>
              <img src={arrowAccor} alt="arrowaccor" fluid width="30" style={{ float: "right", cursor: "pointer" }} className="me-2 mt-2" onClick={() => setIsActive(!isActive)} />
            </Col>
          </Row>
          <Container>
            <Row>
              <Col md={2}>
                <div className="ms-4 fw-bold">07.00</div>
                <div className="ms-4 fw-bold">JKT</div>
              </Col>
              <Col md={2}>
                <div>
                  <img src={arrow} alt="arrow" />
                </div>
              </Col>
              <Col md={5} className="d-flex justify-content-end">
                <div className="fw-bold">11.00</div>
                <div className="fw-bold">Melbourne</div>
              </Col>
              <Col>
                <div className="d-flex justify-content-end fw-bold">Rp.{flight[0]?.price}</div>
                <button style={{ float: "right" }} className="mt-2 btn-pilih">
                  Pilih
                </button>
              </Col>
            </Row>
          </Container>
        </Card>
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
                  <div className="fw-">{flight[0]?.departure_airport} - Terminal 1A Domestik</div>
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                  <div>
                    <p style={{ color: "#A06ECE", fontWeight: "700" }}>Keberangkatan</p>
                  </div>
                </Col>
              </Row>
              <div className="my-2" style={{ borderTop: "none", borderLeft: "none", borderRight: "none", borderBottom: "1px solid #D0D0D0", display: "flex", alignItems: "center" }} />

              <Container>
                <div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginRight: "8px", marginBottom: "8px" }}>
                      <img src={flight[0]?.airplane_logo} alt="info" fluid width="30" />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>
                        {flight[0]?.airplane_name} - {flight[0]?.airplane_class}
                      </p>
                      <div style={{ marginBottom: "10px" }}>
                        <p style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>{flight[0]?.airplane_code}</p>
                      </div>
                      <p style={{ margin: 0, fontWeight: "bold" }}>Informasi:</p>
                      <p style={{ margin: 0, fontWeight: "normal" }}>Baggage 20 kg</p>
                      <p style={{ margin: 0, fontWeight: "normal" }}>Cabin Baggage 7 kg</p>
                      <p style={{ margin: 0, fontWeight: "normal" }}>In Flight Entertainment</p>
                    </div>
                  </div>
                </div>
              </Container>
              <div className="my-2" style={{ borderTop: "none", borderLeft: "none", borderRight: "none", borderBottom: "1px solid #D0D0D0", display: "flex", alignItems: "center" }} />
              <Row>
                <Col md={6}>
                  <div className="fw-bold">11.00</div>
                  <div>3 Maret 2023</div>
                  <div className="fw-">{flight[0]?.arrival_airport} </div>
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                  <div>
                    <p style={{ color: "#A06ECE", fontWeight: "700" }}>Kedatangan</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
