import React, { useEffect, useState } from "react";

interface IPill {
  id: string;
  title: string;
  visible: boolean;
  active: boolean;
}

interface IPills {
  pills: IPill[];
  selectedPill: IPill;
  onClick: (pill: IPill) => void;
  isDisabled?: boolean;
}

const Pills: React.FC<IPills> = ({
  pills,
  onClick,
  isDisabled = false,
  selectedPill,
}) => {
  const initialState: any = {
    pills,
    selectedPill,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const updatedPills = state.pills.map((pill: any) => {
      return {
        ...pill,
        active: selectedPill.id === pill.id,
      };
    });

    const newState = {
      selectedPill,
      pills: [...updatedPills],
    };

    setState(newState);
  }, [selectedPill]);

  const handleClick = (pill: IPill) => {
    if (!isDisabled) {
      onClick(pill);
    }
  };

  return (
    <>
      {state.pills.map((pill: any) => {
        return (
          pill.visible && (
            <div
              key={pill.id}
              className={`cursor-pointer rounded-full py-2 px-4 inline-block mr-4 ${
                pill.active
                  ? "bg-blue-600 text-white font-semibold"
                  : "border-solid border-2 border-black-500"
              }`}
              // className={`${styles.pill} ${
              //   pill.active ? styles.pillActive : ""
              // }`}
              onClick={() => handleClick(pill)}
            >
              {pill.title}
            </div>
          )
        );
      })}
    </>
  );
};

export default Pills;
