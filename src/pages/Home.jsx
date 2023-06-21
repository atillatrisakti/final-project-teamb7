import React from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Home.css";

import Banner1 from "../assets/1.svg";

import DestinationPromo from "../assets/img-destination.svg";

import { Icon } from "@iconify/react";
import DepartureAirports from "../components/search-flights-home/DepartureAirports";
import DestinationAirports from "../components/search-flights-home/DestinationAirports";
import Passengers from "../components/search-flights-home/Passengers";
import SeatClasses from "../components/search-flights-home/SeatClasses";
import DatePicker from "../components/search-flights-home/DatePicker";

function Home() {
  // const [destination, setDestination] = useState([]);

  return (
    <>
      <Carousel
        controls={true}
        style={{
          position: "absolute",
          top: "4.8rem",
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* {destination.slice(1, 3).map((dest) => ( */}
        <Carousel.Item key="">
          <img
            src={Banner1}
            style={{
              width: "100%",
              maxHeight: "590px",
            }}
            className="mx-auto"
            alt="banner"
          ></img> */}
        </Carousel.Item>
        {/* ))} */}
      </Carousel>
      <div>
        <Container>
          <Row style={{ marginTop: "14rem" }}>
          <Row style={{ marginTop: "14rem" }}>
            <Col>
              <Form>
                <Card className="mx-auto mb-4" style={{ width: "75rem" }}>
                  <Card.Body>
                    <Card.Title className="px-3 pt-2 mb-3">
                      <b>Pilih Jadwal Penerbangan spesial di</b>{" "}
                      <b style={{ color: "#4076E2" }}>SyuraTrip!</b>
                    </Card.Title>
                    <Row className="px-3 pt-2 d-flex align-items-center">
                      <Col xs={2} md={1}>
                        <Icon icon="material-symbols:flight-takeoff" color="gray" className="icon-input" />
                        <Form.Label className="font-input">From</Form.Label>
                      </Col>
                      {/* ================Kota Asal================= */}
                      <DepartureAirports />
                      <Col
                        xs={2}
                        md={1}
                        className="d-flex justify-content-center"
                      >
                        <Icon
                          icon="icon-park-outline:play-cycle"
                          color="white"
                          className="icon-switch"
                        />
                      </Col>
                      <Col xs={2} md={1}>
                        <Icon icon="material-symbols:flight-land" color="gray" className="icon-input" />
                        <Form.Label className="font-input">To</Form.Label>
                      </Col>
                      {/* ================Kota Tujuan================= */}
                      <DestinationAirports />
                    </Row>
                    <Row className="px-3 pt-2 my-3 d-flex align-items-center">
                      <Col xs={2} md={1}>
                        <Icon icon="material-symbols:date-range-outline" color="gray" className="icon-input" />
                        <Form.Label className="font-input">Date</Form.Label>
                      </Col>
                      {/* ================DatePicker================= */}
                      <Col xs={4} md={5}>
                        <DatePicker />
                      </Col>
                      <Col xs={2} md={1}></Col>
                      <Col xs={2} md={1}>
                        <Icon icon="material-symbols:airline-seat-recline-normal" color="gray" className="icon-input" />
                        <Form.Label className="font-input">To</Form.Label>
                      </Col>
                      {/* ==========Jumlah Passangers dan Seat Classes========== */}
                      <Passengers />
                      <SeatClasses />
                    </Row>
                  </Card.Body>
                  <div className="d-grid gap-2">
                    <span
                      className="square rounded-bottom"
                      style={{ backgroundColor: "#1B3260" }}
                    >
                      <div className="d-grid gap-2">
                        <Button
                          variant="primary"
                          style={{ height: "3rem", backgroundColor: "#1B3260" }}
                        >
                          <b>Cari Penerbangan</b>
                        </Button>
                      </div>
                    </span>
                  </div>
                </Card>
              </Form>
            </Col>
          </Row>

          {/* ========== FLIGHT PROMO =========*/}
          <Row style={{ marginLeft: "5.4%", marginRight: "5.4%" }}>
            <Col sm={10} className="mt-1">
              <h5 className="text-dark text-popular mt-2">
                <b>Destinasi Favorit</b>
              </h5>
            </Col>
          </Row>
          <Row
            md="auto"
            style={{
              marginLeft: "5.4%",
              marginRight: "5.4%",
              marginTop: "0.5rem",
              marginBottom: "1.3rem",
            }}
          >
            <Col className="mb-1">
              <Button
                variant="outline-dark"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "15px",
                  borderRadius: "25px",
                }}
              >
                <Icon icon="iconamoon:search-bold" className="icon-input" />
                Category 1
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-dark"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "15px",
                  borderRadius: "25px",
                }}
              >
                <Icon icon="iconamoon:search-bold" className="icon-input" />
                Category 2
              </Button>
            </Col>
            <Col>
              <Button
                variant="outline-dark"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "15px",
                  borderRadius: "25px",
                }}
              >
                <Icon icon="iconamoon:search-bold" className="icon-input" />
                Category 3
              </Button>
            </Col>
          </Row>
          <Row className="mt-2" style={{ marginLeft: "5.4%", marginRight: "5.4%" }}>
            {/* {destination.map((dest) => ( */}
            <Col sm={12} md={6} lg={3} key="">
              <Link to={`/details/...`} style={{ textDecoration: "none", borderColor: "black" }}>
                <Card className="p-2 mb-5" style={{ borderRadius: "10px" }}>
                  <img
                    src={DestinationPromo}
                    alt="destination"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />

                  <Card.Body className="px-2 pt-3 pb-2">
                    <Card.Title>
                      <h5 className="d-flex align-items-center">
                        <b>
                          Jakarta
                          <Icon icon="heroicons:arrow-long-right" className="mx-1" />
                          Bangkok
                        </b>
                      </h5>
                      <h6>
                        <b style={{ color: "#3E6B00" }}>AirAsia</b>
                      </h6>
                      <h6>20 - 30 Maret 2023</h6>
                      <h5>
                        Mulai dari <b style={{ color: "red" }}>IDR 950.000</b>
                      </h5>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            {/* ))} */}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
