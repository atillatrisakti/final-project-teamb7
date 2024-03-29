import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import arrow from "../assets/search/fi_arrow-left.svg";
import box from "../assets/search/fi_box.svg";
import love from "../assets/search/fi_heart.svg";
import dollar from "../assets/search/fi_dollar-sign.svg";
import rightarrow from "../assets/search/fi_chevron-right.svg";
import ModalSort from "../components/ModalSort";
import AccordionAll from "../components/AccordionAll";
import "../styles/Accordion.css";
import useWindowSize from "../hooks/useWindowSize";
import Accordion from "../components/Accordion";

function Search() {
  const size = useWindowSize();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // const [date, setDate] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");
  // const [buttonValue, setButtonValue] = useState(1);
  function getThisWeekDates(current) {
    const week = [];
    // Starting two days before selected departureDate
    current.setDate(current.getDate() - current.getDay());
    for (let i = 0; i < 8; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  }

  const [sortFlight, setSortFlight] = useState("Termurah");

  const [flight, setFlight] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departureAirportCode, setDepartureAirportCode] = useState("");
  const [arrivalAirportCode, setArrivalAirportCode] = useState("");
  const [airplaneClass, setAirplaneClass] = useState("");

  const departureAirportId = queryParams?.get("departure_airport_id");
  const destinationAirportId = queryParams?.get("destination_airport_id");
  const departureDate = queryParams?.get("departure_date");
  const returnDate = queryParams.get("return_date");
  const numberPassenger = queryParams.get("number_passenger");
  const seatClass = queryParams?.get("class_id");
  const isPromo = queryParams?.get("is_promo");
  const departureFlightId = queryParams.get("departure_flight_id");

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/flights?departure_airport_id=${departureAirportId}&destination_airport_id=${destinationAirportId}&departure_date=${departureDate}&number_passenger=${numberPassenger}&class_id=${seatClass}&is_promo=${isPromo}`
        );

        setFlight(response.data.data);
        setDepartureAirportCode(response.data.data[0].departure_airport_code);
        setArrivalAirportCode(response.data.data[0].arrival_airport_code);
        setAirplaneClass(response.data.data[0].airplane_class);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // toast.error(error?.message);
      }
    }
    fetchPost();
  }, [departureDate]);
  // console.log(departureDate);

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

        {/* DATE ON TOP */}
        {getThisWeekDates(new Date(departureDate)).length > 0 && size.width > 600 ? (
          <Row className="my-4 d-flex align-items-center bg-dark rounded-4 me-5">
            {getThisWeekDates(new Date(departureDate)).map((item) => (
              <Col md="auto" className="d-flex justify-content-center date-css mx-auto mb-2 my-1">
                <Button
                  variant="dark"
                  onClick={() => {
                    const dateTop = item.toLocaleDateString("en-CA", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    });

                    navigate(`/search?departure_airport_id=${departureAirportId}&destination_airport_id=${destinationAirportId}&departure_date=${dateTop}&number_passenger=${numberPassenger}&class_id=${seatClass}&is_promo=${isPromo}`);
                  }}
                  className="btn-date"
                  style={{
                    border: "none",
                  }}
                >
                  <b>
                    {item?.toLocaleDateString("id-ID", {
                      weekday: "long",
                    })}
                  </b>
                  <br />
                  {item.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "numeric",
                    year: "numeric",
                  })}
                </Button>
              </Col>
            ))}
          </Row>
        ) : (
          <>
            <Row className="my-4 d-flex align-items-center bg-dark rounded-4">
              {getThisWeekDates(new Date(departureDate))
                .slice(0, 3)
                .map((item) => (
                  <Col xs={3} md="auto" className="d-flex justify-content-center date-css mx-auto mb-2 my-1">
                    <Button
                      variant="dark"
                      onClick={(e) => {
                        const dateTop = item.toLocaleDateString("en-CA", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        });

                        navigate(`/search?departure_airport_id=${departureAirportId}&destination_airport_id=${destinationAirportId}&departure_date=${dateTop}&number_passenger=${numberPassenger}&class_id=${seatClass}&is_promo=${isPromo}`);
                      }}
                      className="btn-date"
                      style={{
                        border: "none",
                      }}
                    >
                      <b>
                        {item?.toLocaleDateString("id-ID", {
                          weekday: "long",
                        })}
                      </b>
                      <br />
                      {item.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </Button>
                  </Col>
                ))}
            </Row>
          </>
        )}
        <Row>
          <Col>
            <ModalSort sortFlight={sortFlight} setSortFlight={setSortFlight} />
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

          <div className="col-12 col-md-6 w-full mb-5">
            <AccordionAll
              sortFlight={sortFlight}
              loading={loading}
              flight={flight}
              departureAirportId={departureAirportId}
              destinationAirportId={destinationAirportId}
              departureDate={departureDate}
              returnDate={returnDate}
              numberPassenger={numberPassenger}
              seatClass={seatClass}
              isPromo={isPromo}
              departureFlightId={departureFlightId}
            />
          </div>
        </Row>
      </Container>
    </Container>
  );
}

export default Search;
