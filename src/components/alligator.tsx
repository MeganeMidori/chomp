import React, { ComponentType, useState, useEffect } from "react";

const Alligator = () => {
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
          <div className="alligator-part alligator-background-open" />
          <div className="alligator-part alligator-body" />
          <div className="alligator-part alligator-tooth" />
          <div className="alligator-part alligator-head-open" />
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
