import { Map as LeafletMap } from "leaflet";
import React, { forwardRef } from "react";
import MapArea from "./components/MapArea";
import { CustomBoundaryLayer, CustomPointLayer } from "./components/MapLayer/interfaces";
import { MapProvider } from "./components/MapProvider";
import { MapProps } from "./interfaces";
import "leaflet/dist/leaflet.css";

const Map = (
  { orgUnitSelection, pointLayer, boundaryLayer, thematicLayers, earthEngineLayers, periodSelection, mapOptions, key, controls, legends }: MapProps,
  ref: React.Ref<LeafletMap> | undefined
) => {
  const sanitizedPointLayers: CustomPointLayer[] = [
    {
      type: "point",
      id: "point",
      enabled: pointLayer?.enabled ?? false,
      ...pointLayer,
    },
  ];
  const sanitizedBoundaryLayers: CustomBoundaryLayer[] = [
    {
      type: "overlay",
      id: "boundary",
      enabled: boundaryLayer?.enabled ?? false,
    },
  ];

  return (
    <>
      <MapProvider periodSelection={periodSelection} orgUnitSelection={orgUnitSelection}>
        <MapArea
          layers={{
            thematicLayers,
            earthEngineLayers,
            boundaryLayers: sanitizedBoundaryLayers,
            pointLayers: sanitizedPointLayers,
          }}
          legends={legends}
          controls={controls}
          key={key}
          ref={ref}
          mapOptions={mapOptions}
        />
      </MapProvider>
    </>
  );
};
export default forwardRef(Map);

export * from "./components/EarthEngineLayerConfiguration";
export * from "./components/ThematicLayerConfiguration";
export * from "./interfaces";
export * from "./constants/colors";
