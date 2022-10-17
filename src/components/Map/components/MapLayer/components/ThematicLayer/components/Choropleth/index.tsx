import { colors } from "@dhis2/ui";
import type { Legend } from "@hisptz/dhis2-utils";
import React from "react";
import { GeoJSON } from "react-leaflet";
import { MapOrgUnit } from "../../../../../../interfaces";
import { getColorFromLegendSet, highlightFeature, resetHighlight } from "../../../../../../utils/map";
import { ThematicLayerDataItem } from "../../../../interfaces";
import CustomTooltip from "../CustomTooltip";

const defaultStyle = {
  weight: 1,
};
const highlightStyle = {
  weight: 2,
};

export default function Choropleth({ data, legends }: { data: { orgUnit: MapOrgUnit; data?: number; dataItem: ThematicLayerDataItem }; legends: Legend[] }) {
  const { orgUnit } = data;
  return (
    <>
      <GeoJSON
        data={orgUnit.geoJSON}
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
        key={`${data.dataItem.id}-layer`}>
        <CustomTooltip data={data} />
      </GeoJSON>
    </>
  );
}
