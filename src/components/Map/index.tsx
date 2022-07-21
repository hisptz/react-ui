import React from "react";
import { Helmet } from "react-helmet";
import MapArea from "./components/MapArea";
import { MapProvider } from "./components/MapProvider";
import { MapProps } from "./interfaces";

export default function Map({ orgUnitSelection }: MapProps) {
  return (
    <MapProvider orgUnitSelection={orgUnitSelection}>
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
            enabled: true,
            type: "boundary",
            layer: {
              type: "overlay",
              id: "boundary",
            },
          },
        ]}
      />
    </MapProvider>
  );
}
