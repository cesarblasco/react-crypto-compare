import React, { useContext } from "react";
import {
  hexToRGBA,
  transformNumberToReadableFormat,
} from "../../../utilities/utilities";
import { AppContext } from "../../../contexts/app-context/AppContext";
import { onCloseAssetPanelActionCreator } from "../../../contexts/app-context/action-creators/ActionCreators";

interface IInformationPanel {
  panelTitle: string;
  panelNumber: number;
  backgroundColor: string;
  backgroundAlpha: number;
  percentage: string;
  panelSubtitle?: string;
}

const InformationPanel: React.FC<IInformationPanel> = ({
  panelTitle,
  panelSubtitle,
  panelNumber,
  backgroundColor,
  percentage,
  backgroundAlpha,
}) => {
  const { dispatch } = useContext(AppContext);

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
        <div className="text-center pl-4">
          <h1
            style={{ color: backgroundColor }}
            className="font-bold text-lg inline-block"
          >
            {panelTitle}
          </h1>

          <span
            aria-label={`Close ${panelTitle} panel`}
            className="float-right mr-4 cursor-pointer text-xl transform -translate-y-2"
            onClick={() => dispatch(onCloseAssetPanelActionCreator({panelTitle}))}
          >
            &times;
          </span>

          {panelSubtitle && (
            <h2
              className="text-sm font-bold truncate"
              style={{ color: backgroundColor }}
            >
              ({panelSubtitle})
            </h2>
          )}
        </div>
      </div>

      <div className="mb-6">
        <span
          style={{ color: backgroundColor }}
          className="text-2xl ml-6 font-extrabold"
        >
          {`$${transformNumberToReadableFormat(panelNumber)}`}
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
