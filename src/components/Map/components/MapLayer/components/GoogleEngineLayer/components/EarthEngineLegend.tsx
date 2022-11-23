import React, { forwardRef } from "react";
import LegendCardHeader from "../../LegendArea/components/LegendCardHeader";
import { CustomGoogleEngineLayer } from "../../../interfaces";
import { Divider } from "@dhis2/ui";
import i18n from "@dhis2/d2-i18n";
import { isEmpty } from "lodash";

export function LegendItem({ legend }: { legend: { min: number; max: number; color: string; name?: string } }) {
  return (
    <div className="legend-item">
      <div className="legend-item-color" style={{ backgroundColor: legend.color }} />
      {legend.name ? <div className="legend-item-label">{`${legend.name}`}</div> : <div className="legend-item-label">{`${legend.min} - ${legend.max}`}</div>}
    </div>
  );
}

function getLegendsFromParams(params?: { min: number; max: number; palette: string | string[] }) {
  if (!params) return [];

  const { palette, min, max } = params;
  console.log(params);
  const sanitizedPalette = Array.isArray(palette) ? palette : palette.split(",");
  const classes = sanitizedPalette.length;
  const difference = max - min;
  const interval = Math.round(difference / classes);
  const legends = [];
  console.log(10 / 9);
  for (let i = 0; i < classes; i++) {
    const min = i * interval;
    const max = min + interval;

    const name = i === classes - 1 ? `> ${min}` : undefined;

    legends.push({
      id: sanitizedPalette[i],
      color: sanitizedPalette[i],
      min,
      max,
      name,
    });
  }

  return legends;
}

function EarthEngineLegend(
  { layer, collapsible, onCollapse, name }: { layer: CustomGoogleEngineLayer; collapsible?: boolean; onCollapse?: () => void; name: string },
  ref: React.LegacyRef<HTMLDivElement>
) {
  const { options } = layer;
  const legends = options?.legend?.items ?? getLegendsFromParams(options?.params);

  return (
    <div style={{ maxWidth: 200, alignItems: "start", gap: 8 }} className="legend-card" ref={ref}>
      <LegendCardHeader title={name} collapsible={collapsible} onCollapse={onCollapse} />
      <Divider margin={"0"} />
      <p style={{ margin: 0 }}>{options?.description ?? ""}</p>
      {!isEmpty(legends) && <b>{options?.unit ?? ""}</b>}
      <div className="legend-list">
        {legends?.map((legend: any) => (
          <LegendItem key={`${legend?.color}-legend-list`} legend={legend} />
        ))}
      </div>
      {options?.source && (
        <div className="row gap-8">
          {i18n.t("Source")}:
          <a className="source-url" target="_blank" referrerPolicy="no-referrer" href={options?.sourceUrl}>
            {options?.source ?? ""}
          </a>
        </div>
      )}
    </div>
  );
}

export default forwardRef(EarthEngineLegend);
