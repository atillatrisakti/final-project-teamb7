import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import edit from "../assets/account/fi_edit-3.svg";
import settings from "../assets/account/fi_settings.svg";
import logout from "../assets/account/fi_log-out.svg";
import arrow from "../assets/account/fi_arrow-left.svg";
import "../styles/Account.css";

function Account() {
  return (
    <>
      <Container className="mt-4">
        <div className="header">
          <h5>Akun</h5>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <div className="list mx-4 mt-3 mb-4">
              <img src={arrow} alt="left-arrow" />
              Beranda
            </div>
          </Link>
        </div>
      </Container>
      <div style={{ border: "1px solid #D0D0D0", boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)" }} />
      <Container className="mt-4">
        <Row>
          <Col md={6} className="d-flex justify-content-center">
            <div>
              <img src={edit} alt="edit" className="me-2 mb-3" />
              <p>Ubah Profil</p>
            </div>
            <div>
              <img src={settings} alt="setting" />
            </div>
          </Col>

          <Col md={6}>
            <div className="form-user">
              <Container>
                <div>
                  <p style={{ fontWeight: "700", fontSize: "20px" }}>Ubah Data Profil</p>
                </div>
                <div className="form-header">
                  <div className="text-white">Data Diri</div>
                </div>
                <Container className="ms-1 mt-4">
                  <div>
                    <Form>
                      <Form.Group>
                        <Form.Label>Nama Lengkap</Form.Label>
                        <Form.Control placeholder="Nama Lengkap" type="text" style={{ width: "450px" }} />
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label>Nomor Telepon</Form.Label>
                        <Form.Control placeholder="Nomor Telepon" type="number" />
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="Email" type="email" />
                      </Form.Group>
                      <div className="d-flex justify-content-center mt-4">
                        <button className="btn-simpan">Simpan</button>
                      </div>
                    </Form>
                  </div>
                </Container>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Account;