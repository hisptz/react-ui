import { Map as LeafletMap } from "leaflet";
import React, { forwardRef, useMemo } from "react";
import MapArea from "./components/MapArea";
import { CustomThematicPrimitiveLayer, MapLayerProps } from "./components/MapLayer/interfaces";
import { MapProvider } from "./components/MapProvider";
import { MapProps } from "./interfaces";
import "leaflet/dist/leaflet.css";

const Map = (
  { orgUnitSelection, boundaryLayer, thematicLayers, periodSelection, mapOptions, key, controls }: MapProps,
  ref: React.Ref<LeafletMap> | undefined
) => {
  const enabledThematicLayers = useMemo(() => thematicLayers?.filter((layer: any) => layer.enabled) ?? [], [thematicLayers]);
  const sanitizedLayers: MapLayerProps[] = [
    {
      enabled: boundaryLayer?.enabled ?? false,
      type: "boundary",
      layer: {
        type: "overlay",
        id: "boundary",
      },
    },
    ...(enabledThematicLayers.map((layer: CustomThematicPrimitiveLayer) => ({
      type: "thematic" as any,
      enabled: layer.enabled,
      layer,
    })) ?? []),
  ];

  return (
    <MapProvider layers={sanitizedLayers.map(({ layer }) => layer)} periodSelection={periodSelection} orgUnitSelection={orgUnitSelection}>
      <MapArea controls={controls} key={key} ref={ref} mapOptions={mapOptions} />
    </MapProvider>
  );
};
export default forwardRef(Map);
