import i18n from "@dhis2/d2-i18n";
import { createLayerComponent } from "@react-leaflet/core";
import React from "react";
import { LayerGroup, LayersControl } from "react-leaflet";
import { MapOrgUnit } from "../../../../interfaces";
import { useBoundaryData } from "../BoundaryLayer/hooks/useBoundaryData";
import useGoogleEngineLayer from "./hooks";
import { EarthEngine } from "./services/engine";

export const GoogleEngineLayerComponent = createLayerComponent(
  (props, context) => {
    const { options } = props;
    return new EarthEngine(options);
  },
  (instance, props, prevProps) => {}
);

export default function GoogleEngineLayer({ layerId }: { layerId: string }) {
  const options = useGoogleEngineLayer(layerId);
  const orgUnits = useBoundaryData();

  return (
    <LayersControl.Overlay name={i18n.t("")}>
      <LayerGroup>
        {orgUnits?.map((area: MapOrgUnit) => {
          return <GoogleEngineLayerComponent />;
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
