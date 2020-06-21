import React from "react";
import {
  hexToRGBA,
  transformNumberToReadableFormat,
} from "../../../utilities/utilities";

interface IInformationPanel {
  panelTitle: string;
  panelNumber: number;
  backgroundColor: string;
  backgroundAlpha: number;
  percentage: string;
  onClosePanel: (panelTitle: string) => void;
}

const InformationPanel: React.FC<IInformationPanel> = ({
  panelTitle,
  panelNumber,
  backgroundColor,
  percentage,
  backgroundAlpha,
  onClosePanel,
}) => {
  if (percentage.startsWith("(0.00")) {
    percentage = "(0.00...)%";
  }

  return (
    <div
      className="rounded-lg w-56 inline-block bg-black mx-5 mt-4 shadow-lg"
      style={{
        backgroundColor: hexToRGBA(backgroundColor, backgroundAlpha),
      }}
    >
      <div className="w-full my-4">
        <div className="text-center pb-2">
          <h1
            style={{ color: backgroundColor }}
            className="pl-4 font-bold text-lg inline-block"
          >
            {panelTitle}
          </h1>

          <span
            aria-label={`Close ${panelTitle} panel`}
            className="float-right mr-4 cursor-pointer text-xl transform -translate-y-2"
            onClick={() => onClosePanel(panelTitle)}
          >
            &times;
          </span>
        </div>
      </div>

      <div className="mb-6">
        <span
          style={{ color: backgroundColor }}
          className="text-2xl ml-6 font-extrabold"
        >
          {`${transformNumberToReadableFormat(panelNumber)}$`}
        </span>

        <span
          style={{ color: backgroundColor }}
          className="text-blue-800 text-lg ml-2 font-semibold"
        >
          {percentage}
        </span>
      </div>
    </div>
  );
};

export default InformationPanel;
