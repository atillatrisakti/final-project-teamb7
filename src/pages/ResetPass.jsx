import React from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/navbar/logo-name.svg";

function ResetPass() {
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
            <Form className=" mt-4">
              <Form.Group>
                <Form.Label>Masukkan Password Baru</Form.Label>
                <Form.Control type="password" required style={{ height: "45px" }} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Konfirmasi Password Baru</Form.Label>
                <Form.Control type="password" required style={{ height: "45px" }} />
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

export default ResetPass;
