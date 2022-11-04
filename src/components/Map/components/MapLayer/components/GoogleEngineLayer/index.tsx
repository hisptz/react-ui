import i18n from "@dhis2/d2-i18n";
import React from "react";
import { LayersControl } from "react-leaflet";
import { useBoundaryData } from "../BoundaryLayer/hooks/useBoundaryData";
import useGoogleEngineLayer from "./hooks";

export default function GoogleEngineLayer({ layerId }: { layerId: string }) {
  const options = useGoogleEngineLayer(layerId);
  const orgUnits = useBoundaryData();

  console.log(options);

  return (
    <LayersControl.Overlay name={i18n.t("")}>
      <div>Here I am!!</div>
    </LayersControl.Overlay>
  );
}
