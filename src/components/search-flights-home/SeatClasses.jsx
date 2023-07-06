import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, ListGroup, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";

function SeatClasses() {
  const [showClass, setShowClass] = useState(false); // modal
  const [selectedClass, setSelectedClass] = useState("");
  const [seatClass, setSeatClass] = useState([]);
  const [idSeatClass, setIdSeatClass] = useState(0);

  const handleCloseClass = () => setShowClass(false); // modal
  const handleShowClass = () => setShowClass(true);

  const getSeatClass = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/web/classes`
      );
      const data = response.data.data;
      setSeatClass(data);
      setIdSeatClass(data[0].id);
      setSelectedClass(data[0].name);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  // console.log("Ini seat", idSeatClass);

  useEffect(() => {
    getSeatClass();
  }, []);

  const handleCloseSelectedClass = () => {
    if (selectedClass !== "") {
      handleCloseClass();
    }
  };

  return (
    <Col xs={6} md={2}>
      <Form.Group>
        <Form.Label>Seat Class</Form.Label>
        <Form.Control
          required
          data-id={idSeatClass}
          placeholder="Kelas Kabin"
          value={selectedClass}
          name="seat_class"
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
          width: "24%",
        }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <ListGroup>
                  {seatClass &&
                    seatClass.length > 0 &&
                    seatClass.map((seat) => (
                      <ListGroup.Item
                        key={seat?.id}
                        action
                        variant="light"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedClass(seat?.name);
                          setIdSeatClass(seat?.id);
                          handleCloseSelectedClass();
                        }}
                      >
                        <span>
                          <b>{seat?.name}</b>
                        </span>
                      </ListGroup.Item>
                      // console.log(seat);
                    ))}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{
              border: "none",
              borderRadius: "10px",
              background: "#1b3260",
              width: "100px",
              color: "white",
              height: "40px",
            }}
            onClick={handleCloseClass}
          >
            Simpan
          </button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}

export default SeatClasses;
