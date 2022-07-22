import React, { useMemo } from "react";
import { Helmet } from "react-helmet";
import MapArea from "./components/MapArea";
import { ThematicLayer } from "./components/MapLayer/interfaces";
import { MapProvider } from "./components/MapProvider";
import { MapProps } from "./interfaces";

export default function Map({ orgUnitSelection, boundaryLayer, thematicLayers, periodSelection }: MapProps) {
  const enabledThematicLayers = useMemo(() => thematicLayers?.filter((layer: any) => layer.enabled) ?? [], [thematicLayers]);
  console.log(enabledThematicLayers);
  return (
    <MapProvider periodSelection={periodSelection} orgUnitSelection={orgUnitSelection}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossOrigin=""
        />
      </Helmet>
      <MapArea
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
      />
    </MapProvider>
  );
}
