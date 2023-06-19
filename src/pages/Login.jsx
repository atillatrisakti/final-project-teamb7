import React, { useState } from "react";
import "../styles/Login.css";
import logo from "../assets/navbar/logo.svg";
// import flower from "../assets/Group 10.svg";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";

function Login() {
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
            <h3 className="fw-bold">Masuk</h3>
            <Form className=" mt-4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email/No Telepon</Form.Label>
                <Form.Control type="email" placeholder="Contoh: johndoe@gmail.com" style={{ height: "50px" }} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <div class="d-flex justify-content-between">
                  <Form.Label>Password</Form.Label>
                  <Link to="/reset-password" className="text-color">
                    Lupa Kata Sandi
                  </Link>
                </div>

                <Form.Control type={showPassword ? "text" : "password"} placeholder="Masukkan password" style={{ height: "50px" }} />
                <span
                  className=" position-absolute  translate-middle-y"
                  style={{
                    // height: "30px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    right: "120px",
                    top: "415px",
                  }}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}
                >
                  <IconContext.Provider value={{ size: "20px" }}>{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</IconContext.Provider>
                </span>
              </Form.Group>
              <button type="submit" className="w-100 login-button">
                Masuk
              </button>
              <div className="d-flex justify-content-center mt-3">
                <Form.Text>
                  Belum punya Akun?
                  <Link to="/register" className="ms-1 text-color fw-bold">
                    Daftar di sini
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

export default Login;
