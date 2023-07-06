import React, { useState, useEffect } from "react";
import "../styles/Search.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ModalSort({ sortFlight, setSortFlight }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [flight, setFlight] = useState([]);
  const [loading, setLoading] = useState(true);

  const departureAirportId = queryParams.get("departure_airport_id");
  const destinationAirportId = queryParams.get("destination_airport_id");
  const departureDate = queryParams.get("departure_date");
  const returnDate = queryParams.get("return_date");
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
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.message);
      }
    }
    getListFlight();
  }, []);

  function handleChange(e) {
    setSortFlight(e.target.value);
  }

  return (
    <select value={sortFlight} onChange={handleChange}>
      <option value="Termurah">Termurah</option>
      <option value="Termahal">Termahal</option>
      <option value="Awal">Keberangkatan Paling Awal</option>
      <option value="Akhir">Keberangkatan Paling Akhir</option>
    </select>
  );
}

export default ModalSort;
