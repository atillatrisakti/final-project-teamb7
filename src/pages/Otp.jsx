import React, { useState } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import arrow from "../assets/fi_arrow-left.svg";
import logo from "../assets/navbar/logo-name.svg";
import OTPInput from "react-otp-input";
import { Link, useLocation } from "react-router-dom";
import "../styles/Otp.css";
import axios from "axios";
import { toast } from "react-toastify";

function Otp() {
  // const [email, setEmail] = useState("");
  const [otp_code, setOtp_code] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const email = queryParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = JSON.stringify({
        email,
        otp_code,
      });

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_API}/web/customer-auth/save-otp`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;
      console.log(otp_code);

      if (response.status === 200) {
        localStorage.setItem("token", token);
        window.location.href = "/";
        toast.success(response.data.message, { position: toast.POSITION.BOTTOM_CENTER });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message, { position: toast.POSITION.BOTTOM_CENTER });
      }
    }
  };

  return (
    <>
      <Navbar bg="light" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="logo" width="100" fluid />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row className="mt-4">
          <Col>
            <div>
              <Link to="/register">
                <img src={arrow} alt="arrow" />
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="ms-5">
            <div>
              <h5 className="fw-bold">Masukkan OTP</h5>
            </div>
          </Col>
        </Row>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12} className="d-flex justify-content-center">
              <div>
                <p>Ketikkan OTP yang dikirimkan ke {email}</p>
              </div>
            </Col>
            <Col className="d-flex justify-content-center">
              <div>
                <OTPInput value={otp_code} numInputs={6} onChange={setOtp_code} renderSeparator={<span className="mx-1"></span>} renderInput={(props) => <input {...props} />} inputStyle={{ width: "50px", height: "50px", gap: "8px" }} />
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="d-flex justify-content-center">
              <button className="btn-otp" type="submit">
                Submit
              </button>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
}

export default Otp;
