import { last } from "lodash";
import React from "react";
import { LayerGroup, LayersControl, Pane } from "react-leaflet";
import { CustomBubbleLayer } from "../../interfaces";
import Bubble from "./components/Bubble";
import Choropleth from "./components/Choropleth";
import useThematicLayer from "./hooks/config";

export default function ThematicLayer({ layerId, index }: { layerId: string; index: number }) {
  const layer = useThematicLayer(layerId);

  if (!layer) {
    return null;
  }

  const { type, dataItem, name, data, enabled, legends } = layer ?? {};
  const uniqueName = name ?? dataItem.displayName;
  return (
    <>
      <LayersControl.Overlay checked={enabled} name={uniqueName}>
        <Pane
          style={{
            zIndex: type === "bubble" ? 500 : 500 - (index + 1),
          }}
          name={uniqueName}>
          <LayerGroup>
            {data?.map((datum) =>
              type === "choropleth" ? <Choropleth legends={legends ?? []} data={datum} key={`${datum?.dataItem?.id}-${datum?.orgUnit?.id}-layer`} /> : null
            )}
            {data?.map((datum) =>
              type === "bubble" ? (
                <Bubble
                  radius={(layer as CustomBubbleLayer)?.radius}
                  legends={legends ?? []}
                  highestData={last(data)?.data ?? 1}
                  data={datum}
                  key={`${datum?.dataItem?.id}-${datum?.orgUnit?.id}-layer`}
                />
              ) : null
            )}
          </LayerGroup>
        </Pane>
      </LayersControl.Overlay>
    </>
  );
}
