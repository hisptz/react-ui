import type { LegendSet } from "@hisptz/dhis2-utils";
import { MapOrgUnit } from "../../../interfaces";

export type BoundaryLayerType = "basemap" | "overlay";
export type ThematicLayerType = "choropleth" | "bubble";

export interface BoundaryLayer {
  id: string;
  type: BoundaryLayerType;
}

export interface PointLayer {
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

export interface ThematicLayer {
  enabled: boolean;
  name?: string;
  id: string;
  data: ThematicLayerData[];
  dataItem: ThematicLayerDataItem;
  type: ThematicLayerType;
  control?: ThematicLayerControl;
}

export type MapLayer = BoundaryLayer | PointLayer | ThematicLayer;

export interface MapLayerProps {
  enabled: boolean;
  type: "boundary" | "thematic";
  layer: MapLayer | any;
}
