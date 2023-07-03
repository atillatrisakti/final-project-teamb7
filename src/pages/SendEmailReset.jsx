import React, { useState } from "react";
import logo from "../assets/navbar/logo-name.svg";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPass.css";
import { toast } from "react-toastify";

function SendEmailReset() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = JSON.stringify({
        email,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API}/web/customer-auth/request-forgot-password`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.message);
        return;
      }
      toast.error(error?.message);
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col className="bg-reset d-flex justify-content-center align-items-center">
          <Link to={"/"}>
            <img src={logo} alt="logo" fluid style={{ width: "500px", height: "500px", top: "301px", left: "85px" }} />
          </Link>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="w-75">
            <h3 className="fw-bold">Reset Password</h3>
            <Form className=" mt-4" onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Masukkan Email Anda</Form.Label>
                <Form.Control type="email" value={email} required style={{ height: "45px" }} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <button className="mt-3 w-100 btn-send" type="submit">
                Kirim Kode Reset
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SendEmailReset;
