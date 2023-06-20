import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Icon } from "@iconify/react";

function Passengers() {
  const [showPassenger, setShowPassenger] = useState(false); // modal
  const [options, setOptions] = useState({
    dewasa: 1,
    anak: 0,
    bayi: 0,
  });

  const handleClosePassenger = () => setShowPassenger(false); // modal
  const handleShowPassenger = () => setShowPassenger(true);
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

  return (
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
          width: "50%", //"25.2%",
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={10} md={6} className="d-flex align-items-center">
                <Icon icon="el:adult" className="icon-input me-2" />
                <span>
                  <b className="mb-0">Dewasa</b> <br />{" "}
                  <p className="my-auto font-passenger">(12 tahun ke atas)</p>
                </span>
              </Col>
              <Col xs={8} md={6} className="d-flex align-items-center">
                <InputGroup className="ps-2">
                  <Button
                    variant="outline-secondary"
                    disabled={options.dewasa <= 1}
                    onClick={() => handleOption("dewasa", "min")}
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
                    onClick={() => handleOption("dewasa", "plus")}
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
              <Col xs={10} md={6} className="d-flex align-items-center my-2">
                <Icon icon="fa-solid:child" className="icon-input me-2" />

                <span>
                  <b className="mb-0">Anak</b> <br />{" "}
                  <p className="my-auto font-passenger">(2 - 11 tahun)</p>
                </span>
              </Col>
              <Col xs={8} md={6} className="d-flex align-items-center">
                <InputGroup className="ps-2">
                  <Button
                    variant="outline-secondary"
                    disabled={options.anak <= 1}
                    onClick={() => handleOption("anak", "min")}
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
                    onClick={() => handleOption("anak", "plus")}
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
              <Col xs={10} md={6} className="d-flex align-items-center">
                <Icon icon="fa6-solid:baby" className="icon-input me-2" />

                <span>
                  <b className="mb-0">Bayi</b> <br />{" "}
                  <p className="my-auto font-passenger">(Di bawah 2 tahun)</p>
                </span>
              </Col>
              <Col xs={8} md={6} className="d-flex align-items-center">
                <InputGroup className="ps-2">
                  <Button
                    variant="outline-secondary"
                    disabled={options.bayi <= 1}
                    onClick={() => handleOption("bayi", "min")}
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
                    onClick={() => handleOption("bayi", "plus")}
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
          <Button onClick={handleClosePassenger}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}

export default Passengers;
