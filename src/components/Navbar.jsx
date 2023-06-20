import React from "react";
import { Container, Navbar, Form, Nav } from "react-bootstrap";
// import logo from "../assets/navbar/logo.svg";
import logo from "../assets/navbar/logo-name.svg";

import { Link } from "react-router-dom";
import login from "../assets/navbar/fi_log-in.svg";
import "../styles/Navbar.css";

function Navbarr() {
  return (
    <Navbar expand="lg" className="py-0 mb-0">
      <Container>
        <Navbar.Brand href="/" className="text-dark">
          <img src={logo} alt="logo" fluid width="100" height="70" />
        </Navbar.Brand>
        <Form className="d-flex w-50">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <Nav className="">
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <button className="login_button">
              <img src={login} alt="login-logo" /> Masuk
            </button>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navbarr;
