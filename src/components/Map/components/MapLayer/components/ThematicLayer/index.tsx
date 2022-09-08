import { head } from "lodash";
import React from "react";
import { LayerGroup, LayersControl, Pane } from "react-leaflet";
import Bubble from "./components/Bubble";
import Choropleth from "./components/Choropleth";
import useThematicLayer from "./hooks/config";

export default function ThematicLayer({ layerId }: { layerId: string }) {
  const layer = useThematicLayer(layerId);

  if (!layer) {
    return null;
  }

  const { type, dataItem, name, data, enabled } = layer ?? {};
  const uniqueName = name ?? dataItem.displayName;
  return (
    <>
      <LayersControl.Overlay checked={enabled} name={uniqueName}>
        <Pane
          style={{
            zIndex: type === "bubble" ? 500 : undefined,
          }}
          name={uniqueName}
          pane="overlayPane">
          <LayerGroup>
            {data?.map((datum) => (type === "choropleth" ? <Choropleth data={datum} key={`${datum?.dataItem?.id}-${datum?.orgUnit?.id}-layer`} /> : null))}
            {data?.map((datum) =>
              type === "bubble" ? <Bubble lowestData={head(data)?.data ?? 1} data={datum} key={`${datum?.dataItem?.id}-${datum?.orgUnit?.id}-layer`} /> : null
            )}
          </LayerGroup>
        </Pane>
      </LayersControl.Overlay>
    </>
  );
}
