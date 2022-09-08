import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { head } from "lodash";
import React from "react";
import { LayerGroup, LayersControl, Pane } from "react-leaflet";
import { ThematicLayer as ThematicLayerInterface } from "../../interfaces";
import Bubble from "./components/Bubble";
import Choropleth from "./components/Choropleth";
import useThematicLayerData from "./hooks/config";

export default function ThematicLayer({ layer }: { layer: ThematicLayerInterface }) {
  const { type, enabled, control, dataItem, name } = layer;
  const { loading, data } = useThematicLayerData(layer);
  const uniqueName = name ?? dataItem.displayName;
  if (loading) {
    return (
      <LayersControl.Overlay name={uniqueName} checked={enabled}>
        <>
          <CenteredContent>
            <CircularLoader small />
          </CenteredContent>
        </>
      </LayersControl.Overlay>
    );
  }

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
