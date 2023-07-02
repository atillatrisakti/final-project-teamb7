import React, { useState, useEffect } from "react";
import "../styles/Search.css";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ModalSort({ sort, setSort }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [flight, setFlight] = useState([]);
  const [loading, setLoading] = useState(true);

  const departureAirportId = queryParams.get("departure_airport_id");
  const destinationAirportId = queryParams.get("destination_airport_id");
  const departureDate = queryParams.get("departure_date");
  const endDate = queryParams.get("end_date");
  const numberPassenger = queryParams.get("number_passenger");
  const seatClass = queryParams.get("class_id");
  const isPromo = queryParams.get("is_promo");

  useEffect(() => {
    async function getListFlight() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API}/web/flights?departure_airport_id=${departureAirportId}&destination_airport_id=${destinationAirportId}&departure_date=${departureDate}&number_passenger=${numberPassenger}&class_id=${seatClass}&is_promo=${isPromo}`
        );
        setFlight(response.data.data);
        // console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.message);
      }
    }
    getListFlight();
  }, []);
  // console.log("flighttter", flight);

  function handleChange(e) {
    setSort(e.target.value);
  }

  return (
    <select value={sort} onChange={handleChange}>
      <option value="Termurah">Termurah</option>
      <option value="Termahal">Termahal</option>
    </select>
  );
}

export default ModalSort;
