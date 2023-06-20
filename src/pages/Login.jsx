import React, { useState } from "react";
import "../styles/Login.css";
import logo from "../assets/navbar/logo.svg";
// import flower from "../assets/Group 10.svg";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let data = JSON.stringify({
        email,
        password,
      });

      let config = {
        method: "post",
        url: "https://flight-booking-api-development.up.railway.app/api/web/customer-auth/login",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);

      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

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
            <Form className=" mt-4" onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email/No Telepon</Form.Label>
                <Form.Control type="email" value={email} placeholder="Contoh: johndoe@gmail.com" style={{ height: "50px" }} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <div class="d-flex justify-content-between">
                  <Form.Label>Password</Form.Label>
                  <Link to="/reset-password" className="text-color">
                    Lupa Kata Sandi
                  </Link>
                </div>

                <Form.Control type={showPassword ? "text" : "password"} value={password} placeholder="Masukkan password" style={{ height: "50px" }} onChange={(e) => setPassword(e.target.value)} />
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
