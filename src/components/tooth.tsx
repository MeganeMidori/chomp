import React, { ComponentType } from "react";

interface Props {
  tooth: number;
  toothState: number;
  bet: number;
  onDown: (tooth: number) => void;
}

const Teeth: ComponentType<Props> = ({ tooth, toothState, bet, onDown }) => {
  if (toothState === 1) {
    return (
      <>
        <div
          className={`tooth-anchor tooth-anchor-${tooth}`}
          onClick={() => {
            onDown(tooth - 1);
          }}
        />
        <div
          className={`alligator-part alligator-tooth alligator-tooth-${tooth}${
            bet + 1 === tooth ? "-select" : ""
          }`}
        />
      </>
    );
  }
  return (
    <div
      className={`alligator-part alligator-tooth alligator-tooth-${tooth}-down`}
    />
  );
};

export default Teeth;
