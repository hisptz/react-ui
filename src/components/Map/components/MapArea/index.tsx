import { uid } from "@hisptz/dhis2-utils";
import { Map as LeafletMap } from "leaflet";
import { isEmpty } from "lodash";
import React, { forwardRef, useRef } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { useMapBounds } from "../../hooks/map";
import MapControl from "../MapControls";
import MapLayer from "../MapLayer";
import MapUpdater from "../MapUpdater";
import { MapAreaProps } from "./interfaces";

const MapArea = ({ layers, base, controls, mapOptions, key }: MapAreaProps, ref: React.Ref<LeafletMap> | undefined) => {
  const { center, bounds } = useMapBounds();
  const { current: id } = useRef<string>(uid());
  const enabledLayers = layers.filter((l) => l.enabled);

  return (
    <div id="map-container" style={{ height: "100%", width: "100%" }}>
      <MapContainer
        attributionControl
        ref={ref}
        id={id}
        center={center}
        bounceAtZoomLimits
        bounds={bounds}
        style={{ height: "100%", width: "100%", minHeight: 500 }}
        key={key}
        {...mapOptions}>
        <MapUpdater bounds={bounds} />
        <TileLayer
          id={id}
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
          <LayersControl hideSingleBase position={"topleft"}>
            {enabledLayers.map((layer) => (
              <MapLayer key={layer.layer.id} {...layer} />
            ))}
          </LayersControl>
        )}
      </MapContainer>
    </div>
  );
};

export default forwardRef(MapArea);
