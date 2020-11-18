import React, { useState, useEffect } from "react";

interface IToasty {
  title: string;
  // Use they key value to remount the component so that when duration prop is set, the timeouts are handled correctly after clearing it for the first time
  // make sure the value is different when you actually want to remount the component, or keep the same value for the key to not remount
  // https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
  key: any;
  backgroundColorClass?: string;
  message?: any;
  duration?: number;
}

const Toasty: React.FC<IToasty> = ({
  title,
  message,
  duration = null,
  backgroundColorClass,
}) => {
  const [isDisplayed, setIsDisplayed] = useState(true);
  let closeToastyTimeout: any;

  const onCloseToasty = () => {
    setIsDisplayed(false);
    clearTimeout(closeToastyTimeout);
  };

  useEffect(() => {
    if (duration) {
      closeToastyTimeout = setTimeout(() => {
        setIsDisplayed(false);
      }, duration);
    }

    return () => clearTimeout(closeToastyTimeout);
  }, [title, message]);

  const pauseCloseToastyTimeout = () => {
    if (duration) {
      clearTimeout(closeToastyTimeout);
    }
  };

  const resetCloseToastyTimeout = () => {
    if (duration) {
      closeToastyTimeout = setTimeout(() => {
        setIsDisplayed(false);
      }, duration);
    }
  };

  return (
    <>
      {isDisplayed && (
        <dialog
          open
          onMouseOver={pauseCloseToastyTimeout}
          onMouseLeave={resetCloseToastyTimeout}
          className={`fixed right-0 p-4 ${
            backgroundColorClass ? backgroundColorClass : "bg-green-500"
          } text-white rounded-lg w-64 mr-16 mt-10 shadow-lg`}
        >
          <span
            aria-label="Close toasty message"
            className="float-right mr-4 m cursor-pointer text-xl"
            onClick={onCloseToasty}
          >
            &times;
          </span>
          <div className="pb-2 w-75">
            <h1
              className="font-bold text-lg inline-block"
              style={{ maxWidth: "85%" }}
            >
              {title}
            </h1>
          </div>
          <div
            className="text-2x1"
            dangerouslySetInnerHTML={{ __html: message }}
          ></div>
        </dialog>
      )}
    </>
  );
};

export default Toasty;
