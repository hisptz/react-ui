import { isEmpty } from "lodash";
import React from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { useMapBounds } from "../../hooks/map";
import MapControl from "../MapControls";
import MapLayer from "../MapLayer";
import MapUpdater from "../MapUpdater";
import { MapAreaProps } from "./interfaces";

export default function MapArea({ layers, base, controls, mapOptions }: MapAreaProps) {
  const { center, bounds } = useMapBounds();
  const enabledLayers = layers.filter((l) => l.enabled);

  return (
    <div id="map-container" style={{ height: "100%", width: "100%" }}>
      <MapContainer center={center} bounceAtZoomLimits bounds={bounds} style={{ height: "100%", width: "100%", minHeight: 500 }} {...mapOptions}>
        <MapUpdater bounds={bounds} />
        <TileLayer
          attribution={
            base?.attribution ??
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="https://carto.com/attribution">CARTO</a>'
          }
          url={base?.url ?? "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"}
        />
        {controls?.map((control) => (
          <MapControl key={`${control.type}-control`} {...control} />
        ))}
        {!isEmpty(enabledLayers) && (
          <LayersControl position={"topleft"}>
            {layers.map((layer) => (
              <MapLayer key={layer.layer.id} {...layer} />
            ))}
          </LayersControl>
        )}
      </MapContainer>
    </div>
  );
}