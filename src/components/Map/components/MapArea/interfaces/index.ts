import { MapLayerProps } from "../../MapLayer/interfaces";

export interface MapControls {
  enabled: boolean;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  type: "zoom" | "rotate" | "fullscreen" | "compass";
}

export interface MapAreaProps {
  layers: MapLayerProps[];
  base?: {
    url: string;
    attribution: string;
  };
  controls?: MapControls[];
}
