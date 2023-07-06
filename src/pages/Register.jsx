import React, { useState } from "react";
import "../styles/Register.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import logo from "../assets/navbar/logo-name.svg";
import { Link, useNavigate } from "react-router-dom";
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
  const [validate, setValidate] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    e.preventDefault();

    setValidate(true);

    if (password !== password_confirmation) {
      toast.warning("Password dan konfirmasi password harus sama!");
    }

    if (password.length < 8) {
      toast.warning("Password minimal terdiri dari 8 karakter!");
    }

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
        url: `${process.env.REACT_APP_API}/web/customer-auth/register`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);

      if (response.status === 200) {
        // redirect(response.data.data.url);
        navigate(`${response.data.data.url}`);
        // <Navigate to=response.data.data.url replace={true} />;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.data);
        return;
      }
    }
  };

  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        <Col className="bg-color d-flex justify-content-center align-items-center">
          <Link to={"/"}>
            <img src={logo} alt="logo" fluid style={{ width: "500px", height: "500px", top: "301px", left: "85px" }} />
          </Link>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="w-75">
            <h3 className="fw-bold">Daftar</h3>
            <Form className="mt-4" onSubmit={handleSubmit} noValidate validated={validate}>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" placeholder="Nama Lengkap" style={{ height: "50px" }} value={name} onChange={(e) => setName(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Silahkan Masukkan Nama Anda</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Contoh: johndee@gmail.com" style={{ height: "50px" }} value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Silahkan Masukkan Email Anda</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control type="text" placeholder="+62" style={{ height: "50px" }} value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <Form.Control.Feedback type="invalid">Silahkan Masukkan Nomor Telepon Anda</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Buat Password</Form.Label>
                <div className="position-relative">
                  <Form.Control type={showPassword ? "text" : "password"} placeholder="Buat Password" style={{ height: "50px" }} value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <Form.Control.Feedback type="invalid">Silahkan Masukkan Password Anda</Form.Control.Feedback>
                  <span
                    className=" position-absolute  translate-middle-y "
                    style={{
                      // height: "30px",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      right: "16px",
                      top: " 50%",
                    }}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
                    <IconContext.Provider value={{ size: "20px" }}>{showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</IconContext.Provider>
                  </span>
                </div>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Konfirmasi Password</Form.Label>
                <div className="position-relative">
                  <Form.Control type={showConfirm ? "text" : "password"} placeholder="Konfirmasi Password" style={{ height: "50px" }} value={password_confirmation} onChange={(e) => setPassword_Confirmation(e.target.value)} required />
                  <span
                    className=" position-absolute  translate-middle-y "
                    style={{
                      // height: "30px",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      right: "16px",
                      top: "50%",
                    }}
                    onClick={() => setShowConfirm((showConfirm) => !showConfirm)}
                  >
                    <IconContext.Provider value={{ size: "20px" }}>{showConfirm ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</IconContext.Provider>
                  </span>
                </div>
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
