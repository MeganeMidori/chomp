import React, { ComponentType } from "react";

interface Props {
  top: string,
  side: string,
  position: string,
  color: string
}

export const Balloon: ComponentType<Props> = ({ top, side, position, color }) =>
  position === "left" ? (
    <div
      className={`balloon balloon-${color}`}
      style={{
        top: `${top}px`,
        left: `${side}px`,
        animationDelay: `${Math.random()}s`,
        animationDuration: `${Math.random() + 1}s`,
      }}
    />
  ) : (
    <div
      className={`balloon balloon-${color}`}
      style={{
        top: `${top}px`,
        right: `${side}px`,
        animationDelay: `${Math.random()}s`,
        animationDuration: `${Math.random() + 1}s`,
      }}
    />
  );
export const BottomBalloon: ComponentType<Props> = ({ top, side, position, color }) =>
  position === "left" ? (
    <div
      className={`balloon balloon-${color}`}
      style={{
        zIndex: 10,
        width: "225px",
        bottom: `${top}px`,
        left: `${side}px`,
        animationDelay: `${Math.random()}s`,
        animationDuration: `${Math.random() + 1}s`,
      }}
    />
  ) : (
    <div
      className={`balloon balloon-${color}`}
      style={{
        zIndex: 10,
        width: "225px",
        bottom: `${top}px`,
        right: `${side}px`,
        animationDelay: `${Math.random()}s`,
        animationDuration: `${Math.random() + 1}s`,
      }}
    />
  );
