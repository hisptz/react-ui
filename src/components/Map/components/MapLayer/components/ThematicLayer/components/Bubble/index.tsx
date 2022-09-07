import { colors } from "@dhis2/ui";
import { geoJSON } from "leaflet";
import React from "react";
import { CircleMarker } from "react-leaflet";
import { defaultLegendSet } from "../../../../../../constants/legendSet";
import { getColorFromLegendSet, highlightFeature, resetHighlight } from "../../../../../../utils/map";
import { ThematicLayerData } from "../../../../interfaces";
import CustomTooltip from "../CustomTooltip";

const defaultStyle = {
  weight: 1,
};
const highlightStyle = {
  weight: 2,
};

export default function Bubble({ data }: { data: ThematicLayerData }) {
  const { orgUnit, data: value, dataItem } = data ?? {};

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
          fillColor: getColorFromLegendSet(dataItem.legendSet ?? defaultLegendSet, data.data),
          fillOpacity: 1,
          color: colors.grey900,
          weight: 1,
        }}
        radius={(value ?? 0) / 5}
        center={center}>
        <CustomTooltip data={data} />
      </CircleMarker>
    </>
  );
}
