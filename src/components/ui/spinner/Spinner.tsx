import React from "react";
import spinner from "../../../images/spinner.svg";

const Spinner: React.FC<any> = () => {
  return (
    <img
      className="inset-0 m-auto h-32 w-32"
      alt="loading spinner"
      src={spinner}
    />
  );
};

export default Spinner;
