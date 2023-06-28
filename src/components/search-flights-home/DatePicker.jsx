import React, { useState } from "react";
import { Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { format, isAfter, isBefore, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function DatePicker() {
  const [selectedSingleDate, setSelectedSingleDate] = useState(new Date()); // only start date

  const [selectedRange, setSelectedRange] = useState(new Date()); // start date and end date
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const [showDate, setShowDate] = useState(false); // modal

  const handleCloseDate = () => setShowDate(false); // modal
  const handleShowDate = () => setShowDate(true);

  const handleDaySelect = (date) => {
    setSelectedSingleDate(date);
    if (date) {
      setFromValue(format(date, "y-MM-dd"));
      handleCloseDate();
    } else {
      setFromValue("");
    }
  };

  const handleFromChange = (e) => {
    setFromValue(e.target.value);
    const date = parse(e.target.value, "y-MM-dd", new Date());
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: undefined });
    }
    if (selectedRange?.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date });
    } else {
      setSelectedRange({ from: date, to: selectedRange?.to });
    }
  };

  const handleToChange = (e) => {
    setToValue(e.target.value);
    const date = parse(e.target.value, "y-MM-dd", new Date());

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange?.from, to: undefined });
    }
    if (selectedRange?.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from });
    } else {
      setSelectedRange({ from: selectedRange?.from, to: date });
    }
  };

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    if (range?.from) {
      // setFromValue(format(range.from, "MMMM d, yyyy"));
      setFromValue(format(range.from, "y-MM-dd"));
    } else {
      setFromValue("");
    }
    if (range?.to && isDisabled) {
      // setToValue(format(range.to, "MMMM d, yyyy"));
      setToValue(format(range.to, "y-MM-dd"));
      handleCloseDate();
    } else {
      setToValue("");
    }
  };

  return (
    <Form.Group>
      <Row className="d-flex align-items-center">
        <Col>
          <Form.Label>Departure</Form.Label>
          <InputGroup>
            <InputGroup.Text id="basic-addon1" className="mx-0">
              📅
            </InputGroup.Text>
            <Form.Control
              size={10}
              placeholder="From Date"
              name="start_date"
              value={fromValue}
              onChange={handleFromChange}
              onClick={handleShowDate}
              className="form-input"
            />
          </InputGroup>
        </Col>
        <Col className="ps-0">
          <Form.Label>Return</Form.Label>
          <Form.Control
            disabled={!isDisabled}
            size={10}
            placeholder="To Date"
            name="end_date"
            value={toValue}
            onChange={handleToChange}
            onClick={handleShowDate}
            className="form-input"
          />
        </Col>
        <Col md={1} className="ps-0">
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            onClick={() => {
              setIsDisabled(!isDisabled);
              setFromValue("");
              setToValue("");
            }}
          />
        </Col>
      </Row>
      <Modal
        centered
        show={showDate}
        onHide={handleCloseDate}
        style={{
          display: "block",
          marginLeft: "18.8%",
          marginTop: "13.5%",
          width: "fit-content",
        }}
        size="lg"
      >
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                {!isDisabled ? (
                  <DayPicker
                    id="day-picker-single"
                    mode="single"
                    selected={selectedSingleDate}
                    onSelect={handleDaySelect}
                    numberOfMonths={2}
                    pagedNavigation
                    showOutsideDays
                    fixedWeeks
                  />
                ) : (
                  <DayPicker
                    id="day-picker-range"
                    mode="range"
                    selected={selectedRange}
                    onSelect={handleRangeSelect}
                    numberOfMonths={2}
                    pagedNavigation
                    showOutsideDays
                    fixedWeeks
                  />
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </Form.Group>
  );
}

export default DatePicker;
