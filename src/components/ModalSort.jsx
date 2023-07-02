import React, { useState, useEffect } from "react";
import "../styles/Search.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ModalSort({ sort, setSort }) {
  const params = useParams();
  const [flight, setFlight] = useState([]);

  useEffect(() => {
    async function getListFlight() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/flights?departure_airport_id=${params.departure_airport_id}&destination_airport_id=${params.destination_airport_id}&departure_date=${params.departure_date}&number_passenger=${params.number_passenger}&class_id=${params.class_id}`
        );
        setFlight(response.data.data);
      } catch (error) {
        // toast.error(error?.message);
      }
    }
    getListFlight();
  }, [params]);
  console.log("flighttter", flight);

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
