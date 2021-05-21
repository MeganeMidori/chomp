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
  const maxWidth = 1000;
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
      <div className={`alligator-scale-container  ${isOpen ? '' : 'alligator-closed'}`}>
        <div className={`alligator-container`}>
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

      <svg id="filter">
    <filter id="noise">
      <feTurbulence baseFrequency="0.60" xresult="colorNoise" />
      <feColorMatrix in="colorNoise" type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/>
      <feComposite operator="in" in2="SourceGraphic" result="monoNoise"/>
      <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
    </filter>
  </svg>

      <style>{`
      .alligator-container {
          transform: scale(${alligatorScale})
      }
      .alligator-scale-container {
          height: ${alligatorHeight * alligatorScale}px;
          width: ${alligatorWidth * alligatorScale}px;
      }

      .alligator-closed {
        filter: saturate(300%) hue-rotate(-20deg) url(#noise);
        animation-name: shook;
        animation-duration: 0.1s;
        animation-direction: alternate;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
  `}</style>
    </>
  );
};

export default Alligator;
