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
import { Icon } from "@iconify/react";
import DepartureAirports from "../components/search-flights-home/DepartureAirports";
import DestinationAirports from "../components/search-flights-home/DestinationAirports";
import Passengers from "../components/search-flights-home/Passengers";
import SeatClasses from "../components/search-flights-home/SeatClasses";
import DatePicker from "../components/search-flights-home/DatePicker";
import axios from "axios";
import { toast } from "react-toastify";
import banner from "../assets/banner.svg";

function Home() {
  const navigate = useNavigate();

  const [isPromo, setIsPromo] = useState(false);
  const [banner, setBanner] = useState([]);
  const [destinationPromos, setDestinationPromos] = useState([]);

  // DATE PICKER
  const [isDisabled, setIsDisabled] = useState(false);

  // BUTTON FLIP
  const [departureValue, setDepartureValue] = useState("");
  const [destinationValue, setDestinationValue] = useState("");
  const [idDeptAirport, setIdDeptAirport] = useState(0);
  const [idDestAirport, setIdDestAirport] = useState(0);

  const [filteredCategory, setFilteredCategory] = useState(null);

  useEffect(() => {
    async function getBanners() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/banners`
        );
        setBanner(response.data.data);
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
    const departureDate = form.start_date.value;
    const returnDate = form.end_date.value;
    const numberPassenger =
      form.number_passenger.attributes.getNamedItem("data-count").value;
    const seatClass = form.seat_class.attributes.getNamedItem("data-id").value;

    return navigate(
      `/search?departure_airport_id=${departure}&destination_airport_id=${destination}&departure_date=${departureDate}&return_date=${returnDate}&number_passenger=${numberPassenger}&class_id=${seatClass}&is_promo=${isPromo}`
    );
  };

  return (
    <>
      <Carousel
        controls={true}
        indicators={false}
        touch={true}
        // interval={5000}
        style={{
          position: "absolute",
          top: "5.2rem",
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

      <div style={{ width: "100%" }}>
        <Container>
          <Row style={{ marginTop: "19.3rem" }}>
            <Col>
              <Form onSubmit={onSubmit}>
                <Card
                  className="mx-auto mb-4 card-home"
                  style={{ width: "75rem" }}
                >
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
                      <DepartureAirports
                        selectedAirport={departureValue}
                        setSelectedAirport={setDepartureValue}
                        idDeptAirport={idDeptAirport}
                        setIdDeptAirport={setIdDeptAirport}
                      />
                      <Col
                        xs={2}
                        md={1}
                        className="d-flex justify-content-center"
                      >
                        <Icon
                          icon="icon-park-outline:play-cycle"
                          color="white"
                          className="icon-switch"
                          onClick={() => {
                            const deptValue = departureValue;
                            const destValue = destinationValue;
                            const idDept = idDeptAirport;
                            const idDest = idDestAirport;
                            setDepartureValue(destValue);
                            setDestinationValue(deptValue);
                            setIdDeptAirport(idDest);
                            setIdDestAirport(idDept);
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
                      <DestinationAirports
                        selectDestinatAirport={destinationValue}
                        setSelectDestinatAirport={setDestinationValue}
                        idDestAirport={idDestAirport}
                        setIdDestAirport={setIdDestAirport}
                      />
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
                        <DatePicker
                          isDisabled={isDisabled}
                          setIsDisabled={setIsDisabled}
                        />
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
          <Row style={{ marginLeft: "2.8%", marginRight: "2.8%" }}>
            <Col sm={10} className="my-1">
              <h5
                className="text-dark text-popular mt-3"
                style={{ textShadow: "2px 2px 8px #e3ecff" }}
              >
                <b>Pilih Destinasi Favoritmu!</b>
              </h5>
              <span>
                Yuk terbang ke berbagai destinasi pilihan dengan harga terbaik!
                Khusus dari Jakarta ya!🤗
              </span>
            </Col>
          </Row>
          <Row
            md="auto"
            style={{
              marginLeft: "2.8%",
              marginRight: "2.8%",
              marginTop: "0.5rem",
              marginBottom: "1.3rem",
            }}
            className="d-flex justify-content-center"
          >
            {destinationPromos &&
              destinationPromos.slice(4, 10).map((promo) => (
                <Col
                  sm="12"
                  md="6"
                  lg="4"
                  key={promo?.id}
                  className="mb-1 me-0 px-2"
                >
                  <Link
                    to={`/search?departure_airport_id=${
                      promo?.departure_airport_id
                    }&destination_airport_id=${
                      promo?.arrival_airport_id
                    }&departure_date=${new Date(
                      promo?.departure_date
                    ).toLocaleDateString("en-CA", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}&number_passenger=1&class_id=1&is_promo=${isPromo}`}
                    style={{ textDecoration: "none", borderColor: "black" }}
                  >
                    <Card
                      className="text-white mb-3 shadow"
                      style={{ borderRadius: "10px" }}
                    >
                      <Card.Img
                        src={promo?.arrival_city_image}
                        alt="destination"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "150px",
                          borderTopRightRadius: "10px",
                        }}
                      />
                      <Card.ImgOverlay>
                        <Card.Title>{promo?.arrival_city}</Card.Title>
                        <Card.Text>One of the best city in the world</Card.Text>
                      </Card.ImgOverlay>
                    </Card>
                  </Link>
                </Col>
              ))}
          </Row>

          <Row
            className="mt-2 mb-4"
            style={{ marginLeft: "2.8%", marginRight: "2.8%" }}
          >
            <Col sm={10} className="mb-3">
              <h5
                className="text-dark text-popular mt-3"
                style={{ textShadow: "2px 2px 8px #e3ecff" }}
              >
                <b>Pengen ke Luar Negeri? Nih promo buat kamu!</b>
              </h5>
              <span>
                Terbang ke berbagai destinasi Internasional, tapi takut mahal?
                Ssstt.. tenang aja, banyak promonya loh!
              </span>
            </Col>
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
                    to={`/search?departure_airport_id=${
                      promo?.departure_airport_id
                    }&destination_airport_id=${
                      promo?.arrival_airport_id
                    }&departure_date=${new Date(
                      promo?.departure_date
                    ).toLocaleDateString("en-CA", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}&number_passenger=1&class_id=1&is_promo=${!isPromo}`}
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
