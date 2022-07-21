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

export interface ThematicLayerData {
  orgUnit: string;
  data: number;
  type: ThematicLayerType;
}

export interface ThematicLayer {
  id: string;
  data: ThematicLayerData[];
  type: ThematicLayerType;
}

export type MapLayer = BoundaryLayer | PointLayer | ThematicLayer;

export interface MapLayerProps {
  enabled: boolean;
  type: "boundary" | "thematic";
  layer: MapLayer | any;
}
