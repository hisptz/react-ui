import type { Legend } from "@hisptz/dhis2-utils";
import { MapOrgUnit, PointOrgUnit } from "../../../interfaces";
import { LegendColorScale } from "../../../utils/colors";
import { EarthEngineOptions } from "../components/GoogleEngineLayer/interfaces";
import { EarthEngine } from "../components/GoogleEngineLayer/services/engine";

export type BoundaryLayerType = "basemap" | "overlay";
export type ThematicLayerType = "choropleth" | "bubble";

export const SUPPORTED_EARTH_ENGINE_LAYERS = ["population", "footprints", "elevation", "landCover"];

export type GoogleEngineLayerType = "population" | "footprints" | "elevation" | "landCover";

export interface CustomBoundaryLayer extends CustomMapLayer {
  id: string;
  type: BoundaryLayerType;
  enabled: boolean;
}

export interface EarthEngineLayerConfig extends CustomMapLayer {
  type: GoogleEngineLayerType;
  aggregations?: string[];
  name?: string;
  filters?: {
    period: string;
  };
  params?: {
    min: number;
    max: number;
    palette?: string;
  };
}

export interface CustomGoogleEngineLayer extends CustomMapLayer {
  type: GoogleEngineLayerType;
  options: EarthEngineOptions;
  aggregations?: string[];
  name: string;
  url: string;
  engine?: EarthEngine;
}

export interface CustomPointLayer extends CustomMapLayer {
  id: string;
  type: "point";
  label?: string;
  level?: string | number;
  group?: string;
  style?: {
    icon?: string;
    groupSet?: string;
    orgUnitGroups?: Array<{ name: string; symbol: string }>;
  };
  points?: Array<PointOrgUnit>;
}

export type DataItemType = "dataElement" | "indicator" | "programIndicator";

export interface ThematicLayerDataItem {
  id: string;
  displayName: string;
  type: DataItemType;
  legendSet?: string;
  legendConfig?: {
    colorClass: LegendColorScale;
    scale: number;
  };
}

export interface ThematicLayerControl {
  position: "topleft" | "topright" | "bottomleft" | "bottomright";
  enabled: boolean;
}

export interface ThematicLayerData {
  orgUnit: MapOrgUnit;
  data?: number;
  dataItem: ThematicLayerDataItem;
}

export interface ThematicLayerRawData {
  orgUnit: string;
  data?: number;
  dataItem: string;
}

export interface CustomChoroplethLayer extends CustomMapLayer {
  enabled: boolean;
  name?: string;
  data: ThematicLayerData[];
  dataItem: ThematicLayerDataItem;
  type: "choropleth";
  control?: ThematicLayerControl;
  legends?: Legend[];
}

export interface CustomBubbleLayer extends CustomMapLayer {
  enabled: boolean;
  name?: string;
  data: ThematicLayerData[];
  dataItem: ThematicLayerDataItem;
  type: "bubble";
  control?: ThematicLayerControl;
  legends?: Legend[];
  radius?: {
    min: number;
    max: number;
  };
}

export type CustomThematicLayer = CustomBubbleLayer | CustomChoroplethLayer;

export interface ThematicLayerConfig {
  id: string;
  data?: ThematicLayerRawData[];
  enabled: boolean;
  name?: string;
  dataItem: ThematicLayerDataItem;
  type: ThematicLayerType;
  control?: ThematicLayerControl;
  radius?: {
    min: number;
    max: number;
  };
}

export interface CustomMapLayer {
  id: string;
  type: string;
  enabled: boolean;
}

export type MapLayer = CustomBoundaryLayer | ThematicLayerConfig | CustomPointLayer | CustomGoogleEngineLayer;

export interface MapLayerProps {
  enabled: boolean;
  type: "boundary" | "thematic" | "external" | "point" | "earthEngine";
  layer: MapLayer;
}
