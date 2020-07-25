import React from "react";
import thinkingFace from "../../../images/thinking-face.jpg";

const NoDataAvailable: React.FC<any> = () => {
  return (
    <div className=" inset-0 m-auto mx-auto h-32 w-full padding-auto pb-20 pt-16 inset-0 text-5x2">
      <div className="flex flex-col items-center">
        <img
          alt={"Thinking face emoji"}
          src={thinkingFace}
          width={100}
          height={100}
        ></img>
        <h1 className="font-bold block w-100 text-4x1 mb-2">
          No results! Try another search...
        </h1>
      </div>
    </div>
  );
};

export default NoDataAvailable;
