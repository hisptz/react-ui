import { Map as LeafletMap } from "leaflet";
import React, { forwardRef, useMemo } from "react";
import MapArea from "./components/MapArea";
import { ThematicLayer } from "./components/MapLayer/interfaces";
import { MapProvider } from "./components/MapProvider";
import { MapProps } from "./interfaces";
import "leaflet/dist/leaflet.css";

const Map = (
  { orgUnitSelection, boundaryLayer, thematicLayers, periodSelection, mapOptions, key, controls }: MapProps,
  ref: React.Ref<LeafletMap> | undefined
) => {
  const enabledThematicLayers = useMemo(() => thematicLayers?.filter((layer: any) => layer.enabled) ?? [], [thematicLayers]);
  return (
    <MapProvider periodSelection={periodSelection} orgUnitSelection={orgUnitSelection}>
      <MapArea
        controls={controls}
        key={key}
        ref={ref}
        layers={[
          {
            enabled: boundaryLayer?.enabled ?? false,
            type: "boundary",
            layer: {
              type: "overlay",
              id: "boundary",
            },
          },
          ...(enabledThematicLayers.map((layer: ThematicLayer) => ({
            type: "thematic" as any,
            enabled: layer.enabled,
            layer,
          })) ?? []),
        ]}
        mapOptions={mapOptions}
      />
    </MapProvider>
  );
};
export default forwardRef(Map);
