import i18n from "@dhis2/d2-i18n";
import React from "react";
import { Pane, Popup, Tooltip } from "react-leaflet";
import { useMapPeriods } from "../../../../../MapProvider/hooks";
import { ThematicLayerData } from "../../../../interfaces";

export default function CustomTooltip({ data: dataObject }: { data: ThematicLayerData }) {
  const { dataItem, orgUnit, data } = dataObject ?? {};
  const { periods } = useMapPeriods() ?? {};

  return (
    <Pane name={`${dataItem.displayName}-${orgUnit.id}-popup-pane`} pane="popupPane">
      <Tooltip>
        {orgUnit?.name} ({data})
      </Tooltip>
      <Popup minWidth={80}>
        <h3 style={{ margin: 0 }}>{orgUnit?.name}</h3>
        <div>{dataItem?.displayName}</div>
        <div>{periods?.map((period) => period.name).join(",")}</div>
        <div>
          {i18n.t("Value")}: {data}
        </div>
      </Popup>
    </Pane>
  );
}
