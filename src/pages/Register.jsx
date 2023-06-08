import React, { useState } from "react";
import "../styles/Register.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
// import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
// import { IconContext } from "react-icons";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col className="bg-color d-flex justify-content-center align-items-center">
          <Link to={"/"}>
            <img src={logo} alt="logo" fluid style={{ width: "264px", height: "146px", top: "301px", left: "85px" }} />
            {/* <img src={flower} alt="flower" fluid style={{ bottom: "0px" }} /> */}
          </Link>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="w-75">
            <h3 className="fw-bold">Daftar</h3>
            <Form className="mt-4">
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" placeholder="Nama Lengkap" style={{ height: "50px" }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Contoh: johndee@gmail.com" style={{ height: "50px" }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control type="text" placeholder="+62" style={{ height: "50px" }} />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Buat Password</Form.Label>
                <Form.Control type={showPassword ? "text" : "password"} placeholder="Buat Password" style={{ height: "50px" }} />
              </Form.Group>
              <button type="submit" className="w-100 regis-button">
                Daftar
              </button>
              <div className="d-flex justify-content-center mt-3">
                <Form.Text>
                  Sudah punya Akun?
                  <Link to="/login" className="ms-1 text-color fw-bold">
                    Masuk di sini
                  </Link>
                </Form.Text>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
