import { colors } from "@dhis2/ui";
import { getCenter } from "geolib";
import { flattenDeep, head } from "lodash";
import React from "react";
import { CircleMarker, Popup, Tooltip } from "react-leaflet";
import { getColorFromLegendSet, highlightFeature, resetHighlight } from "../../../../../../utils/map";

const defaultStyle = {
  weight: 1,
};
const highlightStyle = {
  weight: 2,
};

export default function Bubble({ indicator, data }: { data: any; indicator: any }) {
  const { latitude, longitude } = getCenter(flattenDeep(data.orgUnit.co)) || {
    latitude: 0,
    longitude: 0,
  };
  return (
    <CircleMarker
      interactive
      eventHandlers={{
        mouseover: (e) => highlightFeature(e, highlightStyle),
        mouseout: (e) => resetHighlight(e, defaultStyle),
      }}
      pathOptions={{
        fillColor: getColorFromLegendSet(head(indicator?.legendSets), data.data),
        fillOpacity: 1,
        color: colors.grey900,
        weight: 1,
      }}
      key={`${data.indicator.id}-layer`}
      radius={data.data / 10}
      center={{ lat: latitude, lng: longitude }}>
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
          <b>{indicator?.displayName}: </b>
          {data?.data}
        </div>
      </Popup>
    </CircleMarker>
  );
}
