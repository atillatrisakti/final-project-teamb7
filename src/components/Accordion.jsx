import React from "react";
import NoResult from "../components/NoResult";
import loadingImg from "../assets/search/🦆 illustration _Loading_.svg";
import AccordionItem from "./AccordionItem";

function Accordion(props) {
  console.log(props)
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // // const params = queryParams.toString();
  // // console.log(queryParams.get("departure_airport_id"));

  // const [flight, setFlight] = useState([]);
  // const [flightReturn, setFlightReturn] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const departureAirportId = queryParams.get("departure_airport_id");
  // const destinationAirportId = queryParams.get("destination_airport_id");
  // const departureDate = queryParams.get("departure_date");
  // const returnDate = queryParams.get("return_date");
  // const numberPassenger = queryParams.get("number_passenger");
  // const seatClass = queryParams.get("class_id");
  // const isPromo = queryParams.get("is_promo");
  // const departureFlightId = queryParams.get("departure_flight_id");

  // useEffect(() => {
  //   // if (departureDate !== undefined) {
  //   async function getListFlight() {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API}/web/flights?departure_airport_id=${departureAirportId}&destination_airport_id=${destinationAirportId}&departure_date=${departureDate}&number_passenger=${numberPassenger}&class_id=${seatClass}&is_promo=${isPromo}`
  //       );
  //       setFlight(response.data.data);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       toast.error(error?.message);
  //     }
  //   }
  //   getListFlight();
  //   // } else {
  //   //   return "";
  //   // }
  // }, []);

  const renderData = () => {
    if (props.loading) {
      <img
        src={loadingImg}
        alt="loading-img"
        className="d-flex justify-content-center"
      />;
    } else if (props.flight && props.flight.length > 0) {
      if (props.sortFlight === "Termurah") {
        return props.flight
          .sort((a, b) => a - b)
          .map((item, index) => (
            <>
              <AccordionItem
                item={item}
                index={index}
                departureAirportId={props.departureAirportId}
                destinationAirportId={props.destinationAirportId}
                departureDate={props.departureDate}
                returnDate={props.returnDate}
                numberPassenger={props.numberPassenger}
                seatClass={props.seatClass}
                isPromo={props.isPromo}
                departureFlightId={props.departureFlightId}
              />
            </>
          ));
      } else {
        return props.flight
          .sort((a, b) => b - a)
          .map((item, index) => (
            <>
              <AccordionItem
                item={item}
                index={index}
                departureAirportId={props.departureAirportId}
                destinationAirportId={props.destinationAirportId}
                departureDate={props.departureDate}
                returnDate={props.returnDate}
                numberPassenger={props.numberPassenger}
                seatClass={props.seatClass}
                isPromo={props.isPromo}
                departureFlightId={props.departureFlightId}
              />
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
