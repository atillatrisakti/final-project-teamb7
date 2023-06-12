import React, { useState } from "react";

const Accordion = ({ item }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion-item mb-4">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div>{item.airport_name}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && (
        <div>
          <div className="accordion-content">{item.price}</div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
