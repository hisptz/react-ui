import { ControlPosition } from "leaflet";
import type { MapContainerProps } from "react-leaflet";
import { CustomBoundaryLayer, CustomPointLayer, EarthEngineLayerConfig, ThematicLayerConfig } from "../../MapLayer/interfaces";

export interface MapControls {
  position: ControlPosition;
  type: "zoom" | "rotate" | "fullscreen" | "compass" | "scale" | "print";
  options?: Record<string, any>;
}

export interface MapLegendConfig {
  enabled: boolean;
  position: ControlPosition;
  collapsible: boolean;
}

export interface MapLayerConfig {
  thematicLayers?: ThematicLayerConfig[];
  boundaryLayers?: CustomBoundaryLayer[];
  pointLayers?: CustomPointLayer[];
  earthEngineLayers?: EarthEngineLayerConfig[];
}

export interface MapAreaProps {
  base?: {
    url: string;
    attribution: string;
  };
  controls?: MapControls[];
  mapOptions?: MapContainerProps;
  legends?: MapLegendConfig;
  layers: MapLayerConfig;
  key?: string;
}
