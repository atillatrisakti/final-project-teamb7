import React, { useState } from "react";
import "../styles/Register.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import logo from "../assets/navbar/logo-name.svg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_Confirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = JSON.stringify({
        name,
        email,
        phone,
        password,
        password_confirmation,
      });

      let config = {
        method: "post",
        url: "https://flight-booking-api-development.up.railway.app/api/web/customer-auth/register",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: data,
      };

      await axios.request(config).then((response) => {
        console.log(response.data);
      });

      window.location.href = "/login";
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
            <img src={logo} alt="logo" fluid style={{ width: "500px", height: "500px", top: "301px", left: "85px" }} />
            {/* <img src={flower} alt="flower" fluid style={{ bottom: "0px" }} /> */}
          </Link>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="w-75">
            <h3 className="fw-bold">Daftar</h3>
            <Form className="mt-4" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" placeholder="Nama Lengkap" style={{ height: "50px" }} value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Contoh: johndee@gmail.com" style={{ height: "50px" }} value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control type="text" placeholder="+62" style={{ height: "50px" }} value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Buat Password</Form.Label>
                <Form.Control type={showPassword ? "text" : "password"} placeholder="Buat Password" style={{ height: "50px" }} value={password} onChange={(e) => setPassword(e.target.value)} />
                <span
                  className=" position-absolute  translate-middle-y"
                  style={{
                    // height: "30px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    right: "120px",
                    top: " 448px",
                  }}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}
                >
                  <IconContext.Provider value={{ size: "20px" }}>{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</IconContext.Provider>
                </span>
                <p className="text-muted" style={{ fontSize: "13px" }}>
                  Password Minimal 8 Karakter
                </p>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Konfirmasi Password</Form.Label>
                <Form.Control type="password" placeholder="Konfirmasi Password" style={{ height: "50px" }} value={password_confirmation} onChange={(e) => setPassword_Confirmation(e.target.value)} />
                <span
                  className=" position-absolute  translate-middle-y"
                  style={{
                    // height: "30px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    right: "120px",
                    top: "564px",
                  }}
                  onClick={() => setShowConfirm((showConfirm) => !showConfirm)}
                >
                  <IconContext.Provider value={{ size: "20px" }}>{showConfirm ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</IconContext.Provider>
                </span>
                <p className="text-warning mt-1">{password_confirmation !== password ? "Password tidak sama!" : null}</p>
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
