import { colors, IconLegend24, Popper, Portal } from "@dhis2/ui";
import { ControlPosition } from "leaflet";
import { compact, head } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { MapLegendConfig } from "../../../MapArea/interfaces";
import { CustomControl } from "../../../MapControls/components/CustomControl";
import { CustomBubbleLayer, CustomGoogleEngineLayer, CustomPointLayer, CustomThematicLayer, SUPPORTED_EARTH_ENGINE_LAYERS } from "../../interfaces";
import PointLegend from "../PointLayer/components/PointLegend";
import BubbleLegend from "../ThematicLayer/components/Bubble/components/BubbleLegend";
import ChoroplethLegend from "../ThematicLayer/components/Choropleth/components/ChoroplethLegend";
import EarthEngineLegend from "../GoogleEngineLayer/components/EarthEngineLegend";
import classes from "./LegendArea.module.css";
import { usePrintMedia } from "../../../../hooks/map";

const TOOLTIP_OFFSET = 4;

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

function CollapsedLegendIcon({ onCollapse, name }: { name: string; onCollapse: () => void }) {
  const openDelay = 200;
  const closeDelay = 200;
  const [openTooltip, setOpenTooltip] = useState(false);
  const openTimerRef = useRef<any>(null);
  const closeTimerRef = useRef<any>(null);
  const ref = useRef<HTMLDivElement>(null);

  const hideModifier = { name: "hide" };
  const offsetModifier = {
    name: "offset",
    options: {
      offset: [0, TOOLTIP_OFFSET],
    },
  };

  const flipModifier = {
    name: "flip",
    options: { altBoundary: true },
  };

  const onMouseOver = () => {
    clearTimeout(closeTimerRef.current);

    openTimerRef.current = setTimeout(() => {
      setOpenTooltip(true);
    }, openDelay);
  };

  const onMouseOut = () => {
    clearTimeout(openTimerRef.current);

    closeTimerRef.current = setTimeout(() => {
      setOpenTooltip(false);
    }, closeDelay);
  };

  useEffect(
    () => () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(closeTimerRef.current);
    },
    []
  );

  return (
    <div ref={ref} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onCollapse} style={{ width: 28, height: 28 }} className="legend-card collapsed">
      <IconLegend24 />
      {openTooltip && (
        <Portal className={classes["map-tooltip"]}>
          <Popper className={classes["map-tooltip"]} reference={ref} modifiers={[offsetModifier, flipModifier, hideModifier]}>
            <div
              style={{
                backgroundColor: `${colors.grey900}`,
                borderRadius: 3,
                color: `${colors.white}`,
                padding: "4px 6px",
              }}
              data-test={`content`}>
              {name}
            </div>
          </Popper>
        </Portal>
      )}
    </div>
  );
}

function Legend({ children, collapsible }: { children: React.ReactElement; collapsible: boolean }) {
  const [collapsed, setCollapsed] = useState(collapsible);
  const inPrintMode = usePrintMedia();
  const onCollapse = () => {
    if (collapsible) {
      setCollapsed((prevState) => !prevState);
    }
  };

  const name = head(React.Children.toArray(children) as React.ReactElement[])?.props.name;

  const shouldCollapse = collapsed && !inPrintMode;
  console.log(inPrintMode);

  return (
    <div className="w-100">
      {shouldCollapse ? (
        <CollapsedLegendIcon name={name} onCollapse={onCollapse} />
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
  layers: Array<CustomThematicLayer | CustomPointLayer | CustomGoogleEngineLayer>;
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
