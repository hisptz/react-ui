import { Divider } from "@dhis2/ui";
import { head, last, sortBy } from "lodash";
import React, { forwardRef, useMemo } from "react";
import { defaultLegendSet } from "../../../../../../../../constants/legendSet";
import { ThematicLayerData, ThematicLayerDataItem } from "../../../../../../interfaces";
import Bubbles from "./components/Bubbles";

function getRadius(legends: Array<any>) {
  const high = head(legends)?.endValue;
  const low = last(legends)?.endValue + 1;
  console.log({
    high,
    low,
  });
  const factor = legends.length / (high - low);

  return {
    radiusHigh: 60,
    radiusLow: 8,
  };
}

function BubbleLegend(
  { dataItem, data, name }: { dataItem: ThematicLayerDataItem; data: ThematicLayerData[]; name?: string },
  ref: React.LegacyRef<HTMLDivElement> | undefined
) {
  const legends = useMemo(() => {
    return sortBy((dataItem.legendSet ?? defaultLegendSet)?.legends ?? defaultLegendSet?.legends, "startValue").reverse();
  }, [dataItem]);

  const { radiusHigh, radiusLow } = getRadius(legends);

  return (
    <div className="legend-card" ref={ref}>
      <h4 className="legend-header">{dataItem?.displayName}</h4>
      <Divider margin={"0"} />
      <div className="legend-list pt-8">
        <Bubbles classes={legends?.reverse()} radiusHigh={radiusHigh} radiusLow={radiusLow} color={"#FF0000"} />
      </div>
    </div>
  );
}

export default forwardRef(BubbleLegend);
