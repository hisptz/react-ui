import { Map as LeafletMap } from "leaflet";
import React, { forwardRef } from "react";
import MapArea from "./components/MapArea";
import { CustomThematicPrimitiveLayer, MapLayerProps } from "./components/MapLayer/interfaces";
import { MapProvider } from "./components/MapProvider";
import { MapProps } from "./interfaces";
import "leaflet/dist/leaflet.css";

const Map = (
  { orgUnitSelection, pointLayer, boundaryLayer, thematicLayers, periodSelection, mapOptions, key, controls, legends }: MapProps,
  ref: React.Ref<LeafletMap> | undefined
) => {
  const sanitizedLayers: MapLayerProps[] = [
    {
      enabled: boundaryLayer?.enabled ?? false,
      type: "boundary",
      layer: {
        type: "overlay",
        id: "boundary",
        enabled: boundaryLayer?.enabled ?? false,
      },
    },
    {
      enabled: pointLayer?.enabled ?? false,
      type: "point",
      layer: {
        type: "point",
        id: "point",
        enabled: pointLayer?.enabled ?? false,
        ...pointLayer,
      },
    },
    ...(thematicLayers?.map((layer: CustomThematicPrimitiveLayer) => ({
      type: "thematic" as any,
      enabled: layer.enabled,
      layer,
    })) ?? []),
  ];

  return (
    <>
      <MapProvider periodSelection={periodSelection} orgUnitSelection={orgUnitSelection}>
        <MapArea layers={sanitizedLayers.map(({ layer }) => layer)} legends={legends} controls={controls} key={key} ref={ref} mapOptions={mapOptions} />
      </MapProvider>
    </>
  );
};
export default forwardRef(Map);
