import React from "react";
import BoundaryLayer from "./components/BoundaryLayer";
import ThematicLayer from "./components/ThematicLayer";
import { CustomBoundaryLayer, CustomThematicLayer } from "./interfaces";

export default function MapLayer(layer: CustomThematicLayer | CustomBoundaryLayer) {
  switch (layer.type) {
    case "overlay":
    case "basemap":
      return <BoundaryLayer {...layer} />;
    case "bubble":
    case "choropleth":
      return <ThematicLayer layerId={layer.id} />;
    default:
      return null;
  }
}
