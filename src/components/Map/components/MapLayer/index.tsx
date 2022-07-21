import React from "react";
import BoundaryLayer from "./components/BoundaryLayer";
import { MapLayerProps } from "./interfaces";

export default function MapLayer({ layer, enabled, type }: MapLayerProps) {
  switch (type) {
    case "boundary":
      return <BoundaryLayer {...layer} enabled={enabled} />;
    default:
      return null;
  }
}
