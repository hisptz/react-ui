import type { Legend, LegendSet } from "@hisptz/dhis2-utils";
import { MapOrgUnit, PointOrgUnit } from "../../../interfaces";
import { LegendColorScale } from "../../../utils/colors";

export type BoundaryLayerType = "basemap" | "overlay";
export type ThematicLayerType = "choropleth" | "bubble";

export interface CustomBoundaryLayer extends CustomMapLayer {
  id: string;
  type: BoundaryLayerType;
  enabled: boolean;
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
  };
  points?: Array<PointOrgUnit>;
}

export type DataItemType = "dataElement" | "indicator" | "programIndicator";

export interface ThematicLayerDataItem {
  id: string;
  displayName: string;
  type: DataItemType;
  legendSet?: LegendSet;
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

export interface CustomThematicLayer extends CustomMapLayer {
  enabled: boolean;
  name?: string;
  data: ThematicLayerData[];
  dataItem: ThematicLayerDataItem;
  type: ThematicLayerType;
  control?: ThematicLayerControl;
  legends?: Legend[];
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
  enabled: boolean;
}

export interface MapLayerProps {
  enabled: boolean;
  type: "boundary" | "thematic" | "external" | "point";
  layer: CustomBoundaryLayer | CustomThematicPrimitiveLayer | CustomPointLayer;
}
