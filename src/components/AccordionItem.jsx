import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import arrowAccor from "../assets/accordion/Suffix.svg";
import arrow from "../assets/search/Arrow.svg";
import { IoIosArrowForward } from "react-icons/io";

const AccordionItem = (props) => {
  const navigate = useNavigate();
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
  }, []);

  const handleButtonPilih = () => {
    if (!props.departureFlightId) {
      return (
        <button
          style={{ float: "right" }}
          className="btn-pilih"
          onClick={() => {
            if (props.returnDate) {
              // console.log("else item_is = ", item?.id);
              // console.log("if endDate = ", endDate);
              // console.log("if departureDate = ", departureDate);
              // console.log("if departureFlightId = ", departureFlightId);

              window.location.href = `/search?departure_airport_id=${props.departureAirportId}&destination_airport_id=${props.destinationAirportId}&departure_date=${props.returnDate}&return_date=${props.returnDate}&number_passenger=${props.numberPassenger}&class_id=${props.seatClass}&is_promo=${props.isPromo}&departure_flight_id=${item?.id}`;
            } else {
              navigate(`/booking/${item?.id}/${props.numberPassenger}`);
            }
          }}
        >
          Pilih
        </button>
      );
    } else {
      // console.log("else item_is = ", item?.id);
      // console.log("else endDate = ", endDate);
      // console.log("else departureDate = ", departureDate);
      // console.log("else departureFlightId = ", departureFlightId);
      // console.log("else item_is = ", item?.id);
      // console.log("else endDate = ", endDate);
      // console.log("else departureDate = ", departureDate);
      // console.log("else departureFlightId = ", departureFlightId);
      return (
        <button
          style={{ float: "right" }}
          className="btn-pilih"
          onClick={() => {
            navigate(`/booking/${props.departureFlightId}/${props.numberPassenger}/${item?.id}/${props.returnDate}`);
          }}
        >
          Pilih
        </button>
      );
    }
  };
  // console.log(location.search);

  return (
    <>
      <div className="accordion-title" style={{ width: "100%" }} key={props.id}>
        <Card className="mt-2 card-flight">
          <Row>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <img src={item?.airplane_logo} alt="plane-logo" fluid width="35" className="ms-1" style={{ float: "left" }} />
                <p className="mt-1 ms-5">
                  {item?.airplane_name} - {item?.airplane_class}
                </p>
              </div>
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {item?.discount > 0 ? (
                  <span
                    className="discont-flight"
                    style={{
                      borderRadius: "30px",
                      padding: "4px",
                      paddingRight: "8px",
                      paddingLeft: "8px",
                      fontWeight: "bold",
                      background: "red",
                    }}
                  >
                    <b>{item?.discount + "% OFF"}</b>
                  </span>
                ) : null}
                <img
                  src={arrowAccor}
                  alt="arrowaccor"
                  fluid
                  width="30"
                  style={{ float: "right", cursor: "pointer" }}
                  className=""
                  onClick={(e) => {
                    // e.preventDefault();
                    // e.target.value();
                    setIsActive(!isActive);
                  }}
                />
              </div>
            </div>
          </Row>
          <Container>
            <div className="accordion-below">
              {/* left */}
              <div className="accordion-below-left gap-3">
                <div className="d-flex align-items-center">
                  <div className="ms-4 fw-bold font-title">
                    {new Date(item?.departure_date).toLocaleTimeString("id", {
                      timeZone: item?.departure_city_time_zone,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <br />
                    {item?.departure_airport_code}
                  </div>
                </div>
                <div className="">
                  <span className="d-flex justify-content-center font-count-time">
                    {Math.floor((new Date(item?.arrival_date).getTime() - new Date(item?.departure_date).getTime()) / (1000 * 60 * 60 * 24)) > 0 ? (
                      <span>
                        {Math.floor((new Date(item?.arrival_date).getTime() - new Date(item?.departure_date).getTime()) / (1000 * 60 * 60 * 24)) + "d "}
                        {Math.floor(((new Date(item?.arrival_date).getTime() - new Date(item?.departure_date).getTime()) / (1000 * 60 * 60)) % 24) + "h "}
                        {Math.floor(((new Date(item?.arrival_date).getTime() - new Date(item?.departure_date).getTime()) / (1000 * 60)) % 60) + "m"}
                      </span>
                    ) : (
                      <span>
                        {Math.floor(((new Date(item?.arrival_date).getTime() - new Date(item?.departure_date).getTime()) / (1000 * 60 * 60)) % 24) + "h "}
                        {Math.floor(((new Date(item?.arrival_date).getTime() - new Date(item?.departure_date).getTime()) / (1000 * 60)) % 60) + "m"}
                      </span>
                    )}
                  </span>
                  <div className="divider">
                    <IoIosArrowForward className="arrow-divider" />
                  </div>
                  <span className="d-flex justify-content-center font-count-time">Direct</span>
                </div>
                <div className="d-flex align-items-center font-title">
                  <div className="fw-bold">
                    {new Date(item?.arrival_date).toLocaleTimeString("id", {
                      timeZone: item?.arrival_city_time_zone,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <br />
                    {item?.arrival_airport_code}
                  </div>
                </div>
              </div>
              {/* right */}
              <div className=" gap-2 accordion-below-right">
                <div md="auto" className="d-flex align-items-center ps-0">
                  <Icon icon="icon-park-outline:baggage-delay" color="#1b3260" width="25" height="25" />
                </div>
                <div className="ms-1 pe-0">
                  <div className="d-flex justify-content-end fw-bold">
                    {item?.discount > 0 ? (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            fontSize: "13px",
                            color: "gray",
                            position: "absolute",
                          }}
                        >
                          {(item?.price).toLocaleString("en-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </span>
                        <h6 className="mt-3 mb-1">
                          <b>
                            {(item?.price - (item?.discount / 100) * item?.price).toLocaleString("en-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </b>
                        </h6>
                      </>
                    ) : (
                      <h6 className="mb-2 mt-1">
                        <b>
                          {(item?.price).toLocaleString("en-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </b>
                      </h6>
                    )}
                  </div>

                  {handleButtonPilih()}
                </div>
              </div>
                        
            </div>
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
                <div>
                  {new Date(item?.departure_date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
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
                      <p style={{ margin: 0, fontWeight: "normal" }} key={facil?.id}>
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
                  {new Date(item?.arrival_date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
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
