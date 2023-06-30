import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";

import Banner1 from "../assets/1.svg";
import DestinationPromo from "../assets/img-destination.svg";

import { Icon } from "@iconify/react";
import DepartureAirports from "../components/search-flights-home/DepartureAirports";
import DestinationAirports from "../components/search-flights-home/DestinationAirports";
import Passengers from "../components/search-flights-home/Passengers";
import SeatClasses from "../components/search-flights-home/SeatClasses";
import DatePicker from "../components/search-flights-home/DatePicker";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();

  const [destinationPromos, setDestinationPromos] = useState([]);
  const [banner, setBanner] = useState([]);
  const [isPromo, setIsPromo] = useState(false);

  useEffect(() => {
    async function getBanners() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/banners`
        );
        setBanner(response.data.data);
        // console.log(banner[1].picture);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    getBanners();
  }, []);

  useEffect(() => {
    async function getDestinationPromos() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/promos`
        );
        setDestinationPromos(response.data.data);
        // console.log(destinationPromos);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    getDestinationPromos();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const departure =
      form.departure_airport.attributes.getNamedItem("data-id").value;
    const destination =
      form.destination_airport.attributes.getNamedItem("data-id").value;
    const startDate = form.start_date.value;
    const endDate = form.end_date.value;
    const numberPassenger =
      form.number_passenger.attributes.getNamedItem("data-count").value;
    const seatClass = form.seat_class.attributes.getNamedItem("data-id").value;

    navigate(
      `/search/${departure}/${destination}/${startDate}/${numberPassenger}/${seatClass}/${isPromo}`
    );
    // console.log("searchhh", form.seat_class.attributes.getNamedItem("data-id"));
  };

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
        {banner &&
          banner.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                src={`${item?.picture}`}
                alt="banner"
                style={{
                  width: "100%",
                  maxHeight: "590px",
                }}
                className="mx-auto"
              ></img>
            </Carousel.Item>
          ))}
      </Carousel>
      <div>
        <Container>
          <Row style={{ marginTop: "14rem" }}>
            <Col>
              <Form onSubmit={onSubmit}>
                <Card className="mx-auto mb-4" style={{ width: "75rem" }}>
                  <Card.Body>
                    <Card.Title
                      className="px-3 pt-2 mb-3"
                      style={{ textShadow: "2px 2px 8px #e3ecff" }}
                    >
                      <b>Pilih Jadwal Penerbangan spesial di</b>{" "}
                      <b style={{ color: "#4076E2" }}>SyuraTrip!</b>
                    </Card.Title>
                    <Row className="px-3 pt-2 d-flex align-items-center">
                      <Col xs={2} md={1}>
                        <Icon
                          icon="material-symbols:flight-takeoff"
                          color="gray"
                          className="icon-input"
                        />
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
                          onClick={(e) => {
                            // e.target.departure_airport.value();
                            console.log(e.target.departure_airport);
                          }}
                        />
                      </Col>
                      <Col xs={2} md={1}>
                        <Icon
                          icon="material-symbols:flight-land"
                          color="gray"
                          className="icon-input"
                        />
                        <Form.Label className="font-input">To</Form.Label>
                      </Col>
                      {/* ================Kota Tujuan================= */}
                      <DestinationAirports />
                    </Row>
                    <Row className="px-3 pt-2 my-3 d-flex align-items-center">
                      <Col xs={2} md={1}>
                        <Icon
                          icon="material-symbols:date-range-outline"
                          color="gray"
                          className="icon-input"
                        />
                        <Form.Label className="font-input">Date</Form.Label>
                      </Col>
                      {/* ================DatePicker================= */}
                      <Col xs={4} md={5}>
                        <DatePicker />
                      </Col>
                      <Col xs={2} md={1}></Col>
                      <Col xs={2} md={1}>
                        <Icon
                          icon="material-symbols:airline-seat-recline-normal"
                          color="gray"
                          className="icon-input"
                        />
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
                          type="submit"
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
              <h5
                className="text-dark text-popular mt-2"
                style={{ textShadow: "2px 2px 8px #e3ecff" }}
              >
                <b>Pengen ke Luar Negeri? Nih promo buat kamu!</b>
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
            {destinationPromos &&
              destinationPromos.slice(0, 6).map((promo) => (
                <Col className="mb-1 me-0" key={promo?.id}>
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
                    {promo?.arrival_city}
                  </Button>
                </Col>
              ))}
          </Row>

          <Row
            className="mt-2 d-flex justify-content-center"
            // style={{ marginLeft: "5.4%", marginRight: "5.4%" }}
            style={{ marginLeft: "2.7%", marginRight: "2.6%" }}
          >
            {destinationPromos &&
              destinationPromos.map((promo) => (
                <Col
                  sm="auto"
                  md="auto"
                  lg="auto"
                  className="px-2"
                  key={promo?.id}
                >
                  <Link
                    to={`/search/${promo?.departure_airport_id}/${
                      promo?.arrival_airport_id
                    }/${new Date(promo?.departure_date).toLocaleDateString(
                      "en-CA",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}/1/1/${!isPromo}`}
                    style={{ textDecoration: "none", borderColor: "black" }}
                  >
                    <Card
                      className="mb-3 shadow"
                      style={{ borderRadius: "10px", width: "228px" }}
                    >
                      <img
                        src={promo?.arrival_city_image}
                        alt="destination"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "150px",
                          borderTopRightRadius: "10px",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          borderTopRightRadius: "50px",
                          borderBottomRightRadius: "50px",
                          padding: "8px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          background: "red",
                        }}
                        className="d-flex justify-content-end text-light"
                      >
                        {promo?.discount}% OFF
                      </span>

                      <Card.Body className="px-2 pt-2 pb-2">
                        <Card.Title className="pb-0 px-1">
                          <b>
                            <span
                              className="d-flex align-items-center"
                              style={{ fontSize: "16px" }}
                            >
                              {promo?.departure_city}
                              <Icon
                                icon="heroicons:arrow-long-right"
                                className="mx-1"
                              />
                              {promo?.arrival_city}
                            </span>
                          </b>

                          <h6
                            className="mb-0"
                            style={{ color: "#315bb0", fontSize: "15px" }}
                          >
                            {promo?.airplane_name}
                          </h6>
                          <h6 style={{ fontSize: "15px" }}>
                            {new Date(promo?.departure_date).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </h6>
                          <span
                            style={{
                              textDecoration: "line-through",
                              fontSize: "14px",
                              color: "gray",
                            }}
                          >
                            {(promo?.price).toLocaleString("en-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </span>
                          <h5 className="d-flex align-content-end pb-0">
                            <b style={{ color: "red", fontSize: "17.5px" }}>
                              {(
                                promo?.price -
                                (promo?.discount / 100) * promo?.price
                              ).toLocaleString("en-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </b>
                          </h5>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
