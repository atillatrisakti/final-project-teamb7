import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
// import logo from "../assets/navbar/logo.svg";
import logo from "../assets/navbar/logo-name.svg";
import list from "../assets/navbar/fi_list.svg";
import notif from "../assets/navbar/fi_bell.svg";
import user from "../assets/navbar/fi_user.svg";
import { Link } from "react-router-dom";
import login from "../assets/navbar/fi_log-in.svg";
import "../styles/Navbar.css";

function Navbarr(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    props.isLoggedIn ? props.isLoggedIn : false
  );
  console.log("ini props", props);

  useEffect(() => {
    setIsLoggedIn(props.isLoggedIn);
  }, [props]);

  return (
    <Navbar expand="lg" className="py-0 mb-0">
      <Container>
        <Navbar.Brand href="/" className="text-dark">
          <img src={logo} alt="logo" fluid width="100" height="70" />
        </Navbar.Brand>

        {isLoggedIn ? (
          <Navbar.Collapse
            id="navbarScroll"
            className="d-flex justify-content-end gap-2"
          >
            <button style={{ border: "none", background: "none" }}>
              <img src={list} alt="list" />
            </button>
            <button style={{ border: "none", background: "none" }}>
              <img src={notif} alt="notif" />
            </button>
            <button style={{ border: "none", background: "none" }}>
              <Link to={"/account"}>
                <img src={user} alt="user" />
              </Link>
            </button>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse
            id="navbarScroll"
            className="d-flex justify-content-end"
          >
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <button className="login_button">
                <img src={login} alt="login-logo" /> Masuk
              </button>
            </Link>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default Navbarr;
