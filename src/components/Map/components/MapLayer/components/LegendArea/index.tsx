import { IconLegend24, Tooltip } from "@dhis2/ui";
import { ControlPosition } from "leaflet";
import { compact, head } from "lodash";
import React, { useState } from "react";
import { MapLegendConfig } from "../../../MapArea/interfaces";
import { CustomControl } from "../../../MapControls/components/CustomControl";
import { CustomBubbleLayer, CustomGoogleEngineLayer, CustomPointLayer, CustomThematicLayer, SUPPORTED_EARTH_ENGINE_LAYERS } from "../../interfaces";
import PointLegend from "../PointLayer/components/PointLegend";
import BubbleLegend from "../ThematicLayer/components/Bubble/components/BubbleLegend";
import ChoroplethLegend from "../ThematicLayer/components/Choropleth/components/ChoroplethLegend";
import EarthEngineLegend from "../GoogleEngineLayer/components/EarthEngineLegend";

function getLegendComponent(layer: CustomThematicLayer | CustomPointLayer | CustomGoogleEngineLayer) {
  if (layer.type === "point") {
    return <PointLegend name={layer.label} />;
  }

  if (SUPPORTED_EARTH_ENGINE_LAYERS.includes(layer.type)) {
    return <EarthEngineLegend name={layer.name ?? ""} layer={layer as CustomGoogleEngineLayer} />;
  }

  const { type, enabled, control, dataItem, name, data, legends } = (layer as CustomThematicLayer) ?? {};

  if (!enabled || !control) {
    return null;
  }
  switch (type) {
    case "bubble":
      return (
        <BubbleLegend
          radius={(layer as CustomBubbleLayer)?.radius ?? { min: 0, max: 50 }}
          legends={legends ?? []}
          name={name ?? dataItem.displayName}
          data={data}
          dataItem={head(data)?.dataItem ?? dataItem}
        />
      );
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
    <div className="w-100">
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

export default function LegendArea({
  layers,
  legends: legendConfig,
}: {
  layers: Array<CustomThematicLayer | CustomPointLayer>;
  position: ControlPosition;
  legends?: MapLegendConfig;
}) {
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
