import axios from "axios";
import React, { useEffect, useId, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

function DestinationAirports() {
  const [show, setShow] = useState(false); // modal
  const [destAirport, setDestAirport] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState("");
  const [search, setSearch] = useState("");
  const [dataAirport, setDataAirport] = useState([]);
  const [idDestAirport, setIdDestAirport] = useState(0);

  const handleClose = () => setShow(false); // modal
  const handleShow = () => setShow(true);

  const getAirport = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/web/airports`
      );
      const data = response.data.data;
      setDestAirport(data);
      setDataAirport(data);
      // console.log(data);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  // console.log(airport[0].airports[0].name);
  // console.log("Ini airport", airport);

  useEffect(() => {
    getAirport();
  }, []);

  const handleCloseAirport = () => {
    if (selectedAirport !== "") {
      handleClose();
    }
  };

  const filteredAirport =
    search.length === 0
      ? destAirport
      : destAirport.filter((airp) =>
          airp.name.toLowerCase().includes(search.toLowerCase())
        );
  // console.log("Ini search", search);
  // console.log("filter", filteredAirport);

  const InputValue = () => {
    if (search !== "") {
      return <h6 className="mt-0 mb-2">Hasil pencarian "{search}"</h6>;
    }
    return search;
  };

  return (
    <Col xs={5} md={4}>
      <Form.Group>
        <Form.Control
          data-id={idDestAirport}
          placeholder="Kota Tujuan"
          name="destination_airport"
          className="form-input"
          onClick={handleShow}
          value={selectedAirport}
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
                    type="text"
                    name="search"
                    value={search}
                    placeholder="Hai, mau ke mana nih?"
                    onChange={(e) => setSearch(e.target.value)}
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
                <InputValue />
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
            {/* <h6>Pencarian terkini</h6> */}
            <div
              style={{
                maxHeight: "350px",
                marginBottom: "10px",
                overflowY: "scroll",
              }}
            >
              <ListGroup className="mb-2">
                {filteredAirport && filteredAirport.length > 0 ? (
                  filteredAirport.map((item) => (
                    <div className="list-group fluid shadow">
                      <ListGroup.Item
                        action
                        variant="light"
                        onClick={(e) => {
                          e.preventDefault();
                          setDestAirport(item.airports);
                          setSelectedAirport(item?.name);
                          setIdDestAirport(item?.id);
                          // console.log()
                          if (destAirport.length !== dataAirport.length) {
                            setDestAirport(dataAirport);
                            handleCloseAirport();
                          }
                          console.log("Ini airport", item);
                        }}
                      >
                        <div className="d-flex align-items-center my-1">
                          {item.name}
                        </div>
                        {/* {destAirport.airports.map((item) => {
                          return (
                            <div
                              onClick={(e) => {
                                e.preventDefault();
                                // setAirport(airport.airports);
                                setSelectedAirport(item?.name);
                                // console.log()
                                // if (
                                //   airport.length !==
                                //   dataAirport.length
                                // ) {
                                //   setAirport(dataAirport);
                                // }
                                handleCloseAirport();
                              }}
                            >
                              {item.name}
                            </div>
                          );
                        })} */}
                      </ListGroup.Item>
                    </div>
                  ))
                ) : (
                  <h5 className="mt-3 mb-0 text-secondary">
                    <b>Oops.. No result found</b>
                  </h5>
                )}
              </ListGroup>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Col>
  );
}

export default DestinationAirports;
