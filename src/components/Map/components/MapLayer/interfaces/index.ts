import type { LegendSet } from "@hisptz/dhis2-utils";
import { MapOrgUnit } from "../../../interfaces";

export type BoundaryLayerType = "basemap" | "overlay";
export type ThematicLayerType = "choropleth" | "bubble";

export interface CustomBoundaryLayer extends CustomMapLayer {
  id: string;
  type: BoundaryLayerType;
}

export interface CustomPointLayer extends CustomMapLayer {
  id: string;
  type: "point";
}

export type DataItemType = "dataElement" | "indicator" | "programIndicator";

export interface ThematicLayerDataItem {
  id: string;
  displayName: string;
  type: DataItemType;
  legendSet?: LegendSet;
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

export interface CustomThematicLayer extends CustomMapLayer {
  enabled: boolean;
  name?: string;
  data: ThematicLayerData[];
  dataItem: ThematicLayerDataItem;
  type: ThematicLayerType;
  control?: ThematicLayerControl;
}

export interface CustomThematicPrimitiveLayer {
  id: string;
  data?: ThematicLayerRawData[];
  enabled: boolean;
  name?: string;
  dataItem: ThematicLayerDataItem;
  type: ThematicLayerType;
  control?: ThematicLayerControl;
}

export interface CustomMapLayer {
  id: string;
  type: string;
}

export interface MapLayerProps {
  enabled: boolean;
  type: "boundary" | "thematic" | "external";
  layer: CustomBoundaryLayer | CustomThematicPrimitiveLayer;
}
