import { colors } from "@dhis2/ui";
import { Legend } from "@hisptz/dhis2-utils";
import { geoJSON } from "leaflet";
import React from "react";
import { CircleMarker } from "react-leaflet";
import { getColorFromLegendSet, highlightFeature, resetHighlight } from "../../../../../../utils/map";
import { ThematicLayerData } from "../../../../interfaces";
import CustomTooltip from "../CustomTooltip";

const defaultStyle = {
  weight: 1,
};
const highlightStyle = {
  weight: 2,
};

export default function Bubble({ data, lowestData, legends }: { data: ThematicLayerData; lowestData: number; legends: Legend[] }) {
  const { orgUnit, data: value } = data ?? {};

  const geoJSONObject = orgUnit.geoJSON;
  const center = geoJSON(geoJSONObject).getBounds().getCenter();

  return (
    <>
      <CircleMarker
        interactive
        eventHandlers={{
          mouseover: (e) => highlightFeature(e, highlightStyle),
          mouseout: (e) => resetHighlight(e, defaultStyle),
        }}
        pathOptions={{
          fillColor: getColorFromLegendSet(legends, data.data),
          fillOpacity: 1,
          color: colors.grey900,
          weight: 1,
        }}
        radius={((value ?? 0) / lowestData) * 8}
        center={center}>
        <CustomTooltip data={data} />
      </CircleMarker>
    </>
  );
}
