import React from "react";
import noresult from "../assets/noresult/Group 33.svg";

function NoResult() {
  return (
    <div className="mt-2">
      <img src={noresult} alt="noresult" />
      <p className="mt-2 fw-bold">Maaf, pencarian Anda tidak ditemukan </p>
    </div>
  );
}

export default NoResult;
