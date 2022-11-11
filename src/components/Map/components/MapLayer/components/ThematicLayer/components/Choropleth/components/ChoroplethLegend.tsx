import "../../../styles/legends.css";
import { Divider } from "@dhis2/ui";
import type { Legend } from "@hisptz/dhis2-utils";
import React, { forwardRef } from "react";
import { getLegendCount } from "../../../../../../../utils/map";
import { ThematicLayerData, ThematicLayerDataItem } from "../../../../../interfaces";
import LegendCardHeader from "../../../../LegendArea/components/LegendCardHeader";

export function LegendItem({ legend, value }: { legend: { startValue: number; endValue: number; color: string }; value: number }) {
  return (
    <div className="legend-item">
      <div className="legend-item-color" style={{ backgroundColor: legend.color }} />
      <div className="legend-item-label">{`${legend.startValue} - ${legend.endValue}`}</div>
      <div className="legend-item-value">{`(${value})`}</div>
    </div>
  );
}

function ChoroplethLegend(
  {
    dataItem,
    data,
    name,
    collapsible,
    onCollapse,
    legends,
  }: { data: ThematicLayerData[]; dataItem: ThematicLayerDataItem; name?: string; collapsible?: boolean; onCollapse?: () => void; legends: Legend[] },
  ref: React.LegacyRef<HTMLDivElement> | undefined
) {
  return (
    <div className="legend-card" ref={ref}>
      <LegendCardHeader title={dataItem.displayName} collapsible={collapsible} onCollapse={onCollapse} />
      <Divider margin={"0"} />
      <div className="legend-list pt-8">
        {legends?.map((legend: any) => (
          <LegendItem key={`${legend?.color}-legend-list`} legend={legend} value={getLegendCount(legend, data)} />
        ))}
      </div>
    </div>
  );
}

export default forwardRef(ChoroplethLegend);
