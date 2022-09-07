import "../../../styles/legends.css";
import { Divider } from "@dhis2/ui";
import { sortBy } from "lodash";
import React, { forwardRef, useMemo } from "react";
import { defaultLegendSet } from "../../../../../../../constants/legendSet";
import { getLegendCount } from "../../../../../../../utils/map";
import { ThematicLayerData, ThematicLayerDataItem } from "../../../../../interfaces";

function LegendItem({ legend, value }: { legend: { startValue: number; endValue: number; color: string }; value: number }) {
  return (
    <div className="legend-item">
      <div className="legend-item-color" style={{ backgroundColor: legend.color }} />
      <div className="legend-item-label">{`${legend.startValue} - ${legend.endValue}`}</div>
      <div className="legend-item-value">{`(${value})`}</div>
    </div>
  );
}

function ChoroplethLegend(
  { dataItem, data, name }: { data: ThematicLayerData[]; dataItem: ThematicLayerDataItem; name?: string },
  ref: React.LegacyRef<HTMLDivElement> | undefined
) {
  const legends = useMemo(() => {
    return sortBy((dataItem.legendSet ?? defaultLegendSet)?.legends, "startValue").reverse();
  }, [dataItem.legendSet]);

  return (
    <div className="legend-card" ref={ref}>
      <h4 className="legend-header">{dataItem?.displayName}</h4>
      <Divider margin={"0"} />
      <div style={{ width: 150 }} className="legend-list pt-8">
        {legends?.map((legend: any) => (
          <LegendItem key={`${legend?.color}-legend-list`} legend={legend} value={getLegendCount(legend, data)} />
        ))}
      </div>
    </div>
  );
}

export default forwardRef(ChoroplethLegend);
