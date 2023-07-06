import React from "react";
import NoResult from "../components/NoResult";
import loadingImg from "../assets/search/🦆 illustration _Loading_.svg";
import AccordionItem from "./AccordionItem";

function Accordion(props) {
  // console.log(props)

  const renderData = () => {
    if (props.loading) {
      <img src={loadingImg} alt="loading-img" className="d-flex justify-content-center" />;
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
          <NoResult text="Maaf, pencarian anda tidak ditemukan" />
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
