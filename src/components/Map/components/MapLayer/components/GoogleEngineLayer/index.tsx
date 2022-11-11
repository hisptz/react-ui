import { capitalize } from "lodash";
import React, { useMemo, useRef, useState } from "react";
import { GeoJSON, LayerGroup, LayersControl, Popup, TileLayer, Tooltip } from "react-leaflet";
import { useBoundaryData } from "../BoundaryLayer/hooks/useBoundaryData";
import useGoogleEngineLayer from "./hooks";
import { MapOrgUnit } from "../../../../interfaces";
import { highlightFeature, resetHighlight } from "../../../../utils/map";
import { defaultStyle, highlightStyle } from "../BoundaryLayer";
import { EarthEngine } from "./services/engine";
import { useQuery } from "react-query";
import { geoJSON } from "leaflet";

function EarthEnginePopup({ engine, orgUnit, open, layerRef }: { engine?: EarthEngine; orgUnit: MapOrgUnit; open: boolean; layerRef: any }) {
  const center = useMemo(() => geoJSON(orgUnit.geoJSON).getBounds().getCenter(), [orgUnit]);
  const { data, isLoading, refetch } = useQuery([center, engine], async () => engine?.getValue(center), {});

  return <div></div>;
}

function EarthEngineArea({ area, engine }: { area: MapOrgUnit; engine?: EarthEngine }) {
  const ref = useRef<any>();
  const [openedPopup, setOpenedPopup] = useState<boolean>(false);

  return (
    <GeoJSON
      ref={ref}
      data={area.geoJSON}
      interactive
      eventHandlers={{
        mouseover: (e) => highlightFeature(e, highlightStyle),
        mouseout: (e) => resetHighlight(e, defaultStyle),
      }}
      key={`${area.id}-polygon`}
      pathOptions={defaultStyle}>
      <Tooltip>{area.name}</Tooltip>
      <Popup minWidth={100}>
        <EarthEnginePopup engine={engine} orgUnit={area} open={openedPopup} layerRef={ref} />
      </Popup>
    </GeoJSON>
  );
}

export default function GoogleEngineLayer({ layerId }: { layerId: string }) {
  const { name, type, enabled, url, options, engine } = useGoogleEngineLayer(layerId);
  const orgUnits = useBoundaryData();

  if (!url) return null;

  return (
    <LayersControl.Overlay checked={enabled} name={name ?? capitalize(type)}>
      <LayerGroup>
        <TileLayer id={options?.id} url={url} />
        {orgUnits?.map((area: MapOrgUnit) => {
          return <EarthEngineArea key={`${area.id}-polygon`} area={area} engine={engine} />;
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
