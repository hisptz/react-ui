import { capitalize } from "lodash";
import React from "react";
import { GeoJSON, LayerGroup, LayersControl, Popup, TileLayer, Tooltip } from "react-leaflet";
import { useBoundaryData } from "../BoundaryLayer/hooks/useBoundaryData";
import useGoogleEngineLayer from "./hooks";
import { MapOrgUnit } from "../../../../interfaces";
import { highlightFeature, resetHighlight } from "../../../../utils/map";
import { defaultStyle, highlightStyle } from "../BoundaryLayer";

export default function GoogleEngineLayer({ layerId }: { layerId: string }) {
  const { name, type, enabled, url, options } = useGoogleEngineLayer(layerId);
  const orgUnits = useBoundaryData();

  if (!url) return null;

  return (
    <LayersControl.Overlay checked={enabled} name={name ?? capitalize(type)}>
      <LayerGroup>
        <TileLayer id={options?.id} url={url} />
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
