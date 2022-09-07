import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { uid } from "@hisptz/dhis2-utils";
import { head } from "lodash";
import React, { useRef } from "react";
import { LayerGroup, LayersControl } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { ThematicLayer as ThematicLayerInterface } from "../../interfaces";
import Bubble from "./components/Bubble";
import BubbleLegend from "./components/Bubble/components/BubbleLegend";
import Choropleth from "./components/Choropleth";
import ChoroplethLegend from "./components/Choropleth/components/ChoroplethLegend";
import useThematicLayerData from "./hooks/config";

export default function ThematicLayer({ layer }: { layer: ThematicLayerInterface }) {
  const { type, enabled, control, dataItem, name } = layer;
  const { loading, data } = useThematicLayerData(layer);
  const { current: uniqueName } = useRef<string>(`${name ?? ""}-${uid()}`);
  if (loading) {
    return (
      <LayersControl.Overlay name={name ?? dataItem.displayName} checked={enabled}>
        <CenteredContent>
          <CircularLoader small />
        </CenteredContent>
      </LayersControl.Overlay>
    );
  }

  return (
    <>
      <LayersControl.Overlay checked={enabled} name={uniqueName}>
        <LayerGroup>
          {data?.map((datum) => (type === "choropleth" ? <Choropleth data={datum} key={`${datum?.dataItem?.id}-${datum?.orgUnit?.id}-layer`} /> : null))}
          {data?.map((datum) =>
            type === "bubble" ? <Bubble lowestData={head(data)?.data ?? 1} data={datum} key={`${datum?.dataItem?.id}-${datum?.orgUnit?.id}-layer`} /> : null
          )}
        </LayerGroup>
      </LayersControl.Overlay>
      {control && (
        <Control position={control.position}>
          {type === "choropleth" && <ChoroplethLegend name={uniqueName} data={data} dataItem={head(data)?.dataItem ?? dataItem} />}
          {type === "bubble" && <BubbleLegend name={uniqueName} data={data} dataItem={head(data)?.dataItem ?? dataItem} />}
        </Control>
      )}
    </>
  );
}
