import i18n from "@dhis2/d2-i18n";
import { colors } from "@dhis2/ui";
import { flatten } from "lodash";
import React from "react";
import { LayerGroup, LayersControl, Polygon, Popup, Tooltip } from "react-leaflet";
import { MapOrgUnit } from "../../../../interfaces";
import { convertCoordinates, highlightFeature, resetHighlight } from "../../../../utils/map";
import { BoundaryLayer as BoundaryLayerInterface } from "../../interfaces";
import { useBoundaryData } from "./hooks/useBoundaryData";

const defaultStyle = {
  weight: 1,
  color: colors.grey900,
  fillColor: colors.grey900,
  fillOpacity: 0.0,
};
const highlightStyle = {
  weight: 2,
  color: colors.grey900,
  dashArray: "",
  fillOpacity: 0.1,
};

export interface BoundaryLayerProps extends BoundaryLayerInterface {
  enabled?: boolean;
}

export default function BoundaryLayer(props: BoundaryLayerProps) {
  const { enabled = true } = props;
  const orgUnits = useBoundaryData();

  if (!enabled) {
    return null;
  }

  return (
    <LayersControl.Overlay checked={enabled} name={i18n.t("Boundaries")}>
      <LayerGroup>
        {orgUnits?.map((area: MapOrgUnit) => {
          const bounds: any =
            typeof area.bounds?.[0] === "number"
              ? convertCoordinates(area.bounds as any)
              : flatten(area.bounds)?.map((points: any) => {
                  if (!points) {
                    return [];
                  }
                  if (typeof points[0] === "number") {
                    return convertCoordinates(points);
                  }
                  return points?.map(convertCoordinates);
                });
          return (
            <Polygon
              interactive
              eventHandlers={{
                mouseover: (e) => highlightFeature(e, highlightStyle),
                mouseout: (e) => resetHighlight(e, defaultStyle),
              }}
              key={`${area.id}-polygon`}
              pathOptions={defaultStyle}
              positions={bounds}>
              <Tooltip>{area.name}</Tooltip>
              <Popup minWidth={80}>
                <h3>{area.name}</h3>
                <div>
                  <b>Level: </b>
                  {area.level}
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
