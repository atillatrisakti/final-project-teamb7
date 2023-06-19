import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/Search.css";
import arrow from "../assets/search/fi_arrow-left.svg";
import filter from "../assets/search/Prefix icon.svg";
import box from "../assets/search/fi_box.svg";
import love from "../assets/search/fi_heart.svg";
import dollar from "../assets/search/fi_dollar-sign.svg";
import rightarrow from "../assets/search/fi_chevron-right.svg";
import Accordion from "../components/Accordion";
import "../styles/Accordion.css";
// import { accordionData } from "../utils/content";
import NoResult from "../components/NoResult";

const dateList = [
  { id: 1, hari: "Senin" },
  { id: 2, hari: "Selasa" },
  { id: 3, hari: "Rabu" },
  { id: 4, hari: "Kamis" },
  { id: 5, hari: "Jumat" },
  { id: 6, hari: "Sabtu" },
  { id: 7, hari: "Minggu" },
];
function Search() {
  const [date, setDate] = useState("");
  // const [sort, setSort] = useState("Termurah");

  return (
    <Container className="mt-3">
      <h4 className="text-pilih">Pilih Penerbangan</h4>
      <Container className="mt-4">
        <Row className="d-flex justify-content-center">
          <Col sm={9}>
            <div className="flight-desc" onClick={() => {}} style={{ cursor: "pointer" }}>
              <img src={arrow} alt="left-arrow" className="mb-1" /> JKT - MLB - 2 Penumpang - Economy
            </div>
          </Col>
          <Col sm={2}>
            <button className="change-search">Ubah Pencarian</button>
          </Col>
        </Row>
        <Row className="mt-4 ">
          <Col>
            <div className="date">
              {dateList.map((e) => (
                <div
                  onClick={() => {
                    setDate(date === e.hari ? "" : e.hari);
                  }}
                  style={{ backgroundColor: e.hari === date ? "green" : "white" }}
                >
                  {e.hari}
                </div>
              ))}
            </div>
            <hr />
          </Col>
        </Row>
        <button className="sort-btn">
          <img src={filter} alt="filter" className="me-1 mb-1" />
          Termurah
        </button>
        <Row className="mt-5">
          <Col md={4}>
            <div className="filter">
              <h5 className="mb-4">Filter</h5>
              <div className="transit" onClick={() => {}} style={{ cursor: "pointer" }}>
                <img src={box} alt="transit" className="me-2" />
                Transit
                <img src={rightarrow} alt="right-arrow" style={{ float: "right" }} />
              </div>
              <hr />
              <div className="facility" onClick={() => {}} style={{ cursor: "pointer" }}>
                <img src={love} alt="facility" className="me-2" />
                Fasilitas
                <img src={rightarrow} alt="right-arrow" style={{ float: "right" }} />
              </div>
              <hr />
              <div className="price" onClick={() => {}} style={{ cursor: "pointer" }}>
                <img src={dollar} alt="price" className="me-2" />
                Harga
                <img src={rightarrow} alt="right-arrow" style={{ float: "right" }} />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="accordion">
              {/* {accordionData.length !== 0 ? (
                accordionData
                  .sort((a, b) => {
                    if (sort === "Termurah") {
                      return a.price - b.price;
                    } else if (sort === "Termahal") {
                      return b.price - a.price;
                    }
                  })
                  .map((item) => )
              ) : (
                <NoResult />
              )} */}
              <Accordion />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Search;
