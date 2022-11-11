import React from "react";
import BoundaryLayer from "./components/BoundaryLayer";
import GoogleEngineLayer from "./components/GoogleEngineLayer";
import { PointLayer } from "./components/PointLayer";
import ThematicLayer from "./components/ThematicLayer";
import { CustomBoundaryLayer, CustomGoogleEngineLayer, CustomPointLayer, CustomThematicLayer } from "./interfaces";

export default function MapLayer({
  layer,
  index,
}: {
  layer: CustomThematicLayer | CustomBoundaryLayer | CustomPointLayer | CustomGoogleEngineLayer;
  index: number;
}) {
  switch (layer.type) {
    case "overlay":
    case "basemap":
      return <BoundaryLayer {...layer} />;
    case "bubble":
    case "choropleth":
      return <ThematicLayer layerId={layer.id} index={index} />;
    case "point":
      return <PointLayer />;
    case "population":
    case "elevation":
    case "footprints":
    case "landCover":
      return <GoogleEngineLayer layerId={layer.id} />;
    default:
      return null;
  }
}
