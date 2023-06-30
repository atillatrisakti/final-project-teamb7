import React, { useState, useEffect } from "react";
import { Card, Form, Container, Row, Col } from "react-bootstrap";
import "../styles/Booking.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import ItemBooking from "../components/ItemBooking";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
  const [name, setName] = useState("");
  const [family_name, setFamily_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hasFamilyName, setHasFamilyName] = useState(false);
  const [passenger_title_id, setPassenger_title_id] = useState("");
  const [passenger_name, setPassenger_name] = useState("");
  const [passenger_family_name, setPassenger_family_name] = useState("");
  const [passenger_dob, setPassenger_dob] = useState("");
  const [passenger_nationality_id, setPassenger_nationality_id] = useState("");
  const [passenger_identity_card, setPassenger_identity_card] = useState("");
  const [passenger_identity_card_publisher_id, setPassenger_identity_card_publisher_id] = useState();
  const [passenger_identity_card_due_date, setPassenger_identity_card_due_date] = useState("");
  // const [passenger_type, setPassenger_type] = useState("")
  const [passenger_hasFamilyName, setPassenger_hasFamilyName] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [countries, setCountries] = useState([]);
  const [titles, setTitles] = useState([]);
  const [detailFlight, setDetailFlight] = useState([]);
  // const [flight_id, setFlight_id] = useState();
  const params = useParams();
  const [facilities, setFacilities] = useState([]);

  //switch passenger has family name
  const handleSwitchChange = () => {
    setPassenger_hasFamilyName(!passenger_hasFamilyName);
    if (!passenger_hasFamilyName) {
      setPassenger_family_name("");
    }
  };

  //switch has family name
  const handleSwitch = () => {
    setHasFamilyName(!hasFamilyName);
    if (!hasFamilyName) {
      setFamily_name("");
    }
  };

  //format date yyyy-mm-dd
  const formatDate = (dateString) => {
    // console.log("dateString:", dateString);
    const date = new Date(dateString);
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const totalPrice = detailFlight[0]?.price + detailFlight[0]?.tax;

  //get countries
  useEffect(() => {
    const getcountries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_API}/customer/countries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        const response = await axios.get(`https://flight-booking-api-development.up.railway.app/api/customer/titles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        setTitles(data);
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
      let data = JSON.stringify({
        customer_identity: {
          title_id: "2",
          name,
          family_name,
          email,
          phone,
        },
        passenger_identity: [
          {
            flight_id: "1",
            seat_id: "1",
            passenger_title_id: Number(passenger_title_id),
            passenger_name,
            passenger_family_name,
            passenger_dob,
            passenger_nationality_id,
            passenger_identity_card,
            passenger_identity_card_publisher_id,
            passenger_identity_card_due_date,
            // passenger_type,
          },
        ],
      });

      const token = localStorage.getItem("token");
      let config = {
        method: "post",
        url: "https://flight-booking-api-development.up.railway.app/api/customer/transactions",
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const numberPassenger = searchParams.get("number_passenger");

  //  useEffect(() => {
  //    // Use the numberPassenger value in your logic here
  //    console.log("Number of passengers:", numberPassenger);
  //  }, [numberPassenger]);
  // const numberPassenger = params.number_passenger;
  console.log(numberPassenger);

  //get detail flight
  useEffect(() => {
    async function getDetailFlight() {
      try {
        const response = await axios.get(`https://flight-booking-api-development.up.railway.app/api/web/flights/${params.id}`);
        setDetailFlight(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDetailFlight();
  }, [params]);

  useEffect(() => {
    async function getFacilities() {
      try {
        const response = await axios.get(`https://flight-booking-api-development.up.railway.app/api/web/facilities`);
        setFacilities(response.data.data);
      } catch (error) {
        toast.error(error?.message);
      }
    }
    getFacilities();
    // console.log(flightFacilities[0].name);
  }, []);

  const titlestyle = {
    width: "178px",
    height: "30px",
    left: "16px",
    top: "16px",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: "20px",
    lineHeight: "30px",
    color: "#000000",
  };

  return (
    <Container className="data">
      <Row>
        <Row style={{ marginBottom: "30px" }}>
          <Col md={12}>
            <ItemBooking />
          </Col>
        </Row>
        <Col md={6}>
          <Card className="card-1" style={{ borderRadius: "0" }}>
            <Card.Body>
              <Card.Title style={titlestyle}>Isi Data Pemesan</Card.Title>
              <Card className="pemesan" style={{ border: "none", boxShadow: "none" }}>
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
                  <Form noValidate validated={validated}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-booking">Nama Lengkap</Form.Label>
                      <Form.Control required placeholder="Nama Lengkap" name="name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "454px", height: "40px" }} />
                      <Form.Control.Feedback type="invalid">Please enter your full name.</Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                      <Col xs="auto">
                        <Form.Label className="form-label-booking">Punya Nama Keluarga</Form.Label>
                      </Col>
                      <Col className="text-end">
                        <Form.Check type="switch" id="custom-switch" className="ml-3" name="hasFamilyName" checked={hasFamilyName} onChange={handleSwitch} />
                      </Col>
                    </Row>
                    {hasFamilyName ? (
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label-booking">Nama Keluarga</Form.Label>
                        <Form.Control required placeholder="Nama Keluarga" name="familyName" value={family_name} onChange={(e) => setFamily_name(e.target.value)} style={{ width: "454px", height: "40px" }} />
                        <Form.Control.Feedback type="invalid">Please enter a family name.</Form.Control.Feedback>
                      </Form.Group>
                    ) : null}
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-booking">Nomor Telepon</Form.Label>
                      <Form.Control required placeholder="Nomor Telepon" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="[0-9]{9,12}" style={{ width: "454px", height: "40px" }} />
                      <Form.Control.Feedback type="invalid">{phone && (phone.length < 9 || phone.length > 12) ? "Phone must be string between 9 and 12 digits" : "Please enter a valid phone number."}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label className="form-label-booking">Email</Form.Label>
                      <Form.Control required type="email" placeholder="contoh: siti@gmail.com" name="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "454px", height: "40px" }} />
                      <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
          <Card className="card-2" style={{ borderRadius: "0" }}>
            <Card.Body>
              <Card.Title style={titlestyle}>Isi Data Penumpang</Card.Title>
              <Card className="pemesan" style={{ border: "none", boxShadow: "none" }}>
                <Card.Header
                  className="card-header"
                  style={{
                    backgroundColor: "#3c3c3c",
                    color: "#FFFFFF",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                >
                  Data Diri Penumpang - Adult
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
                    <Form.Group className="mb-3" controlId="formGroupSelect">
                      <Form.Label className="form-label-booking">Title</Form.Label>
                      <Form.Select required aria-label="Select Title" value={passenger_title_id} onChange={(e) => setPassenger_title_id(e.target.value)}>
                        <option value="">Select Title</option>
                        {titles.map((title) => (
                          <option key={title.id} value={title.id}>
                            {title.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">Please select a title.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-booking">Nama Lengkap</Form.Label>
                      <Form.Control required placeholder="Nama Lengkap" name="fullName" value={passenger_name} onChange={(e) => setPassenger_name(e.target.value)} style={{ width: "454px", height: "40px" }} />
                      <Form.Control.Feedback type="invalid">Please enter passenger full name.</Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                      <Col xs="auto">
                        <Form.Label className="form-label-booking">Punya Nama Keluarga</Form.Label>
                      </Col>
                      <Col className="text-end">
                        <Form.Check type="switch" id="custom-switch" className="ml-3" name="hasFamilyName" checked={passenger_hasFamilyName} onChange={handleSwitchChange} />
                      </Col>
                    </Row>
                    {passenger_hasFamilyName ? (
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label-booking">Nama Keluarga</Form.Label>
                        <Form.Control placeholder="Nama Keluarga" name="familyName" value={passenger_family_name} onChange={(e) => setPassenger_family_name(e.target.value)} style={{ width: "454px", height: "40px" }} />
                      </Form.Group>
                    ) : null}
                    <Form.Group>
                      <Form.Label className="form-label-booking">Tanggal Lahir</Form.Label>
                      <div style={{ position: "relative", width: "100%" }}>
                        <DatePicker required className="custom-date" selected={passenger_dob ? new Date(passenger_dob) : null} onChange={(date) => setPassenger_dob(formatDate(date))} dateFormat="yyyy-MM-dd" placeholderText="yyyy-mm-dd" />
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
                      <Form.Label className="form-label-booking">Kewarganegaraan</Form.Label>
                      <Form.Select required aria-label="Select Countries" value={passenger_nationality_id} onChange={(e) => setPassenger_nationality_id(e.target.value)}>
                        <option value="">Select Countries</option>
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">Please enter passenger nationality.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-booking">KTP/Paspor</Form.Label>
                      <Form.Control required placeholder="KTP/Paspor" name="identification" value={passenger_identity_card} onChange={(e) => setPassenger_identity_card(e.target.value)} pattern=".{16}" />
                      <Form.Control.Feedback type="invalid">Please enter a valid identification (16 characters).</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-booking">Negara Penerbit</Form.Label>
                      <Form.Select required aria-label="Select Countries" value={passenger_identity_card_publisher_id} onChange={(e) => setPassenger_identity_card_publisher_id(e.target.value)}>
                        <option value="">Select Countries</option>
                        {countries.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">Please enter passenger identity card publisher.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="form-label-booking">Berlaku Sampai</Form.Label>
                      <div style={{ position: "relative", width: "100%" }}>
                        <DatePicker
                          required
                          className="custom-date"
                          selected={passenger_identity_card_due_date ? new Date(passenger_identity_card_due_date) : null}
                          onChange={(date) => setPassenger_identity_card_due_date(formatDate(date))}
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
            </Card.Body>
          </Card>
          {/* <Card className="card-3" style={{ borderRadius: "0" }}>
            <Card.Body>
              <Card.Title style={titlestyle}>Pilih Kursi</Card.Title>
              <Card
                className="pemesan"
                style={{ border: "none", boxShadow: "none" }}
              >
                <Card.Header
                  className="card-header"
                  style={{
                    backgroundColor: "#3c3c3c",
                    color: "#FFFFFF",
                    borderRadius: "2px",
                  }}
                >
                  Economy - 64 Seats Avaliable
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
              </Card>
            </Card.Body>
          </Card> */}
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
          <Card className="booking" style={{ border: "none", boxShadow: "none" }}>
            <Card.Header className="detail-booking" style={{ border: "none", boxShadow: "none" }}>
              Detail Penerbangan
            </Card.Header>
            <Card.Body>
              <Row>
                <Col
                  md={6}
                  style={{
                    color: "#151515",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>
                    {new Date(detailFlight[0]?.departure_date).toLocaleTimeString("id", {
                      timeZone: detailFlight[0]?.departure_city_time_zone,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div>
                    {new Date(detailFlight[0]?.departure_date).toLocaleDateString("en-GB", {
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
                {detailFlight[0]?.departure_airport}
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
                      <img src={detailFlight[0]?.airplane_logo} alt="info" fluid width="24" height="24" />
                    </div>
                    <div>
                      <h5
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {detailFlight[0]?.airplane_name} -{detailFlight[0]?.airplane_class}
                      </h5>
                      <div style={{ marginBottom: "10px" }}>
                        <p style={{ margin: 0, fontSize: "14px" }}>{detailFlight[0]?.airplane_code}</p>
                      </div>
                      <p style={{ margin: 0 }}>Informasi:</p>
                      <p style={{ margin: 0, fontWeight: "normal" }}>
                        {facilities.map((facility) => (
                          <p style={{ margin: 0, fontWeight: "normal" }}>{facility.name}</p>
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
                    {new Date(detailFlight[0]?.arrival_date).toLocaleTimeString("id", {
                      timeZone: detailFlight[0]?.arrival_city_time_zone,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div>
                    {new Date(detailFlight[0]?.arrival_date).toLocaleDateString("en-GB", {
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
                {detailFlight[0]?.arrival_airport}
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
                    <div>2 Adult</div>
                    <div>1 Baby</div>
                    <div>Tax</div>
                  </Col>
                  <Col>
                    <div>IDR {detailFlight[0]?.price}</div>
                    <div>IDR 0</div>
                    <div>IDR {detailFlight[0]?.tax}</div>
                  </Col>
                </Row>
              </Container>
              <Row>
                <Col md={6} style={{ fontWeight: "bold" }}>
                  Total
                </Col>
                <Col md={6} style={{ fontWeight: "bold", color: "#315bb0" }}>
                  IDR {totalPrice}
                </Col>
              </Row>
              {formSubmitted && detailFlight && (
                <Link to={`/payment/${detailFlight[0]?.id}`} style={{ textDecoration: "none" }}>
                  <button
                    className="button-booking"
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
