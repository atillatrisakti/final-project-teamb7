import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Search.css";
import arrow from "../assets/search/fi_arrow-left.svg";
// import filter from "../assets/search/Prefix icon.svg";
import { Icon } from "@iconify/react";
import box from "../assets/search/fi_box.svg";
import love from "../assets/search/fi_heart.svg";
import dollar from "../assets/search/fi_dollar-sign.svg";
import rightarrow from "../assets/search/fi_chevron-right.svg";
import AccordionFlight from "../components/AccordionFlight";
import "../styles/Accordion.css";
import axios from "axios";
// import NoResult from "../components/NoResult";

function Search() {
  const [date, setDate] = useState("");
  // const [sort, setSort] = useState("Termurah");
  const params = useParams();
  // console.log(params.departure_date);

  const [flight, setFlight] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departureAirportCode, setDepartureAirportCode] = useState("");
  const [arrivalAirportCode, setArrivalAirportCode] = useState("");
  const [airplaneClass, setAirplaneClass] = useState("");
  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/flights?departure_airport_id=${params.departure_airport_id}&destination_airport_id=${params.destination_airport_id}&departure_date=${params.departure_date}&number_passenger=${params.number_passenger}&class_id=${params.class_id}`
        );
        // console.log(response.data);
        setFlight(response.data.data);
        setDepartureAirportCode(response.data.data[0].departure_airport_code);
        setArrivalAirportCode(response.data.data[0].arrival_airport_code);
        setAirplaneClass(response.data.data[0].airplane_class);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.message);
      }
    }
    // console.log("iniiiii", flight);
    fetchPost();
  }, [params]);

  return (
    <Container className="mt-3">
      <h4 className="text-pilih">Pilih Penerbangan</h4>

      <Container className="mt-4">
        <Row className="d-flex justify-content-center">
          <Col sm={9}>
            <div
              className="flight-desc"
              onClick={() => {}}
              style={{ cursor: "pointer" }}
            >
              <img src={arrow} alt="left-arrow" className="mb-1" />
              <span>
                {departureAirportCode} - {arrivalAirportCode} -{" "}
                {params?.number_passenger} Penumpang - {airplaneClass}
              </span>
            </div>
          </Col>
          <Col sm={2}>
            <button className="change-search">Ubah Pencarian</button>
          </Col>
        </Row>
        <Row className="my-4 d-flex align-items-center">
          {flight.map((item) => (
            <Col className="d-flex justify-content-center date-css">
              <Button
                onClick={() => {
                  setDate(
                    date === item?.departure_date ? "" : item?.departure_date
                  );
                }}
                style={{
                  backgroundColor:
                    item?.departure_date === date ? "#1b3260" : "white",
                  color: item?.departure_date === date ? "white" : "black",
                  border: "none",
                }}
              >
                <b>
                  {new Date(item?.departure_date).toLocaleDateString("id-ID", {
                    weekday: "long",
                  })}
                </b>
                <br />
                {new Date(item?.departure_date).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "numeric",
                  year: "numeric",
                })}
                {/* <hr /> */}
              </Button>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <button className="sort-btn">
              <Icon icon="fluent:arrow-sort-16-filled" color="#1b3260" />
              {/* <img src={filter} alt="filter" className="me-1 mb-1" /> */}
              Termurah
            </button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={4}>
            <div className="filter">
              <h5 className="mb-4">Filter</h5>
              <div
                className="transit"
                onClick={() => {}}
                style={{ cursor: "pointer" }}
              >
                <img src={box} alt="transit" className="me-2" />
                Transit
                <img
                  src={rightarrow}
                  alt="right-arrow"
                  style={{ float: "right" }}
                />
              </div>
              <hr />
              <div
                className="facility"
                onClick={() => {}}
                style={{ cursor: "pointer" }}
              >
                <img src={love} alt="facility" className="me-2" />
                Fasilitas
                <img
                  src={rightarrow}
                  alt="right-arrow"
                  style={{ float: "right" }}
                />
              </div>
              <hr />
              <div
                className="price"
                onClick={() => {}}
                style={{ cursor: "pointer" }}
              >
                <img src={dollar} alt="price" className="me-2" />
                Harga
                <img
                  src={rightarrow}
                  alt="right-arrow"
                  style={{ float: "right" }}
                />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="accordion mb-5">
              {/* {accordionData.length !== 0 ? (
                accordionData
                  .sort((a, b) => {
                    if (sort === "Termurah") {
                      return a.price - b.price;
                    } else if (sort === "Termahal") {
                      return b.price - a.price;
                    }
                  })
                  .map((item) => )
              ) : (
                <NoResult />
              )} */}
              <AccordionFlight />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Search;
