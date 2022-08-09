import { colors } from "@dhis2/ui";
import React from "react";
import { GeoJSON, Popup, Tooltip } from "react-leaflet";
import { defaultLegendSet } from "../../../../../../constants/legendSet";
import { MapOrgUnit } from "../../../../../../interfaces";
import { getColorFromLegendSet, highlightFeature, resetHighlight } from "../../../../../../utils/map";
import { ThematicLayerDataItem } from "../../../../interfaces";

const defaultStyle = {
  weight: 1,
};
const highlightStyle = {
  weight: 2,
};

export default function Choropleth({ data }: { data: { orgUnit: MapOrgUnit; data?: number; dataItem: ThematicLayerDataItem } }) {
  const { dataItem, orgUnit } = data;
  return (
    <>
      <GeoJSON
        data={orgUnit.geoJSON}
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
        key={`${data.dataItem.id}-layer`}>
        <Tooltip>
          {data?.orgUnit?.name} ({data?.data})
        </Tooltip>
        <Popup minWidth={80}>
          <h3>{data?.orgUnit?.name}</h3>
          <div>
            <b>Level: </b>
            {data?.orgUnit?.level}
          </div>
          <div>
            <b>{dataItem?.displayName}: </b>
            {data?.data}
          </div>
        </Popup>
      </GeoJSON>
    </>
  );
}
