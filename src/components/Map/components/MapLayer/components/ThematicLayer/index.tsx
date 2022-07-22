import React from "react";
import { LayerGroup, LayersControl } from "react-leaflet";
import { ThematicLayer as ThematicLayerInterface } from "../../interfaces";
import Choropleth from "./components/Choropleth";
import useThematicLayerData from "./hooks/config";

export default function ThematicLayer({ layer }: { layer: ThematicLayerInterface }) {
  const { type, enabled } = layer;
  const { loading, data } = useThematicLayerData(layer);

  return (
    <LayersControl.Overlay checked={enabled} name={"Thematic layer"}>
      <LayerGroup>
        {data?.map((datum) => (
          <Choropleth data={datum} key={`${datum.dataItem.id}-layer`} />
        ))}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
