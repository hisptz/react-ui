import { useCenterMap } from "../../hooks/map";
import React from "react";
import { LatLngTuple } from "leaflet";

export default function MapUpdater({ bounds }: { bounds: LatLngTuple[] }) {
  const ref = useCenterMap({ bounds });
  return <div style={{ width: "100%", height: "100%" }} ref={ref}></div>;
}
