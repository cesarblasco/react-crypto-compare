import React from "react";

const NoDataAvailable: React.FC<any> = () => {
  return (
    <div className="absolute flex justify-center pb-20 pt-16 inset-0 m-auto h-32 w-3/6 text-5x2 bg-gray-600">
      <div className="flex flex-col">
        <h1 className="font-bold block w-100 text-4x1 mb-2">
          No matches found! try another search term...
        </h1>
      </div>
    </div>
  );
};

export default NoDataAvailable;
