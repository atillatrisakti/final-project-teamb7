import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function DetailBooking() {
  const [detailDepartureFlight, setDetailDepartureFlight] = useState([]);
  const [detailReturnFlight, setDetailReturnFlight] = useState([]);
  const [depature_id, setDeparture_id] = useState();
  const [return_id, setReturn_id] = useState(); 
  const [seats_id, setSeats_id] = useState();
  const [facilities, setFacilities] = useState([]);
  const params = useParams();
  const number_passenger = params.number_passenger;

  //count discount & price
  const discountDeparturePrice =
    number_passenger *
    (detailDepartureFlight[0]?.price -
      detailDepartureFlight[0]?.price *
        (detailDepartureFlight[0]?.discount / 100));

  let totalPrice =
    discountDeparturePrice +
    discountDeparturePrice * (detailDepartureFlight[0]?.tax / 100);

  if (params.return_id) {
    const discountReturnPrice =
      number_passenger *
      (detailReturnFlight[0]?.price -
        detailReturnFlight[0]?.price * (detailReturnFlight[0]?.discount / 100));

    totalPrice +=
      discountReturnPrice +
      discountReturnPrice * (detailReturnFlight[0]?.tax / 100);
  }

  //get detail flight
  useEffect(() => {
    async function getDetailFlight() {
      try {
        const departureFlight = await axios.get(
          `${process.env.REACT_APP_API}/web/flights/${params.departure_id}`
        );

        setDetailDepartureFlight(departureFlight.data.data);
        setDeparture_id(departureFlight.data.data[0].id);
        setSeats_id(departureFlight.data.data[0].seats[0].id);

        if (params.return_id) {
          const returnFlight = await axios.get(
            `${process.env.REACT_APP_API}/web/flights/${params.return_id}`
          );
          const returnDate = await axios.get(
            `${process.env.REACT_APP_API}/web/flights/${params.return_date}`
          );
          // console.log(params.return_date)
          setDetailReturnFlight(returnFlight.data.data);
          setReturn_id(returnFlight.data.data[0].id);
          setSeats_id(returnFlight.data.data[0].seats[0].id);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    }
    getDetailFlight();
  }, [params]);

  //get facilities
  useEffect(() => {
    async function getFacilities() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/facilities`
        );
        setFacilities(response.data.data);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    getFacilities();
  }, []);

  return (
    <>
      {/* ========== Detail Penerbangan Pergi ========== */}
      <h5 style={{ fontWeight: "bold", color: "#315bb0" }}>
        Detail Penerbangan Pergi
      </h5>
      <Row style={{ marginTop: "20px" }}>
        <Col
          md={6}
          style={{
            color: "#151515",
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            {new Date(
              detailDepartureFlight[0]?.departure_date
            ).toLocaleTimeString("id", {
              timeZone: detailDepartureFlight[0]?.departure_city_time_zone,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div>
            {new Date(
              detailDepartureFlight[0]?.departure_date
            ).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </Col>
        <Col md={6}>
          <div
            style={{
              color: "#315bb0",
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            Keberangkatan
          </div>
        </Col>
      </Row>
      <div
        style={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "1px solid #D0D0D0",
          fontWeight: "bold",
        }}
      >
        {detailDepartureFlight[0]?.departure_airport}
      </div>
      <Container className="mt-2">
        <div
          className="info"
          style={{
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "1px solid #D0D0D0",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "8px", marginBottom: "20px" }}>
              <img
                src={detailDepartureFlight[0]?.airplane_logo}
                alt="info"
                fluid
                width="24"
                height="24"
              />
            </div>
            <div>
              <h5
                style={{
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {detailDepartureFlight[0]?.airplane_name} -
                {detailDepartureFlight[0]?.airplane_class}
              </h5>
              <div style={{ marginBottom: "10px" }}>
                <p style={{ margin: 0, fontSize: "14px" }}>
                  {detailDepartureFlight[0]?.airplane_code}
                </p>
              </div>
              <p style={{ margin: 0 }}>Informasi:</p>
              <p style={{ margin: 0, fontWeight: "normal" }}>
                {facilities.map((facility) => (
                  <p style={{ margin: 0, fontWeight: "normal" }}>
                    {facility.name}
                  </p>
                ))}
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Row>
        <Col
          md={6}
          style={{
            color: "#151515",
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            {new Date(
              detailDepartureFlight[0]?.arrival_date
            ).toLocaleTimeString("id", {
              timeZone: detailDepartureFlight[0]?.arrival_city_time_zone,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div>
            {new Date(
              detailDepartureFlight[0]?.arrival_date
            ).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </Col>
        <Col md={6}>
          <div
            style={{
              color: "#315bb0",
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            Kedatangan
          </div>
        </Col>
      </Row>
      <div
        style={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "1px solid #D0D0D0",
          fontWeight: "bold",
        }}
      >
        {detailDepartureFlight[0]?.arrival_airport}
      </div>
      <Container
        className="my-2"
        style={{
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          borderBottom: "1px solid #D0D0D0",
          marginRight: "8px",
        }}
      >
        <div style={{ fontWeight: "bold" }}>Rincian Harga</div>
        <Row>
          <Col md={6}>
            <div>{number_passenger} Penumpang</div>
          </Col>
          <Col>
            <div>
              {(
                number_passenger *
                (detailDepartureFlight[0]?.price -
                  detailDepartureFlight[0]?.price *
                    (detailDepartureFlight[0]?.discount / 100))
              ).toLocaleString("en-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div>Tax</div>
          </Col>
          <Col>
            <div>{detailDepartureFlight[0]?.tax.toFixed(0) + "%"}</div>
          </Col>
        </Row>
      </Container>

      {/* ========== Detail Penerbangan Pulang ========== */}
      {params.return_id && (
        <>
          <h5
            style={{ marginTop: "50px", fontWeight: "bold", color: "#315bb0" }}
          >
            Detail Penerbangan Pulang
          </h5>
          <Row style={{ marginTop: "20px" }}>
            <Col
              md={6}
              style={{
                color: "#151515",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {new Date(
                  detailReturnFlight[0]?.departure_date
                ).toLocaleTimeString("id", {
                  timeZone: detailReturnFlight[0]?.departure_city_time_zone,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>
                {new Date(params.return_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </Col>
            <Col md={6}>
              <div
                style={{
                  color: "#315bb0",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                Keberangkatan
              </div>
            </Col>
          </Row>
          <div
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "1px solid #D0D0D0",
              fontWeight: "bold",
            }}
          >
            {detailReturnFlight[0]?.arrival_airport}
          </div>
          <Container className="mt-2">
            <div
              className="info"
              style={{
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "1px solid #D0D0D0",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "8px", marginBottom: "20px" }}>
                  <img
                    src={detailReturnFlight[0]?.airplane_logo}
                    alt="info"
                    fluid
                    width="24"
                    height="24"
                  />
                </div>
                <div>
                  <h5
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {detailReturnFlight[0]?.airplane_name} -
                    {detailReturnFlight[0]?.airplane_class}
                  </h5>
                  <div style={{ marginBottom: "10px" }}>
                    <p style={{ margin: 0, fontSize: "14px" }}>
                      {detailReturnFlight[0]?.airplane_code}
                    </p>
                  </div>
                  <p style={{ margin: 0 }}>Informasi:</p>
                  <p style={{ margin: 0, fontWeight: "normal" }}>
                    {facilities.map((facility) => (
                      <p style={{ margin: 0, fontWeight: "normal" }}>
                        {facility.name}
                      </p>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </Container>
          <Row>
            <Col
              md={6}
              style={{
                color: "#151515",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {new Date(
                  detailReturnFlight[0]?.arrival_date
                ).toLocaleTimeString("id", {
                  timeZone: detailReturnFlight[0]?.arrival_city_time_zone,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div>
                {new Date(params.return_date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </Col>
            <Col md={6}>
              <div
                style={{
                  color: "#315bb0",
                  textAlign: "right",
                  fontWeight: "bold",
                }}
              >
                Kedatangan
              </div>
            </Col>
          </Row>
          <div
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "1px solid #D0D0D0",
              fontWeight: "bold",
            }}
          >
            {detailReturnFlight[0]?.departure_airport}
          </div>
          <Container
            className="my-2"
            style={{
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: "1px solid #D0D0D0",
              marginRight: "8px",
            }}
          >
            <div style={{ fontWeight: "bold" }}>Rincian Harga</div>
            <Row>
              <Col md={6}>
                <div>{number_passenger} Penumpang</div>
                {/* <div>1 Baby</div> */}
              </Col>
              <Col>
                <div>
                  {(
                    number_passenger *
                    (detailReturnFlight[0]?.price -
                      detailReturnFlight[0]?.price *
                        (detailReturnFlight[0]?.discount / 100))
                  ).toLocaleString("en-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div>Tax</div>
              </Col>
              <Col>
                <div>{detailReturnFlight[0]?.tax.toFixed(0) + "%"}</div>
              </Col>
            </Row>
          </Container>
        </>
      )}
      <Row>
        <Col md={6} style={{ fontWeight: "bold" }}>
          Total
        </Col>
        <Col md={6} style={{ fontWeight: "bold", color: "#315bb0" }}>
          {totalPrice.toLocaleString("en-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </Col>
      </Row>
    </>
  );
}

export default DetailBooking;
