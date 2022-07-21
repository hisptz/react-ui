import React from "react";
import { BoundaryLayer as BoundaryLayerInterface } from "../../interfaces";

export interface BoundaryLayerProps extends BoundaryLayerInterface {
  enabled?: boolean;
}

export default function BoundaryLayer(props: BoundaryLayerProps) {
  return <div>Layer</div>;
}
