import { find } from "lodash";
import { useContext } from "react";
import { MapLayersContext } from "../../../../../state";
import { CustomThematicLayer } from "../../../interfaces";

export default function useThematicLayer(layerId: string): CustomThematicLayer | undefined {
  const { layers } = useContext(MapLayersContext);

  return find(layers as CustomThematicLayer[], ["id", layerId]);
}
