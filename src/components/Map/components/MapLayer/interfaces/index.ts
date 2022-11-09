import type { Legend } from "@hisptz/dhis2-utils";
import { MapOrgUnit, PointOrgUnit } from "../../../interfaces";
import { LegendColorScale } from "../../../utils/colors";

export type BoundaryLayerType = "basemap" | "overlay";
export type ThematicLayerType = "choropleth" | "bubble";

export type GoogleEngineLayerType = "population" | "footprints" | "elevation" | "landCover";

export interface CustomBoundaryLayer extends CustomMapLayer {
  id: string;
  type: BoundaryLayerType;
  enabled: boolean;
}

export interface CustomGoogleEngineLayer extends CustomMapLayer {
  type: GoogleEngineLayerType;
  options?: any;
  aggregations?: string[];
  name: string;
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

export interface CustomThematicPrimitiveLayer {
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

export type MapLayer = CustomBoundaryLayer | CustomThematicPrimitiveLayer | CustomPointLayer | CustomGoogleEngineLayer;

export interface MapLayerProps {
  enabled: boolean;
  type: "boundary" | "thematic" | "external" | "point" | "earthEngine";
  layer: MapLayer;
}
