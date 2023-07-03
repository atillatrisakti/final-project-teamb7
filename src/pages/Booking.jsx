import React, { useState, useEffect } from "react";
import { Card, Form, Container, Row, Col } from "react-bootstrap";
import "../styles/Booking.css";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DetailBooking from "../components/booking-payment-history/DetailBooking";
import ItemBooking from "../components/booking-payment-history/ItemBooking";

function Booking() {
  //state customer
  const [name, setName] = useState("");
  const [family_name, setFamily_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title_id, setTitle_id] = useState("");
  // const [hasFamilyName, setHasFamilyName] = useState();
  const [passenger_family_name, setPassenger_family_name] = useState("");
  const [passenger_hasFamilyName, setPassenger_hasFamilyName] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  //state countries, titles, detailflight, flight_id, seats_id
  const [countries, setCountries] = useState([]);
  const [titles, setTitles] = useState([]);
  const [detailFlight, setDetailFlight] = useState([]);
  const [flight_id, setFlight_id] = useState();
  const [seats_id, setSeats_id] = useState();
  //params number_passengers
  const params = useParams();
  const number_passenger = params.number_passenger;
  //array passengers
  const passengerArray = Array.from({ length: number_passenger });
  const [passengers, setPassengers] = useState(
    Array.from({ length: number_passenger }).map(() => ({
      passenger_title_id: "",
      passenger_name: "",
      passenger_family_name: "",
      passenger_dob: null,
      passenger_nationality_id: "",
      passenger_identity_card: "",
      passenger_identity_card_publisher_id: "",
      passenger_identity_card_due_date: null,
    }))
  );
  // const [departure_airport_id, setDeparture_airport_code] = useState();
  // const [return_flight_id, setReturn_light_id] = useState();

  //hanlde passengers
  const handlePassengerChange = (value, index, field) => {
    if (index >= 0 && index < passengers.length) {
      const updatedPassengers = [...passengers];
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        [field]: value,
      };
      setPassengers(updatedPassengers);
    }
  };

  //switch passenger has family name
  const handleSwitchChange = () => {
    setPassenger_hasFamilyName(!passenger_hasFamilyName);
    if (!passenger_hasFamilyName) {
      setPassenger_family_name("");
    }
  };

  // //switch has family name
  // const handleSwitch = () => {
  //   setHasFamilyName(!hasFamilyName);
  //   if (!hasFamilyName) {
  //     setFamily_name("");
  //   }
  // };

  //format date yyyy-mm-dd
  const formatDate = (dateString) => {
    // console.log("dateString:", dateString);
    const date = new Date(dateString);
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //get countries
  useEffect(() => {
    const getcountries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API}/customer/countries`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;
        setCountries(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };
    getcountries();
  }, []);

  //get titles
  useEffect(() => {
    const getTitles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API}/customer/titles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        const data = response.data.data;
        setTitles(data);
        if (data.length > 0) {
          setTitle_id(data[0].id);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };
    getTitles();
  }, []);

  //post data
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    try {
      const passengerData = passengers.map((passenger) => ({
        flight_id,
        seat_id: seats_id,
        ...passenger,
      }));

      let data = JSON.stringify({
        customer_identity: {
          title_id,
          name,
          family_name,
          email,
          phone,
        },
        // departure_airport_id,
        // return_flight_id,
        passenger_identity: passengerData,
      });

      const token = localStorage.getItem("token");
      let config = {
        method: "post",
        url: `${process.env.REACT_APP_API}/customer/transactions`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
      await axios.request(config);

      setFormSubmitted(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  //get detail flight
  useEffect(() => {
    async function getDetailFlight() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/flights/${params.id}`
        );
        // console.log(response.data.data);
        setDetailFlight(response.data.data);
        setFlight_id(response.data.data[0].id);
        setSeats_id(response.data.data[0].seats[0].id);
      } catch (error) {
        console.log(error);
      }
    }
    getDetailFlight();
  }, [params]);

  //get data customer
  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API}/customer/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataCustomer = response.data.data;
        //  console.log(response.data.data)
        //  setUsers(data);
        const user = dataCustomer[0];
        setName(user.customer_name);
        setFamily_name(user.customer_family_name);
        setEmail(user.email);
        setPhone(user.phone);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };
    getUsers();
  }, []);

  return (
    <Container className="data">
      <Row>
        <Row style={{ marginBottom: "30px" }}>
          <Col md={12}>
            <ItemBooking />
          </Col>
        </Row>
        {/* ========== Data Pemesan ========== */}
        <Col md={6}>
          <Card className="card-1" style={{ borderRadius: "0" }}>
            <Card.Body>
              <Card.Title>Isi Data Pemesan</Card.Title>
              <Card
                className="pemesan"
                style={{ border: "none", boxShadow: "none" }}
              >
                <Card.Header
                  className="card-header"
                  style={{
                    backgroundColor: "#3c3c3c",
                    color: "#FFFFFF",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                >
                  Data Diri Pemesan
                  {formSubmitted && (
                    <FaCheckCircle
                      className="ml-2"
                      style={{
                        verticalAlign: "middle",
                        color: "#73CA5C",
                        marginLeft: "auto",
                      }}
                    />
                  )}
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-booking">
                        Nama Lengkap
                      </Form.Label>
                      <Form.Control
                        required
                        placeholder="Nama Lengkap"
                        name="name"
                        value={name}
                        readOnly
                        // onChange={(e) => setName(e.target.value)}
                        style={{ width: "454px", height: "40px" }}
                      />
                      {/* <Form.Control.Feedback type="invalid">
                        Please enter your full name.
                      </Form.Control.Feedback> */}
                    </Form.Group>
                    <Row>
                      <Col xs="auto">
                        <Form.Label className="form-label-booking">
                          Punya Nama Keluarga
                        </Form.Label>
                      </Col>
                      <Col className="text-end">
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          className="ml-3"
                          name="hasFamilyName"
                          // checked={hasFamilyName}
                          // onChange={handleSwitch}
                        />
                      </Col>
                    </Row>
                    {/* {hasFamilyName ? ( */}
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-booking">
                        Nama Keluarga
                      </Form.Label>
                      <Form.Control
                        required
                        placeholder="Nama Keluarga"
                        name="familyName"
                        value={family_name}
                        readOnly
                        // onChange={(e) => setFamily_name(e.target.value)}
                        style={{ width: "454px", height: "40px" }}
                      />
                      {/* <Form.Control.Feedback type="invalid">
                        Please enter a family name.
                      </Form.Control.Feedback> */}
                    </Form.Group>
                    {/* // ) : null} */}
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-booking">
                        Nomor Telepon
                      </Form.Label>
                      <Form.Control
                        required
                        placeholder="Nomor Telepon"
                        name="phone"
                        value={phone}
                        readOnly
                        // onChange={(e) => setPhone(e.target.value)}
                        pattern="[0-9]{9,12}"
                        style={{ width: "454px", height: "40px" }}
                      />
                      {/* <Form.Control.Feedback type="invalid">
                        {phone && (phone.length < 9 || phone.length > 12)
                          ? "Phone must be string between 9 and 12 digits"
                          : "Please enter a valid phone number."}
                      </Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label className="form-label-booking">
                        Email
                      </Form.Label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="contoh: siti@gmail.com"
                        name="email"
                        value={email}
                        readOnly
                        // onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "454px", height: "40px" }}
                      />
                      {/* <Form.Control.Feedback type="invalid">
                        Please enter a valid email address.
                      </Form.Control.Feedback> */}
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
          {/* ========== Data Penumpang ========== */}
          <Card className="card-2" style={{ borderRadius: "0" }}>
            <Card.Body>
              <Card.Title>Isi Data Penumpang</Card.Title>
              {passengerArray.map((passenger, index) => (
                <div key={index}>
                  <Card
                    className="pemesan"
                    style={{ border: "none", boxShadow: "none" }}
                  >
                    <Card.Header
                      className="card-header"
                      style={{
                        backgroundColor: "#3c3c3c",
                        color: "#FFFFFF",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    >
                      Data Diri Penumpang - {index + 1}
                      {formSubmitted && (
                        <FaCheckCircle
                          className="ml-2"
                          style={{
                            verticalAlign: "middle",
                            color: "#73CA5C",
                            marginLeft: "auto",
                          }}
                        />
                      )}
                    </Card.Header>
                    <Card.Body>
                      <Form noValidate validated={validated}>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupSelect"
                        >
                          <Form.Label className="form-label-booking">
                            Title
                          </Form.Label>
                          <Form.Select
                            required
                            aria-label="Select Title"
                            value={passengers[index]?.passenger_title_id || ""}
                            onChange={(e) =>
                              handlePassengerChange(
                                e.target.value,
                                index,
                                "passenger_title_id"
                              )
                            }
                          >
                            <option value="">Select Title</option>
                            {titles.map((title) => (
                              <option key={title.id} value={title.id}>
                                {title.name}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select a title.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="form-label-booking">
                            Nama Lengkap
                          </Form.Label>
                          <Form.Control
                            required
                            placeholder="Nama Lengkap"
                            name="fullName"
                            value={passengers[index]?.passenger_name}
                            onChange={(e) =>
                              handlePassengerChange(
                                e.target.value,
                                index,
                                "passenger_name"
                              )
                            }
                            style={{ width: "454px", height: "40px" }}
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter passenger full name.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Row>
                          <Col xs="auto">
                            <Form.Label className="form-label-booking">
                              Punya Nama Keluarga
                            </Form.Label>
                          </Col>
                          <Col className="text-end">
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              className="ml-3"
                              name="hasFamilyName"
                              checked={passenger_hasFamilyName}
                              onChange={handleSwitchChange}
                            />
                          </Col>
                        </Row>
                        {passenger_hasFamilyName ? (
                          <Form.Group className="mb-3">
                            <Form.Label className="form-label-booking">
                              Nama Keluarga
                            </Form.Label>
                            <Form.Control
                              placeholder="Nama Keluarga"
                              name="familyName"
                              value={passengers[index]?.passenger_family_name}
                              onChange={(e) =>
                                handlePassengerChange(
                                  e.target.value,
                                  index,
                                  "passenger_family_name"
                                )
                              }
                              style={{ width: "454px", height: "40px" }}
                            />
                          </Form.Group>
                        ) : null}
                        <Form.Group>
                          <Form.Label className="form-label-booking">
                            Tanggal Lahir
                          </Form.Label>
                          <div style={{ position: "relative", width: "100%" }}>
                            <DatePicker
                              required
                              className="custom-date"
                              selected={
                                passengers[index]?.passenger_dob
                                  ? new Date(passengers[index]?.passenger_dob)
                                  : null
                              }
                              onChange={(date) =>
                                handlePassengerChange(
                                  formatDate(date),
                                  index,
                                  "passenger_dob"
                                )
                              }
                              dateFormat="yyyy-MM-dd"
                              placeholderText="yyyy-mm-dd"
                            />
                            <div
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}
                            >
                              <FaCalendarAlt />
                            </div>
                          </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="form-label-booking">
                            Kewarganegaraan
                          </Form.Label>
                          <Form.Select
                            required
                            aria-label="Select Countries"
                            value={passengers[index]?.passenger_nationality_id}
                            onChange={(e) =>
                              handlePassengerChange(
                                e.target.value,
                                index,
                                "passenger_nationality_id"
                              )
                            }
                          >
                            <option value="">Select Countries</option>
                            {countries.map((country) => (
                              <option key={country.id} value={country.id}>
                                {country.name}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please enter passenger nationality.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="form-label-booking">
                            KTP/Paspor
                          </Form.Label>
                          <Form.Control
                            required
                            placeholder="KTP/Paspor"
                            name="identification"
                            value={passengers[index]?.passenger_identity_card}
                            onChange={(e) =>
                              handlePassengerChange(
                                e.target.value,
                                index,
                                "passenger_identity_card"
                              )
                            }
                            pattern=".{16}"
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid identification (16 characters).
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="form-label-booking">
                            Negara Penerbit
                          </Form.Label>
                          <Form.Select
                            required
                            aria-label="Select Countries"
                            value={
                              passengers[index]
                                ?.passenger_identity_card_publisher_id
                            }
                            onChange={(e) =>
                              handlePassengerChange(
                                e.target.value,
                                index,
                                "passenger_identity_card_publisher_id"
                              )
                            }
                          >
                            <option value="">Select Countries</option>
                            {countries.map((country) => (
                              <option key={country.id} value={country.id}>
                                {country.name}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please enter passenger identity card publisher.
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label className="form-label-booking">
                            Berlaku Sampai
                          </Form.Label>
                          <div style={{ position: "relative", width: "100%" }}>
                            <DatePicker
                              required
                              className="custom-date"
                              selected={
                                passengers[index]
                                  ?.passenger_identity_card_due_date
                                  ? new Date(
                                      passengers[
                                        index
                                      ]?.passenger_identity_card_due_date
                                    )
                                  : null
                              }
                              onChange={(date) =>
                                handlePassengerChange(
                                  formatDate(date),
                                  index,
                                  "passenger_identity_card_due_date"
                                )
                              }
                              dateFormat="yyyy-MM-dd"
                              placeholderText="yyyy-mm-dd"
                            />

                            <div
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                              }}
                            >
                              <FaCalendarAlt />
                            </div>
                          </div>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Card.Body>
          </Card>
          <button
            className="button-booking"
            size="lg"
            style={{
              backgroundColor: formSubmitted ? "#a3a3a3" : "#1B3260",
              color: "#FFFFFF",
              borderRadius: "10px",
              border: "none",
            }}
            onClick={handleFormSubmit}
            disabled={formSubmitted}
          >
            {formSubmitted ? "Submitted" : "Submit"}
          </button>
        </Col>
        {/* ========== Detail Penerbangan ========== */}
        <Col md={6}>
          <Card
            className="booking"
            style={{ border: "none", boxShadow: "none" }}
          >
            <Card.Header
              className="detail-booking"
              style={{ border: "none", boxShadow: "none" }}
            >
              Detail Penerbangan
            </Card.Header>
            <Card.Body>
              <DetailBooking />
              {formSubmitted && detailFlight && (
                <Link
                  to={`/payment/${detailFlight[0]?.id}/${params.number_passenger}`}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    className="btn-tiket"
                    size="lg"
                    style={{
                      backgroundColor: "#FF0000",
                      color: "#FFFFFF",
                      borderRadius: "10px",
                      marginTop: "10px",
                      border: "none",
                    }}
                  >
                    Lanjut Bayar
                  </button>
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Booking;
