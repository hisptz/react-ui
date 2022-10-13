import { colors } from "@dhis2/ui";
import type { Legend } from "@hisptz/dhis2-utils";
import { geoJSON } from "leaflet";
import React, { useMemo } from "react";
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

export default function Bubble({
  data,
  highestData,
  legends,
  radius,
}: {
  data: ThematicLayerData;
  highestData: number;
  legends: Legend[];
  radius?: { min: number; max: number };
}) {
  const { orgUnit, data: value } = data ?? {};

  const geoJSONObject = orgUnit.geoJSON;
  const center = geoJSON(geoJSONObject).getBounds().getCenter();

  const circleRadius = useMemo(() => {
    return ((value ?? 0) * (radius?.max ?? 50)) / highestData;
  }, [radius, data, highestData]);

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
        radius={circleRadius}
        center={center}>
        <CustomTooltip data={data} />
      </CircleMarker>
    </>
  );
}
