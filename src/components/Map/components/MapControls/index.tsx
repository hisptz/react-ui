import React from "react";
import { ScaleControl, ZoomControl } from "react-leaflet";
import { MapControls } from "../MapArea/interfaces";
import FullscreenControl from "./components/FullscreenControl";
import DownloadControl from "./components/DownloadControl";

export interface MapControlProps extends MapControls {
  mapId: string;
}

export default function MapControl({ type, options, position, mapId }: MapControlProps) {
  switch (type) {
    case "zoom":
      return <ZoomControl position={position} {...options} />;
    case "scale":
      return <ScaleControl position={position} {...options} />;
    case "fullscreen":
      return <FullscreenControl position={position} {...options} />;
    case "print":
      return <DownloadControl mapId={mapId} position={position} options={options} />;
    default:
      return null;
  }
}
