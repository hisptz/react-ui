import React from "react";
import BoundaryLayer from "./components/BoundaryLayer";
import { PointLayer } from "./components/PointLayer";
import ThematicLayer from "./components/ThematicLayer";
import { CustomBoundaryLayer, CustomPointLayer, CustomThematicLayer } from "./interfaces";

export default function MapLayer({ layer, index }: { layer: CustomThematicLayer | CustomBoundaryLayer | CustomPointLayer; index: number }) {
  switch (layer.type) {
    case "overlay":
    case "basemap":
      return <BoundaryLayer {...layer} />;
    case "bubble":
    case "choropleth":
      return <ThematicLayer layerId={layer.id} index={index} />;
    case "point":
      return <PointLayer />;
    default:
      return null;
  }
}
