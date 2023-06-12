import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  RangeDatePicker,
  SingleDatePicker,
} from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import "../styles/Home.css";

import Banner from "../assets/img-banner.svg";
import Destination from "../assets/img-destination.svg";
// import { format } from "date-fns";

import { Icon } from "@iconify/react";
import { FaSearch } from "react-icons/fa";

function Home() {
  const [destination, setDestination] = useState([]);
  const [show, setShow] = useState(false); // modal
  const [showPassenger, setShowPassenger] = useState(false); // modal
  const [showClass, setShowClass] = useState(false); // modal

  // const [count, setCount] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    dewasa: 2,
    anak: 0,
    bayi: 1,
  });

  const handleClose = () => setShow(false); // modal
  const handleShow = () => setShow(true);
  const handleClosePassenger = () => setShowPassenger(false); // modal
  const handleShowPassenger = () => setShowPassenger(true);
  const handleCloseClass = () => setShowClass(false); // modal
  const handleShowClass = () => setShowClass(true);

  const handleOption = (passenger, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [passenger]:
          operation === "plus"
            ? options[passenger] + 1
            : options[passenger] - 1,
      };
    });
  };

  const count = options.dewasa + options.anak + options.bayi;

  useEffect(() => {
    axios
      .get(``)
      .then((response) => setDestination(response.data.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Carousel
        controls={false}
        style={{
          position: "absolute",
          top: "6.5rem",
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* {destination.slice(1, 3).map((dest) => ( */}
        <Carousel.Item key="">
          <img
            src={Banner}
            style={{ width: "100%" }}
            className="mx-auto d-block"
            alt="banner"
          ></img>
        </Carousel.Item>
        {/* ))} */}
      </Carousel>
      <div>
        <Container>
          <Row style={{ marginTop: "12rem" }}>
            <Col>
              <Form>
                <Card className="mx-auto mb-4" style={{ width: "75rem" }}>
                  <Card.Body>
                    <Card.Title className="px-3 pt-2 mb-3">
                      <b>Pilih Jadwal Penerbangan spesial di</b>{" "}
                      <b style={{ color: "#3E6B00" }}>Tiketku!</b>
                    </Card.Title>
                    <Row className="px-3 pt-2 d-flex align-items-center">
                      <Col xs={2} md={1}>
                        <Icon
                          icon="material-symbols:flight-takeoff"
                          color="gray"
                          className="icon-input"
                        />
                        <Form.Label className="font-input">From</Form.Label>
                      </Col>
                      <Col xs={7} md={5}>
                        <Form.Group>
                          <Form.Control
                            placeholder="Kota Asal"
                            className="form-input"
                            onClick={handleShow}
                          />
                        </Form.Group>
                        {/* ======================================================== */}
                        <Modal
                          size="lg"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          show={show}
                          onHide={handleClose}
                        >
                          <Modal.Body>
                            <Form>
                              <Row>
                                <Col>
                                  <InputGroup
                                    className="mb-3 my-1"
                                    controlId="exampleForm.ControlInput1"
                                    style={{ width: "42.8rem" }}
                                  >
                                    <Form.Control
                                      type="email"
                                      placeholder="Hai, mau ke mana nih?"
                                      autoFocus
                                    />
                                    <Button
                                      variant="outline-secondary"
                                      type="submit"
                                      style={{ borderColor: "#DADADA" }}
                                    >
                                      <FaSearch
                                        color="gray"
                                        className="d-flex align-items-center"
                                      />
                                    </Button>
                                  </InputGroup>
                                </Col>
                                <Col>
                                  <Modal.Header
                                    closeButton
                                    style={{
                                      border: "none",
                                    }}
                                    md="auto"
                                  ></Modal.Header>
                                </Col>
                              </Row>

                              <ListGroup className="mb-2">
                                <h6>Pencarian terkini</h6>
                                <ListGroupItem>Jakarta</ListGroupItem>
                                <ListGroupItem>Surabaya</ListGroupItem>
                                <ListGroupItem>Bandung</ListGroupItem>
                              </ListGroup>
                            </Form>
                          </Modal.Body>
                        </Modal>
                      </Col>
                      <Col
                        xs={2}
                        md={1}
                        className="d-flex justify-content-center"
                      >
                        <Icon
                          icon="icon-park-outline:play-cycle"
                          color="white"
                          className="icon-switch"
                        />
                      </Col>
                      <Col xs={2} md={1}>
                        <Icon
                          icon="material-symbols:flight-land"
                          color="gray"
                          className="icon-input"
                        />
                        <Form.Label className="font-input">To</Form.Label>
                      </Col>
                      <Col xs={5} md={4}>
                        <Form.Group>
                          <Form.Control
                            placeholder="Kota Tujuan"
                            className="form-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="px-3 pt-2 my-3 d-flex align-items-center">
                      <Col xs={2} md={1}>
                        <Icon
                          icon="material-symbols:date-range-outline"
                          color="gray"
                          className="icon-input"
                        />
                        <Form.Label className="font-input">Date</Form.Label>
                      </Col>
                      <Col xs={4} md={5}>
                        <Form.Group>
                          <Row
                            className="d-flex align-content-left"
                            // style={{ width: "28.5rem" }}
                          >
                            <Col md={6}>
                              <span>Departure</span>
                            </Col>
                            <Col md={5} className="ps-0">
                              <span>Return</span>
                            </Col>
                            <Col md={1} className="ps-0">
                              <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                              />
                              {/* <Form.Check // prettier-ignore
                                disabled
                                type="switch"
                                id="disabled-custom-switch"
                              /> */}
                            </Col>
                          </Row>

                          <RangeDatePicker
                            ranges={date}
                            onChange={(item) => setDate([item.selection])}
                            className="px-0 pt-2"
                            // minDate={new Date(2023, 0, 1)}
                            // maxDate={new Date(2023, 1, 5)}
                          />
                        </Form.Group>
                      </Col>
                      {/* <Col xs={2} md={1}></Col> */}
                      <Col xs={2} md={1}></Col>
                      <Col xs={2} md={1}>
                        <Icon
                          icon="material-symbols:airline-seat-recline-normal"
                          color="gray"
                          className="icon-input"
                        />
                        <Form.Label className="font-input">To</Form.Label>
                      </Col>
                      <Col xs={3} md={2}>
                        <Form.Group>
                          <Form.Label>Passengers</Form.Label>
                          <Form.Control
                            placeholder="Jumlah"
                            value={`${count} Penumpang`}
                            className="form-input"
                            onClick={handleShowPassenger}
                          />
                        </Form.Group>

                        <Modal
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          show={showPassenger}
                          onHide={handleClosePassenger}
                          style={{
                            marginLeft: "61.5%",
                            marginTop: "15%",
                            width: "24.2%",
                          }}
                        >
                          <Modal.Header closeButton></Modal.Header>
                          <Modal.Body>
                            <Container>
                              <Row>
                                <Col
                                  xs={10}
                                  md={6}
                                  className="d-flex align-items-center"
                                >
                                  <Icon
                                    icon="el:adult"
                                    className="icon-input me-2"
                                  />
                                  <span>
                                    <b className="mb-0">Dewasa</b> <br />{" "}
                                    <p className="my-auto font-passenger">
                                      (12 tahun ke atas)
                                    </p>
                                  </span>
                                </Col>
                                <Col
                                  xs={8}
                                  md={6}
                                  className="d-flex align-items-center"
                                >
                                  <InputGroup className="ps-2">
                                    <Button
                                      variant="outline-secondary"
                                      disabled={options.dewasa <= 1}
                                      onClick={() =>
                                        handleOption("dewasa", "min")
                                      }
                                      style={{ borderRadius: "5px" }}
                                    >
                                      <Icon
                                        icon="fa6-solid:minus"
                                        className="d-flex align-items-center"
                                      />
                                    </Button>
                                    <Form.Control
                                      placeholder="0"
                                      value={options.dewasa}
                                      aria-label="Jumlah Penumpang"
                                      className="mx-1 text-center"
                                      style={{ borderRadius: "5px" }}
                                    />
                                    <Button
                                      variant="outline-secondary"
                                      onClick={() =>
                                        handleOption("dewasa", "plus")
                                      }
                                      style={{ borderRadius: "5px" }}
                                    >
                                      <Icon
                                        icon="fa6-solid:plus"
                                        className="d-flex align-items-center"
                                      />
                                    </Button>
                                  </InputGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  xs={10}
                                  md={6}
                                  className="d-flex align-items-center my-2"
                                >
                                  <Icon
                                    icon="fa-solid:child"
                                    className="icon-input me-2"
                                  />

                                  <span>
                                    <b className="mb-0">Anak</b> <br />{" "}
                                    <p className="my-auto font-passenger">
                                      (2 - 11 tahun)
                                    </p>
                                  </span>
                                </Col>
                                <Col
                                  xs={8}
                                  md={6}
                                  className="d-flex align-items-center"
                                >
                                  <InputGroup className="ps-2">
                                    <Button
                                      variant="outline-secondary"
                                      disabled={options.anak <= 1}
                                      onClick={() =>
                                        handleOption("anak", "min")
                                      }
                                      style={{ borderRadius: "5px" }}
                                    >
                                      <Icon
                                        icon="fa6-solid:minus"
                                        className="d-flex align-items-center"
                                      />
                                    </Button>
                                    <Form.Control
                                      placeholder="0"
                                      value={options.anak}
                                      aria-label="Jumlah Penumpang"
                                      className="mx-1 text-center"
                                      style={{ borderRadius: "5px" }}
                                    />
                                    <Button
                                      variant="outline-secondary"
                                      onClick={() =>
                                        handleOption("anak", "plus")
                                      }
                                      style={{ borderRadius: "5px" }}
                                    >
                                      <Icon
                                        icon="fa6-solid:plus"
                                        className="d-flex align-items-center"
                                      />
                                    </Button>
                                  </InputGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  xs={10}
                                  md={6}
                                  className="d-flex align-items-center"
                                >
                                  <Icon
                                    icon="fa6-solid:baby"
                                    className="icon-input me-2"
                                  />

                                  <span>
                                    <b className="mb-0">Bayi</b> <br />{" "}
                                    <p className="my-auto font-passenger">
                                      (Di bawah 2 tahun)
                                    </p>
                                  </span>
                                </Col>
                                <Col
                                  xs={8}
                                  md={6}
                                  className="d-flex align-items-center"
                                >
                                  <InputGroup className="ps-2">
                                    <Button
                                      variant="outline-secondary"
                                      disabled={options.bayi <= 1}
                                      onClick={() =>
                                        handleOption("bayi", "min")
                                      }
                                      style={{ borderRadius: "5px" }}
                                    >
                                      <Icon
                                        icon="fa6-solid:minus"
                                        className="d-flex align-items-center"
                                      />
                                    </Button>
                                    <Form.Control
                                      placeholder="0"
                                      value={options.bayi}
                                      aria-label="Jumlah Penumpang"
                                      className="mx-1 text-center"
                                      style={{ borderRadius: "5px" }}
                                    />
                                    <Button
                                      variant="outline-secondary"
                                      onClick={() =>
                                        handleOption("bayi", "plus")
                                      }
                                      style={{ borderRadius: "5px" }}
                                    >
                                      <Icon
                                        icon="fa6-solid:plus"
                                        className="d-flex align-items-center"
                                      />
                                    </Button>
                                  </InputGroup>
                                </Col>
                              </Row>
                            </Container>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={handleClosePassenger}>
                              Simpan
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Col>
                      <Col xs={3} md={2}>
                        <Form.Group>
                          <Form.Label>Seat Class</Form.Label>
                          <Form.Control
                            placeholder="Kelas Kabin"
                            // value={class}
                            className="form-input"
                            onClick={handleShowClass}
                          />
                        </Form.Group>

                        <Modal
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          show={showClass}
                          onHide={handleCloseClass}
                          style={{
                            marginLeft: "72.8%",
                            marginTop: "15%",
                            width: "24.2%",
                          }}
                        >
                          <Modal.Header closeButton></Modal.Header>
                          <Modal.Body>
                            <Container>
                              <Row>
                                <Col className="d-flex align-items-center">
                                  <Icon
                                    icon="el:adult"
                                    className="icon-input me-2"
                                  />
                                  <span>
                                    <b className="mb-0">Dewasa</b> <br />{" "}
                                    <p className="my-auto font-passenger">
                                      (12 tahun ke atas)
                                    </p>
                                  </span>
                                </Col>
                              </Row>
                            </Container>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={handleClosePassenger}>
                              Simpan
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Col>
                    </Row>
                  </Card.Body>
                  <div className="d-grid gap-2">
                    <span className="square bg-dark rounded-bottom">
                      <div className="d-grid gap-2">
                        <Button variant="dark" style={{ height: "3rem" }}>
                          <b>Cari Penerbangan</b>
                        </Button>
                      </div>
                    </span>
                  </div>
                </Card>
              </Form>
            </Col>
          </Row>

          <Row style={{ marginLeft: "5.4%", marginRight: "5.4%" }}>
            <Col sm={10} className="mt-1">
              <h5 className="text-dark text-popular mt-2">
                <b>Destinasi Favorit</b>
              </h5>
            </Col>
          </Row>
          <Row
            style={{
              display: "flex",
              gap: "40px",
              marginLeft: "6.2%",
              marginRight: "5.4%",
              marginTop: "0.5rem",
              marginBottom: "1.5rem",
              textDecoration: "none",
              color: "black",
            }}
            as={Link}
            to="/"
          >
            <Col
              style={{
                width: "10%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid black",
                padding: "15px",
                borderRadius: "25px",
              }}
              active
            >
              <Icon icon="iconamoon:search-bold" className="icon-input" />
              <span>Category 1</span>
            </Col>
            <Col
              style={{
                width: "10%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid black",
                padding: "15px",
                borderRadius: "25px",
              }}
              active
            >
              <Icon icon="iconamoon:search-bold" className="icon-input" />
              <span>Category 2</span>
            </Col>
            <Col
              style={{
                width: "10%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid black",
                padding: "15px",
                borderRadius: "25px",
              }}
            >
              <Icon icon="iconamoon:search-bold" className="icon-input" />
              <span>Category 3</span>
            </Col>
          </Row>
          <Row
            className="mt-2"
            style={{ marginLeft: "5.4%", marginRight: "5.4%" }}
          >
            {/* {destination.map((dest) => ( */}
            <Col sm={12} md={6} lg={3} key="">
              <Link
                to={`/details/...`}
                style={{ textDecoration: "none", borderColor: "black" }}
              >
                <Card className="p-2 mb-5" style={{ borderRadius: "10px" }}>
                  <img
                    src={Destination}
                    alt="destination"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />

                  <Card.Body className="px-2 pt-3 pb-2">
                    <Card.Title>
                      <h5 className="d-flex align-items-center">
                        <b>
                          Jakarta
                          <Icon
                            icon="heroicons:arrow-long-right"
                            className="mx-1"
                          />
                          Bangkok
                        </b>
                      </h5>
                      <h6>
                        <b style={{ color: "#3E6B00" }}>AirAsia</b>
                      </h6>
                      <h6>20 - 30 Maret 2023</h6>
                      <h5>
                        Mulai dari <b style={{ color: "red" }}>IDR 950.000</b>
                      </h5>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            {/* ))} */}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
