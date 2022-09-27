import { ControlOptions } from "leaflet";
import React from "react";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

interface CustomControlOptions extends ControlOptions {
  children: React.ReactNode;
}

export function CustomControl({ children, position, ...options }: CustomControlOptions) {
  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div {...options} className={`${positionClass}`}>
      <div style={{ overflow: "hidden", border: "none" }} className="leaflet-control leaflet-bar">
        {children}
      </div>
    </div>
  );
}
