import { useConfig } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import L from "leaflet";
import { find } from "lodash";
import React from "react";
import { GeoJSON, LayerGroup, LayersControl, Popup, Tooltip } from "react-leaflet";
import { PointOrgUnit } from "../../../../interfaces";
import { useMapLayers } from "../../../MapProvider/hooks";
import { CustomPointLayer } from "../../interfaces";

function getIconUrl({ type, icon }: { icon: string; type: string }, { baseUrl }: { baseUrl: string }) {
  return `${baseUrl}/images/orgunitgroup/${icon ?? "01.png"}`;
}

function getIcon(url: string): L.Icon | undefined {
  return new L.Icon({
    iconUrl: url,
  });
}

export function PointLayer() {
  const { layers } = useMapLayers();
  const pointLayer = find(layers, ["type", "point"]) as CustomPointLayer;
  const { enabled, label, points: orgUnits } = pointLayer ?? {};
  const { baseUrl } = useConfig();

  return (
    <LayersControl.Overlay checked={enabled} name={label ?? i18n.t("Points")}>
      <LayerGroup>
        {orgUnits?.map((area: PointOrgUnit) => {
          return (
            <GeoJSON
              pointToLayer={(_, coordinates) => {
                return L.marker(coordinates, { icon: getIcon(getIconUrl(area.icon, { baseUrl })) });
              }}
              data={area.geoJSON}
              interactive
              key={`${area.id}-polygon`}>
              <Tooltip>{area.name}</Tooltip>
              <Popup minWidth={80}>
                <h3>{area.name}</h3>
              </Popup>
            </GeoJSON>
          );
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
