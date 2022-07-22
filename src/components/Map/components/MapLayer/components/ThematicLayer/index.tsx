import React from "react";
import { LayerGroup, LayersControl } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { ThematicLayer as ThematicLayerInterface } from "../../interfaces";
import Choropleth from "./components/Choropleth";
import ChoroplethLegend from "./components/Choropleth/components/ChoroplethLegend";
import useThematicLayerData from "./hooks/config";

export default function ThematicLayer({ layer }: { layer: ThematicLayerInterface }) {
  const { type, enabled, control, dataItem, name } = layer;
  const { loading, data } = useThematicLayerData(layer);

  return (
    <>
      <LayersControl.Overlay checked={enabled} name={name ?? dataItem.displayName}>
        <LayerGroup>{data?.map((datum) => (type === "choropleth" ? <Choropleth data={datum} key={`${datum.dataItem.id}-layer`} /> : null))}</LayerGroup>
      </LayersControl.Overlay>
      {control && <Control position={control.position}>{type === "choropleth" && <ChoroplethLegend name={name} data={data} dataItem={dataItem} />}</Control>}
    </>
  );
}
