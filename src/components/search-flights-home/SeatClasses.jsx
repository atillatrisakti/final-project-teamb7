import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
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
    } catch (error) {
      toast.error(error?.message);
    }
  };
  console.log("Ini seat", idSeatClass);

  useEffect(() => {
    getSeatClass();
  }, []);

  const handleCloseSelectedClass = () => {
    if (selectedClass !== "") {
      handleCloseClass();
    }
  };

  return (
    <Col xs={3} md={2}>
      <Form.Group>
        <Form.Label>Seat Class</Form.Label>
        <Form.Control
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
          <Button onClick={handleCloseClass}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
}

export default SeatClasses;
