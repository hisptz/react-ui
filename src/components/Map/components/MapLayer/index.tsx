import React from "react";
import BoundaryLayer from "./components/BoundaryLayer";
import ThematicLayer from "./components/ThematicLayer";
import { MapLayerProps } from "./interfaces";

export default function MapLayer({ layer, enabled, type }: MapLayerProps) {
  switch (type) {
    case "boundary":
      return <BoundaryLayer {...layer} enabled={enabled} />;
    case "thematic":
      return <ThematicLayer layer={layer} />;
    default:
      return null;
  }
}
