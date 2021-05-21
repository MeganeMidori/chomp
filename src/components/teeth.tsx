import React, { ComponentType } from "react";
import Tooth from "./tooth";

interface Props {
  teeth: Array<number>,
  bet: number,
  onDown: (tooth: number) => void,
}

const Teeth: ComponentType<Props> = ({ teeth, bet, onDown }) => {
  return (
    <>
      {teeth.map((tooth, i) => (
        <Tooth tooth={i+1} toothState={tooth} bet={bet} onDown={onDown} />
      ))}
    </>
  );
};

export default Teeth;
