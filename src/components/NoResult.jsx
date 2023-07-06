import React from "react";
import noresult from "../assets/noresult/Group 33.svg";

function NoResult({ text }) {
  return (
    <div className="mt-2">
      <img src={noresult} alt="noresult" />
      <p className=" fw-bold">{text} </p>
    </div>
  );
}

export default NoResult;
