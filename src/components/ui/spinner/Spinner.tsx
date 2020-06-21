import React from "react";
import spinner from "../../../images/spinner.svg";

const Spinner: React.FC<any> = () => {
  return <img className="absolute inset-0 m-auto h-32 w-32" src={spinner} />;
};

export default Spinner;
