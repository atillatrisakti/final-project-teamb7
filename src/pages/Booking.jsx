import React, { useState } from "react";
import { Card, Form, Container, Row, Col } from "react-bootstrap";
import "../styles/Booking.css";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import info from "../assets/booking/info.png";
import ItemBooking from "../components/ItemBooking";

function Booking() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    passenger: {
      title: "",
      fullName: "",
      hasFamilyName: false,
      familyName: "",
      dateOfBirth: "",
      nationality: "",
      identification: "",
      issuingCountry: "",
      validUntil: "",
    },
  });

  const handleFormSubmit = () => {
    const isFormFilled =
      formData.fullName &&
      formData.phoneNumber &&
      formData.email &&
      formData.passenger.title &&
      formData.passenger.fullName &&
      formData.passenger.dateOfBirth &&
      formData.passenger.nationality &&
      formData.passenger.identification &&
      formData.passenger.issuingCountry &&
      formData.passenger.validUntil;

    if (isFormFilled) {
      console.log("Data has been filled, perform the next action");
      setFormSubmitted(true);
      toast.success("Data Anda Telah Berhasil Tersimpan");
    } else {
      console.log("Some data is missing");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handlePassengerInputChange = (e, passengerIndex) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      passenger: {
        ...prevData.passenger,
        [name]: newValue,
      },
    }));
  };

  const handlePaymentClick = () => {
    navigate("/payment");
  };

  // const [selectedSeats, setSelectedSeats] = useState([]);

  // const handleSeatClick = (row, seat) => {
  //   const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;

  //   setSelectedSeats((prevSelectedSeats) => {
  //     if (prevSelectedSeats.includes(seatId)) {
  //       return prevSelectedSeats.filter(
  //         (selectedSeat) => selectedSeat !== seatId
  //       );
  //     } else {
  //       const updatedSeats = [...prevSelectedSeats];

  //       const replaceIndex = prevSelectedSeats.findIndex((selectedSeat) => {
  //         const selectedRow = selectedSeat.charCodeAt(0) - 65;
  //         const selectedCol = parseInt(selectedSeat.slice(1)) - 1;

  //         return (
  //           (selectedRow === row && selectedCol === seat) ||
  //           (selectedCol === seat && selectedRow !== row)
  //         );
  //       });

  //       if (replaceIndex !== -1) {
  //         updatedSeats[replaceIndex] = seatId;
  //       } else {
  //         updatedSeats.push(seatId);
  //       }

  //       return updatedSeats;
  //     }
  //   });
  // };

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
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control
                        placeholder="Nama Lengkap"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        style={{ width: "454px", height: "40px" }}
                      />
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
                          checked={formData.hasFamilyName}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                    {formData.hasFamilyName && (
                      <Form.Group className="mb-3">
                        <Form.Label>Nama Keluarga</Form.Label>
                        <Form.Control
                          placeholder="Nama Keluarga"
                          name="familyName"
                          value={formData.familyName}
                          onChange={handleInputChange}
                          style={{ width: "454px", height: "40px" }}
                        />
                      </Form.Group>
                    )}
                    <Form.Group className="mb-3">
                      <Form.Label>Nomor Telepon</Form.Label>
                      <Form.Control
                        placeholder="Nomor Telepon"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        style={{ width: "454px", height: "40px" }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        placeholder="contoh: siti@gmail.com"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{ width: "454px", height: "40px" }}
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
          <Card className="card-2" style={{ borderRadius: "0" }}>
            <Card.Body>
              <Card.Title style={titlestyle}>Isi Data Penumpang</Card.Title>
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
                  Data Diri Penumpang 1 - Adult
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
                    <Form.Group className="mb-3" controlId="formGroupSelect">
                      <Form.Label>Title</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="title"
                        value={formData.passenger.title}
                        onChange={(e) => handlePassengerInputChange(e, 1)}
                      >
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control
                        placeholder="Nama Lengkap"
                        name="fullName"
                        value={formData.passenger.fullName}
                        onChange={(e) => handlePassengerInputChange(e, 1)}
                        style={{ width: "454px", height: "40px" }}
                      />
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
                          value={formData.passenger.hasFamilyName}
                          onChange={(e) => handlePassengerInputChange(e, 1)}
                        />
                      </Col>
                    </Row>
                    {formData.passenger.hasFamilyName && (
                      <Form.Group className="mb-3">
                        <Form.Label>Nama Keluarga</Form.Label>
                        <Form.Control
                          placeholder="Nama Keluarga"
                          name="familyName"
                          value={formData.passenger.familyName}
                          onChange={(e) => handlePassengerInputChange(e, 1)}
                          style={{ width: "454px", height: "40px" }}
                        />
                      </Form.Group>
                    )}
                    <Form.Group>
                      <Form.Label>Tanggal Lahir</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={formData.passenger.dateOfBirth}
                        onChange={(e) => handlePassengerInputChange(e, 1)}
                        style={{ width: "454px", height: "40px" }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Kewarganegaraan</Form.Label>
                      <Form.Control
                        placeholder="Kewarganegaraan"
                        name="nationality"
                        value={formData.passenger.nationality}
                        onChange={(e) => handlePassengerInputChange(e, 1)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>KTP/Paspor</Form.Label>
                      <Form.Control
                        placeholder="KTP/Paspor"
                        name="identification"
                        value={formData.passenger.identification}
                        onChange={(e) => handlePassengerInputChange(e, 1)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Negara Penerbit</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        name="issuingCountry"
                        value={formData.passenger.issuingCountry}
                        onChange={(e) => handlePassengerInputChange(e, 1)}
                      >
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Berlaku Sampai</Form.Label>
                      <Form.Control
                        type="date"
                        name="validUntil"
                        value={formData.passenger.validUntil}
                        onChange={(e) => handlePassengerInputChange(e, 1)}
                      />
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
                <div className="seat-container">
                  <div className="seat-row">
                    <div className="seat seat-label seat-label-top"></div>
                    {Array.from({ length: 6 }, (_, seat) => (
                      <div
                        key={`seat-top-${seat}`}
                        className="seat seat-label seat-label-top"
                      >
                        {String.fromCharCode(65 + seat)}
                      </div>
                    ))}
                  </div>
                  {Array.from({ length: 10 }, (_, row) => (
                    <div key={`row-${row}`} className="seat-row">
                      <div className="seat seat-label seat-label-side">
                        {row + 1}
                      </div>
                      {Array.from({ length: 6 }, (_, seat) => {
                        const seatId = `${String.fromCharCode(65 + seat)}${
                          row + 1
                        }`;
                        const isSeatSelected = selectedSeats.includes(seatId);

                        return (
                          <div
                            key={`seat-${row}-${seat}`}
                            className={`seat ${
                              isSeatSelected ? "selected" : ""
                            }`}
                            onClick={() => handleSeatClick(row, seat)}
                          >
                            {seatId}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </Card>
            </Card.Body>
          </Card> */}
          <button
            className="button-booking"
            size="lg"
            style={{
              backgroundColor: formSubmitted ? "#a3a3a3" : "#7126b5",
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
              <Row>
                <Col
                  md={6}
                  style={{
                    color: "#151515",
                    fontFamily: "Poppins",
                    fontSize: "16px",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>07.00</div>
                  <div>3 Maret 2023</div>
                </Col>
                <Col md={6}>
                  <div
                    style={{
                      color: "#A06ECE",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      textAlign: "right",
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
                }}
              >
                Soekarno Hatta - Terminal 1A Domestik
              </div>
              <Container>
                <div
                  className="info"
                  style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #D0D0D0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginRight: "8px" }}>
                      <img src={info} alt="info" fluid width="24" height="24" />
                    </div>
                    <div>
                      <h5 style={{ margin: 0 }}>Jet Air - Economy</h5>
                      <div style={{ marginBottom: "10px" }}>
                        <p style={{ margin: 0, fontSize: "14px" }}>JT - 203</p>
                      </div>
                      <p style={{ margin: 0 }}>Informasi:</p>
                      <p style={{ margin: 0, fontWeight: "normal" }}>
                        Baggage 20 kg
                      </p>
                      <p style={{ margin: 0, fontWeight: "normal" }}>
                        Cabin Baggage 7 kg
                      </p>
                      <p style={{ margin: 0, fontWeight: "normal" }}>
                        In Flight Entertainment
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
                    fontFamily: "Poppins",
                    fontSize: "16px",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>07.00</div>
                  <div>3 Maret 2023</div>
                </Col>
                <Col md={6}>
                  <div
                    style={{
                      color: "#A06ECE",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      textAlign: "right",
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
                }}
              >
                Soekarno Hatta - Terminal 1A Domestik
              </div>
              <Container
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
                    <div>IDR 9.550.000</div>
                    <div>IDR 0</div>
                    <div>IDR 300.000</div>
                  </Col>
                </Row>
              </Container>
              <Row>
                <Col md={6} style={{ fontWeight: "bold" }}>
                  Total
                </Col>
                <Col md={6} style={{ fontWeight: "bold", color: "#7126b5" }}>
                  IDR 9.850.000
                </Col>
              </Row>
              {formSubmitted && (
                <button
                  className="button-booking"
                  size="lg"
                  style={{
                    backgroundColor: "#7126b5",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    marginTop: "10px",
                    border: "none",
                  }}
                  onClick={handlePaymentClick}
                >
                  Continue to Payment
                </button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Booking;
