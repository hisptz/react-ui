import { Divider } from "@dhis2/ui";
import type { Legend } from "@hisptz/dhis2-utils";
import React, { forwardRef } from "react";
import { ThematicLayerData, ThematicLayerDataItem } from "../../../../../../interfaces";
import LegendCardHeader from "../../../../../LegendArea/components/LegendCardHeader";
import Bubbles from "./components/Bubbles";

function getRadius(legends: Array<any>) {
  return {
    radiusHigh: 60,
    radiusLow: 8,
  };
}

function BubbleLegend(
  {
    dataItem,
    data,
    name,
    collapsible,
    onCollapse,
    legends,
  }: { dataItem: ThematicLayerDataItem; data: ThematicLayerData[]; name?: string; collapsible?: boolean; onCollapse?: () => void; legends: Legend[] },
  ref: React.LegacyRef<HTMLDivElement> | undefined
) {
  const { radiusHigh, radiusLow } = getRadius(legends);

  return (
    <div className="legend-card" ref={ref}>
      <LegendCardHeader title={dataItem.displayName} onCollapse={onCollapse} collapsible={collapsible} />
      <Divider margin={"0"} />
      <div className="legend-list pt-8">
        <Bubbles classes={legends.reverse()} radiusHigh={radiusHigh} radiusLow={radiusLow} color={"#FF0000"} />
      </div>
    </div>
  );
}

export default forwardRef(BubbleLegend);
