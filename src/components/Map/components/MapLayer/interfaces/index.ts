import type { LegendSet } from "@hisptz/dhis2-utils";

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

export interface ThematicLayer {
  enabled: boolean;
  id: string;
  dataItem: ThematicLayerDataItem;
  type: ThematicLayerType;
}

export type MapLayer = BoundaryLayer | PointLayer | ThematicLayer;

export interface MapLayerProps {
  enabled: boolean;
  type: "boundary" | "thematic";
  layer: MapLayer | any;
}
