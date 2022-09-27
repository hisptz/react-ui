import { uid } from "@hisptz/dhis2-utils";
import { Map as LeafletMap } from "leaflet";
import { isEmpty } from "lodash";
import React, { forwardRef, useRef } from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import { useMapBounds } from "../../hooks/map";
import MapControl from "../MapControls";
import MapLayer from "../MapLayer";
import LegendArea from "../MapLayer/components/LegendArea";
import { CustomThematicLayer } from "../MapLayer/interfaces";
import { MapLayersProvider } from "../MapProvider/components/MapLayerProvider";
import { useMapLayers } from "../MapProvider/hooks";
import MapUpdater from "../MapUpdater";
import { MapAreaProps, MapControls, MapLegendConfig } from "./interfaces";

function MapLayerArea({
  id,
  base,
  controls,
  legends,
}: {
  id: string;
  base?: {
    url: string;
    attribution: string;
  };
  controls?: MapControls[];
  legends?: MapLegendConfig;
}) {
  const { layers } = useMapLayers();

  console.log(layers);
  return (
    <>
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
      {!isEmpty(layers) && (
        <LayersControl hideSingleBase position={"topleft"}>
          {(layers as CustomThematicLayer[]).map((layer: CustomThematicLayer) => (
            <MapLayer key={layer.id} {...layer} />
          ))}
        </LayersControl>
      )}
      {!isEmpty(layers) && legends && <LegendArea legends={legends} layers={layers as CustomThematicLayer[]} position={"topright"} />}
    </>
  );
}

const MapArea = ({ base, controls, mapOptions, key, legends, layers }: MapAreaProps, ref: React.Ref<LeafletMap> | undefined) => {
  const { center, bounds } = useMapBounds();
  const { current: id } = useRef<string>(uid());
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
        <MapLayersProvider layers={layers}>
          <MapLayerArea base={base} id={id} controls={controls} legends={legends} />
        </MapLayersProvider>
      </MapContainer>
    </div>
  );
};

export default forwardRef(MapArea);
