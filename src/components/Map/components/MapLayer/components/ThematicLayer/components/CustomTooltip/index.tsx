import React from "react";
import { Popup, Tooltip } from "react-leaflet";
import { ThematicLayerData } from "../../../../interfaces";

export default function CustomTooltip({ data: dataObject }: { data: ThematicLayerData }) {
  const { dataItem, orgUnit, data } = dataObject ?? {};
  return (
    <>
      <Tooltip>
        {orgUnit?.name} ({data})
      </Tooltip>
      <Popup minWidth={80}>
        <h3>{orgUnit?.name}</h3>
        <div>
          <b>Level: </b>
          {orgUnit?.level}
        </div>
        <div>
          <b>{dataItem?.displayName}: </b>
          {data}
        </div>
      </Popup>
    </>
  );
}
