import { ControlPosition } from "leaflet";
import type { MapContainerProps } from "react-leaflet";

export interface MapControls {
  position: ControlPosition;
  type: "zoom" | "rotate" | "fullscreen" | "compass" | "scale";
  options?: Record<string, any>;
}

export interface MapAreaProps {
  base?: {
    url: string;
    attribution: string;
  };
  controls?: MapControls[];
  mapOptions?: MapContainerProps;
  key?: string;
}
