import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import NoResult from "../components/NoResult";
import loadingImg from "../assets/search/🦆 illustration _Loading_.svg";
import AccordionItem from "./AccordionItem";

function Accordion({ sort }) {
  const params = useParams();
  const [flight, setFlight] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getListFlight() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/flights?departure_airport_id=${params.departure_airport_id}&destination_airport_id=${params.destination_airport_id}&departure_date=${params.departure_date}&number_passenger=${params.number_passenger}&class_id=${params.class_id}&is_promo=${params.is_promo}`
        );
        setFlight(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.message);
      }
    }
    getListFlight();
  }, [params]);

  // const renderData = () => {
  //   if (flight && flight.length > 0) {
  //     if (sort === "Termurah") {
  //       return flight.sort((a, b) => a.price - b.price).map((item, index) => <AccordionItem item={item} index={index} />);
  //     } else {
  //       return null;
  //     }
  //   }
  // };

  return (
    <div className="accordion-item2">
      {/* {renderData()} */}
      {loading ? (
        <img src={loadingImg} alt="loading-img" className="d-flex justify-content-center" />
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
      )}
    </div>
  );
}

export default Accordion;
