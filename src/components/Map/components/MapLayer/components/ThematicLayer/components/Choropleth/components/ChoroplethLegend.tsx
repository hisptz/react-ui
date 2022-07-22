import React, { forwardRef, useMemo } from "react";
import { ThematicMapLayer } from "../../../../../../../../../../../../../shared/interfaces/interventionConfig";
import "../../../styles/legends.css";
import { Divider } from "@dhis2/ui";
import { head, sortBy } from "lodash";
import { defaultLegendSet } from "../../../../../../../constants/legendSet";
import { getLegendCount } from "../../../../../../../utils/map";

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
  { indicator, data, config }: { indicator: { id: string; legendSets: Array<any>; displayName: string }; data: any; config: ThematicMapLayer },
  ref: React.LegacyRef<HTMLDivElement> | undefined
) {
  const legends = useMemo(() => {
    return sortBy(head(indicator.legendSets)?.legends ?? defaultLegendSet?.legends, "startValue").reverse();
  }, [indicator]);

  return (
    <div className="legend-card" ref={ref}>
      <h4 className="legend-header">{indicator?.displayName}</h4>
      <Divider margin={"0"} />
      <div style={{ width: 150 }} className="legend-list pt-8">
        {legends?.map((legend: any) => (
          <LegendItem key={`${legend?.id}`} legend={legend} value={getLegendCount(legend, data)} />
        ))}
      </div>
    </div>
  );
}

export default forwardRef(ChoroplethLegend);
