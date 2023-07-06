import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Search.css";
import arrow from "../assets/search/fi_arrow-left.svg";
// import filter from "../assets/search/Prefix icon.svg";

import box from "../assets/search/fi_box.svg";
import love from "../assets/search/fi_heart.svg";
import dollar from "../assets/search/fi_dollar-sign.svg";
import rightarrow from "../assets/search/fi_chevron-right.svg";
import Accordion from "../components/Accordion";
import ModalSort from "../components/ModalSort";
import "../styles/Accordion.css";
import axios from "axios";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // console.log(queryParams.get("departure_airport_id"));
  // const params = queryParams.toString();

  const [date, setDate] = useState("");

  const [sort, setSort] = useState("Termurah");

  const [flight, setFlight] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departureAirportCode, setDepartureAirportCode] = useState("");
  const [arrivalAirportCode, setArrivalAirportCode] = useState("");
  const [airplaneClass, setAirplaneClass] = useState("");
  const [departureDate1, setDepartureDate1] = useState("");

  const departureAirportId = queryParams?.get("departure_airport_id");
  const destinationAirportId = queryParams?.get("destination_airport_id");
  const departureDate = queryParams?.get("departure_date");
  const endDate = queryParams.get("end_date");
  const numberPassenger = queryParams.get("number_passenger");
  const seatClass = queryParams?.get("class_id");
  const isPromo = queryParams?.get("is_promo");

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        // console.log("endDate = ", endDate);
        // console.log("departureDate = ", departureDate);
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/flights?departure_airport_id=${departureAirportId}&destination_airport_id=${destinationAirportId}&departure_date=${departureDate}&number_passenger=${numberPassenger}&class_id=${seatClass}&is_promo=${isPromo}}`
        );
        // console.log(response.data.data);

        setFlight(response.data.data);
        setDepartureAirportCode(response.data.data[0].departure_airport_code);
        setArrivalAirportCode(response.data.data[0].arrival_airport_code);
        setAirplaneClass(response.data.data[0].airplane_class);
        setDepartureDate1(response.data.data[0].departure_date);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // toast.error(error?.message);
        console.log(error);
      }
    }
    fetchPost();
  }, []);

  return (
    <Container className="mt-3">
      <h4 className="text-pilih">Pilih Penerbangan</h4>

      <Container className="mt-4">
        <Row className="d-flex justify-content-center">
          <Col md={9} xs={12} lg={9}>
            <div className="flight-desc" onClick={() => {}} style={{ cursor: "pointer" }}>
              <Link to={"/"}>
                <img src={arrow} alt="left-arrow" className="mb-1" />
              </Link>
              <span>
                {departureAirportCode} - {arrivalAirportCode} - {numberPassenger} Penumpang - {airplaneClass}
              </span>
            </div>
          </Col>
          <Col md={2} xs={12} lg={3}>
            <Link to={"/"}>
              <button className="change-search">Ubah Pencarian</button>
            </Link>
          </Col>
        </Row>
        <Row className="my-4 d-flex align-items-center">
          <Col className="d-flex justify-content-center date-css">
            <Button
              onClick={() => {
                setDate(date === departureDate ? "" : departureDate);
              }}
              style={{
                backgroundColor: departureDate === date ? "#1b3260" : "white",
                color: departureDate === date ? "white" : "black",
                border: "none",
              }}
            >
              <b>
                {new Date(departureDate).toLocaleDateString("id-ID", {
                  weekday: "long",
                })}
              </b>
              <br />
              {new Date(departureDate).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "numeric",
                year: "numeric",
              })}
              {/* <hr /> */}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <ModalSort sort={sort} setSort={setSort} />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm={12} md={4}>
            <div className="filter">
              <h5 className="mb-4">Filter</h5>
              <div className="transit" onClick={() => {}} style={{ cursor: "pointer" }}>
                <img src={box} alt="transit" className="me-2" />
                Transit
                <img src={rightarrow} alt="right-arrow" style={{ float: "right" }} />
              </div>
              <hr />
              <div className="facility" onClick={() => {}} style={{ cursor: "pointer" }}>
                <img src={love} alt="facility" className="me-2" />
                Fasilitas
                <img src={rightarrow} alt="right-arrow" style={{ float: "right" }} />
              </div>
              <hr />
              <div className="price" onClick={() => {}} style={{ cursor: "pointer" }}>
                <img src={dollar} alt="price" className="me-2" />
                Harga
                <img src={rightarrow} alt="right-arrow" style={{ float: "right" }} />
              </div>
            </div>
          </Col>
          {/* <Col sm={12} md={6}> */}
          <div className="col-12 col-md-6 w-full mb-5">
            <Accordion
              sort={sort}
              // departureAirportId={departureAirportId}
              // destinationAirportId={destinationAirportId}
              // departureDate={departureDate}
              // numberPassenger={numberPassenger}
              // seatClass={seatClass}
              // isPromo={isPromo}
            />
          </div>
          {/* </Col> */}
        </Row>
      </Container>
    </Container>
  );
}

export default Search;
