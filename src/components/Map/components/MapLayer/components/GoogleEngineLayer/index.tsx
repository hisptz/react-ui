import { capitalize } from "lodash";
import React from "react";
import { LayerGroup, LayersControl } from "react-leaflet";
import { useBoundaryData } from "../BoundaryLayer/hooks/useBoundaryData";
import { GoogleEngineComponent } from "./components/GoogleEngineComponent";
import useGoogleEngineLayer, { useGoogleEngineToken } from "./hooks";

export default function GoogleEngineLayer({ layerId }: { layerId: string }) {
  const { options, name, type, enabled } = useGoogleEngineLayer(layerId);
  const { token, refresh, loading } = useGoogleEngineToken();
  const orgUnits = useBoundaryData();

  if (!orgUnits || !token) {
    return null;
  }

  if (loading) {
    return null;
  }

  return (
    <LayersControl.Overlay checked={enabled} name={name ?? capitalize(type)}>
      <LayerGroup>
        {orgUnits?.map((orgUnit) => (
          <GoogleEngineComponent key={`${orgUnit.id}-${options.id}-earth-layer`} refresh={refresh} token={token} orgUnit={orgUnit} options={options} />
        ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
