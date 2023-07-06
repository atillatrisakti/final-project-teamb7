import React, { useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/navbar/logo-name.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function ResetPass() {
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length <= 8) {
      toast.warning("Password minimal 8 karakter!");
      if (password !== password_confirmation) {
        toast.warning("Password dan konfirmasi password harus sama!");
      }
    }

    try {
      let data = JSON.stringify({
        password,
        password_confirmation,
      });

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_API}/web/customer-auth/save-forgot-password?token=${token}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      if (response.status === 200) {
        toast.success("Berhasil mengubah password!");
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
      }
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
                <Form.Label>Masukkan Password Baru</Form.Label>

                <div className="position-relative">
                  <Form.Control type={showPassword ? "text" : "password"} required style={{ height: "45px" }} value={password} onChange={(e) => setPassword(e.target.value)} />
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
              <Form.Group>
                <Form.Label>Konfirmasi Password Baru</Form.Label>
                <div className="position-relative">
                  <Form.Control type={showConfirm ? "text" : "password"} required style={{ height: "45px" }} value={password_confirmation} onChange={(e) => setPassword_confirmation(e.target.value)} />
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
              <button className="mt-3 w-100 btn-send" type="submit">
                Konfirmasi
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPass;
