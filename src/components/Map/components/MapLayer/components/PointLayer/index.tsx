import { useConfig } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import L from "leaflet";
import React from "react";
import { GeoJSON, LayerGroup, LayersControl, Popup, Tooltip } from "react-leaflet";
import { PointOrgUnit } from "../../../../interfaces";
import { getIcon, getIconUrl } from "../../../../utils/helpers";
import { usePointLayer } from "./hooks";

export function PointLayer() {
  const pointLayer = usePointLayer();
  const { enabled, label, points: orgUnits, style } = pointLayer ?? {};
  const { baseUrl } = useConfig();
  return (
    <LayersControl.Overlay checked={enabled} name={label ?? i18n.t("Points")}>
      <LayerGroup>
        {orgUnits?.map((area: PointOrgUnit) => {
          return (
            <GeoJSON
              pointToLayer={(_, coordinates) => {
                return L.marker(coordinates, { icon: getIcon(getIconUrl(area.icon.icon ?? style?.icon, { baseUrl })) });
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
