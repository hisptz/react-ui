import { IconLegend24, Tooltip } from "@dhis2/ui";
import { ControlPosition } from "leaflet";
import { compact, head } from "lodash";
import React, { useState } from "react";
import { MapLegendConfig } from "../../../MapArea/interfaces";
import { CustomControl } from "../../../MapControls/components/CustomControl";
import { CustomThematicLayer } from "../../interfaces";
import BubbleLegend from "../ThematicLayer/components/Bubble/components/BubbleLegend";
import ChoroplethLegend from "../ThematicLayer/components/Choropleth/components/ChoroplethLegend";

function getLegendComponent(layer: CustomThematicLayer) {
  const { type, enabled, control, dataItem, name, data, legends } = layer ?? {};

  if (!enabled || !control) {
    return null;
  }
  switch (type) {
    case "bubble":
      return <BubbleLegend legends={legends ?? []} name={name ?? dataItem.displayName} data={data} dataItem={head(data)?.dataItem ?? dataItem} />;
    case "choropleth":
      return <ChoroplethLegend legends={legends ?? []} name={name ?? dataItem.displayName} data={data} dataItem={head(data)?.dataItem ?? dataItem} />;
  }
}

function Legend({ children, collapsible }: { children: React.ReactElement; collapsible: boolean }) {
  const [collapsed, setCollapsed] = useState(collapsible);

  const onCollapse = () => {
    if (collapsible) {
      setCollapsed((prevState) => !prevState);
    }
  };

  const name = head(React.Children.toArray(children) as React.ReactElement[])?.props.name;

  return (
    <div>
      {collapsed ? (
        <Tooltip content={name}>
          <div onClick={onCollapse} style={{ width: 28, height: 28 }} className="legend-card collapsed">
            <IconLegend24 />
          </div>
        </Tooltip>
      ) : (
        React.Children.map(children, (child) => React.cloneElement(child, { collapsible, onCollapse }))
      )}
    </div>
  );
}

export default function LegendArea({ layers, legends: legendConfig }: { layers: CustomThematicLayer[]; position: ControlPosition; legends: MapLegendConfig }) {
  const legends: JSX.Element[] = compact(layers.filter((layer) => layer.enabled).map(getLegendComponent));
  const { position, collapsible } = legendConfig ?? {};

  return (
    <CustomControl position={position}>
      <div className="column gap-16 align-items-end">
        {legends?.map((legend: any, index) => (
          <Legend collapsible={collapsible ?? true} key={`${index}-map-legend`}>
            {legend}
          </Legend>
        ))}
      </div>
    </CustomControl>
  );
}
