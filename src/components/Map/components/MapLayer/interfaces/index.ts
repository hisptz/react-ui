export type BoundaryLayerType = "basemap" | "overlay";
export type ThematicLayerType = "choropleth" | "bubble";

export interface BoundaryLayer {
  id: string;
  orgUnits: string[];
  type: BoundaryLayerType;
}

export interface PointLayer {
  id: string;
  orgUnits: string[];
}

export interface ThematicLayerData {
  orgUnit: string;
  data: number;
}

export interface ThematicLayer {
  id: string;
  data: ThematicLayerData[];
  type: ThematicLayerType;
}

export type MapLayer = BoundaryLayer | PointLayer | ThematicLayer;

export interface MapLayerProps {
  layer: MapLayer;
}
