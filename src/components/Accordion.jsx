import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";
import NoResult from "../components/NoResult";
import loadingImg from "../assets/search/🦆 illustration _Loading_.svg";
import AccordionItem from "./AccordionItem";

function Accordion({ sort }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const params = queryParams.toString();
  // console.log(queryParams.get("departure_airport_id"));

  const [flight, setFlight] = useState([]);
  const [flightReturn, setFlightReturn] = useState([]);
  const [loading, setLoading] = useState(true);

  const departureAirportId = queryParams.get("departure_airport_id");
  const destinationAirportId = queryParams.get("destination_airport_id");
  const departureDate = queryParams.get("departure_date");
  const endDate = queryParams.get("end_date");
  const numberPassenger = queryParams.get("number_passenger");
  const seatClass = queryParams.get("class_id");
  const isPromo = queryParams.get("is_promo");

  useEffect(() => {
    if (departureDate !== undefined) {
      async function getListFlight() {
        try {
          setLoading(true);
          const response = await axios.get(
            `${process.env.REACT_APP_API}/web/flights?departure_airport_id=${departureAirportId}&destination_airport_id=${destinationAirportId}&departure_date=${departureDate}&number_passenger=${numberPassenger}&class_id=${seatClass}&is_promo=${isPromo}`
          );
          setFlight(response.data.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          toast.error(error?.message);
        }
      }
      getListFlight();
    } else {
      return "";
    }
  }, []);

  const renderData = () => {
    if (loading) {
      <img
        src={loadingImg}
        alt="loading-img"
        className="d-flex justify-content-center"
      />;
    } else if (flight && flight.length > 0) {
      if (sort === "Termurah") {
        return flight
          .sort((a, b) => a.price - b.price)
          .map((item, index) => (
            <>
              <AccordionItem item={item} index={index} />
            </>
          ));
      } else {
        return flight
          .sort((a, b) => b.price - a.price)
          .map((item, index) => (
            <>
              <AccordionItem item={item} index={index} />
            </>
          ));
      }
    } else {
      return (
        <div className="d-flex justify-content-center text-secondary">
          <NoResult />
        </div>
      );
    }
  };

  return (
    <div className="accordion-item2">
      {renderData()}
      {/* {loading ? (
        <img
          src={loadingImg}
          alt="loading-img"
          className="d-flex justify-content-center"
        />
      ) : flight && flight.length > 0 ? (
        sort === "Termurah" ? (
          flight
            .sort((a, b) => a.price - b.price)
            .map((item, index) => (
              <>
                <AccordionItem item={item} index={index} />
              </>
            ))
        ) : (
          flight
            .sort((a, b) => b.price - a.price)
            .map((item, index) => (
              <>
                <AccordionItem item={item} index={index} />
              </>
            ))
        )
      ) : (
        <div className="d-flex justify-content-center text-secondary">
          <NoResult />
        </div>
      )} */}
    </div>
  );
}

export default Accordion;
