import { Divider } from "@dhis2/ui";
import { sortBy } from "lodash";
import React, { forwardRef, useMemo } from "react";
import { defaultLegendSet } from "../../../../../../../../constants/legendSet";
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
  }: { dataItem: ThematicLayerDataItem; data: ThematicLayerData[]; name?: string; collapsible?: boolean; onCollapse?: () => void },
  ref: React.LegacyRef<HTMLDivElement> | undefined
) {
  const legends = useMemo(() => {
    return sortBy((dataItem.legendSet ?? defaultLegendSet)?.legends ?? defaultLegendSet?.legends, "startValue").reverse();
  }, [dataItem]);

  const { radiusHigh, radiusLow } = getRadius(legends);

  return (
    <div className="legend-card" ref={ref}>
      <LegendCardHeader title={dataItem.displayName} onCollapse={onCollapse} collapsible={collapsible} />
      <Divider margin={"0"} />
      <div className="legend-list pt-8">
        <Bubbles classes={legends?.reverse()} radiusHigh={radiusHigh} radiusLow={radiusLow} color={"#FF0000"} />
      </div>
    </div>
  );
}

export default forwardRef(BubbleLegend);
