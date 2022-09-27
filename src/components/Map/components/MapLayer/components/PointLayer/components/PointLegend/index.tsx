import { useConfig } from "@dhis2/app-runtime";
import { Divider } from "@dhis2/ui";
import React, { forwardRef } from "react";
import { getIconUrl } from "../../../../../../utils/helpers";
import LegendCardHeader from "../../../LegendArea/components/LegendCardHeader";
import { usePointLayer } from "../../hooks";

function PointLegends({ orgUnitGroups }: { orgUnitGroups: { name: string; symbol: string }[] }) {
  const { baseUrl } = useConfig();
  return (
    <div style={{ minWidth: 100, alignItems: "flex-start" }} className="w-100 p-8 legend-list column">
      {orgUnitGroups.map(({ name, symbol }) => {
        return (
          <div key={`${name}-legend`} className="row gap-16  align-items-center">
            <img height={20} width={20} alt={`${name}-icon`} src={getIconUrl({ type: "", icon: symbol }, { baseUrl })} />
            <p>{name}</p>
          </div>
        );
      })}
    </div>
  );
}

function PointLegend({ collapsible, onCollapse }: any, ref: React.LegacyRef<HTMLDivElement>) {
  const pointLayer = usePointLayer();
  const { label, style } = pointLayer ?? {};

  return (
    <div ref={ref} className="legend-card">
      <LegendCardHeader collapsible={collapsible} onCollapse={onCollapse} title={label ?? "Points"} />
      <Divider margin={"0"} />
      <PointLegends orgUnitGroups={style?.orgUnitGroups ?? []} />
    </div>
  );
}

export default forwardRef(PointLegend);