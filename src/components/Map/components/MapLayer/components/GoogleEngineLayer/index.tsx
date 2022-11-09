import { capitalize } from "lodash";
import React from "react";
import { GeoJSON, LayerGroup, LayersControl, Popup, TileLayer, Tooltip } from "react-leaflet";
import { useBoundaryData } from "../BoundaryLayer/hooks/useBoundaryData";
import useGoogleEngineLayer, { useGoogleEngine } from "./hooks";
import { MapOrgUnit } from "../../../../interfaces";
import { highlightFeature, resetHighlight } from "../../../../utils/map";
import { defaultStyle, highlightStyle } from "../BoundaryLayer";

import { Center, CircularLoader, Layer } from "@dhis2/ui";

export default function GoogleEngineLayer({ layerId }: { layerId: string }) {
  const { name, type, enabled } = useGoogleEngineLayer(layerId);
  const orgUnits = useBoundaryData();
  const { imageUrl, options, urlLoading, tokenLoading } = useGoogleEngine({ layerId });

  const loading = urlLoading || tokenLoading;

  if (!imageUrl) return null;

  if (loading) {
    return (
      <Layer level={3000} translucent>
        <Center>
          <CircularLoader small />
        </Center>
      </Layer>
    );
  }

  console.log(imageUrl);

  return (
    <LayersControl.Overlay checked={enabled} name={name ?? capitalize(type)}>
      <LayerGroup>
        <TileLayer id={options.id} url={imageUrl} />
        {orgUnits?.map((area: MapOrgUnit) => {
          return (
            <GeoJSON
              data={area.geoJSON}
              interactive
              eventHandlers={{
                mouseover: (e) => highlightFeature(e, highlightStyle),
                mouseout: (e) => resetHighlight(e, defaultStyle),
              }}
              key={`${area.id}-polygon`}
              pathOptions={defaultStyle}>
              <Tooltip>{area.name}</Tooltip>
              <Popup minWidth={80}>
                <h3>{area.name}</h3>
                <div>
                  <b>Level: </b>
                  {area.level}
                </div>
              </Popup>
            </GeoJSON>
          );
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
