import React from "react";
import { Container, Navbar, Form, Nav } from "react-bootstrap";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import login from "../assets/fi_log-in.svg";
import "../styles/Navbar.css";

function Navbarr() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/" className="text-dark">
          <img src={logo} alt="logo" fluid width="80" height="80" />
        </Navbar.Brand>
        <Form className="d-flex w-50">
          <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
        </Form>
        <Nav className="">
          <button className="login_button" as={Link} to={"/login"}>
            <img src={login} alt="login-logo" /> Masuk
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navbarr;
