import React from "react";
import { ScaleControl, ZoomControl } from "react-leaflet";
import { MapControls } from "../MapArea/interfaces";
import FullscreenControl from "./FullscreenControl";

export default function MapControl({ type, options, position }: MapControls) {
  switch (type) {
    case "zoom":
      return <ZoomControl position={position} {...options} />;
    case "scale":
      return <ScaleControl position={position} {...options} />;
    case "fullscreen":
      return <FullscreenControl position={position} {...options} />;
    default:
      return null;
  }
}
