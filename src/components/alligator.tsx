import React, { ComponentType, useState, useEffect } from "react";
import Teeth from "./teeth";

interface Props {
  teeth: Array<number>;
  bet: number;
  onDown: (tooth: number) => void;
  isOpen: boolean;
}

const Alligator: ComponentType<Props> = ({ teeth, bet, onDown, isOpen }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const maxWidth = 600;
  const alligatorWidth = 1493;
  const alligatorHeight = 1202;
  const [alligatorScale, setAlligatorScale] = useState(
    windowWidth / alligatorWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    setAlligatorScale(Math.min(windowWidth, maxWidth) / alligatorWidth);
  }, [windowWidth]);

  return (
    <>
      <div className="alligator-scale-container">
        <div className="alligator-container">
          <div
            className={`alligator-part alligator-background-${
              isOpen ? "open" : "closed"
            }`}
          />
          <div className="alligator-part alligator-body" />
          {isOpen && <Teeth teeth={teeth} bet={bet} onDown={onDown} />}
          <div
            className={`alligator-part alligator-head-${
              isOpen ? "open" : "closed"
            }`}
          />
        </div>
      </div>

      <style>{`
      .alligator-container {
          transform: scale(${alligatorScale})
      }
      .alligator-scale-container {
          height: ${alligatorHeight * alligatorScale}px;
          width: ${alligatorWidth * alligatorScale}px;
      }
  `}</style>
    </>
  );
};

export default Alligator;
