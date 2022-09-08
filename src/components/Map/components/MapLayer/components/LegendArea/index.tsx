import { ControlPosition } from "leaflet";
import { compact, head } from "lodash";
import React from "react";
import { CustomControl } from "../../../MapControls/components/CustomControl";
import { ThematicLayer } from "../../interfaces";
import BubbleLegend from "../ThematicLayer/components/Bubble/components/BubbleLegend";
import ChoroplethLegend from "../ThematicLayer/components/Choropleth/components/ChoroplethLegend";

function getLegendComponent(layer: ThematicLayer) {
  const { type, enabled, control, dataItem, name, data } = layer ?? {};

  if (!enabled || !control) {
    return null;
  }
  switch (type) {
    case "bubble":
      return <BubbleLegend name={name ?? dataItem.displayName} data={data} dataItem={head(data)?.dataItem ?? dataItem} />;
    case "choropleth":
      return <ChoroplethLegend name={name ?? dataItem.displayName} data={data} dataItem={head(data)?.dataItem ?? dataItem} />;
  }
}

export default function LegendArea({ layers, position }: { layers: ThematicLayer[]; position: ControlPosition }) {
  const legends: JSX.Element[] = compact(layers.map(getLegendComponent));

  return (
    <CustomControl position={position}>
      <div className="column gap-16">
        {legends?.map((legend: any, index) => (
          <div key={`${index}-map-legend`}>{legend}</div>
        ))}
      </div>
    </CustomControl>
  );
}
