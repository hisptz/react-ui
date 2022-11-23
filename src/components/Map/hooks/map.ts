import { geoJSON, LatLngTuple } from "leaflet";
import { useEffect, useMemo } from "react";
import { useMapOrganisationUnit } from "../components/MapProvider/hooks";
import { useElementSize, useMediaQuery } from "usehooks-ts";
import { isEmpty } from "lodash";
import { useMap } from "react-leaflet";

export function useMapBounds() {
  const { orgUnits } = useMapOrganisationUnit();
  const geoJSONObject = useMemo(
    () =>
      geoJSON({
        type: "FeatureCollection",
        features: orgUnits?.map((orgUnit) => orgUnit.geoJSON),
      } as any),
    [orgUnits]
  );

  const center = useMemo(() => {
    return geoJSONObject.getBounds().getCenter();
  }, [orgUnits]);
  const bounds: any = useMemo(() => {
    return geoJSONObject.getBounds();
  }, [orgUnits]);

  return {
    center,
    bounds,
  };
}

export function useCenterMap({ bounds }: { bounds: LatLngTuple[] }) {
  const map = useMap();
  const [ref, { width, height }] = useElementSize();

  useEffect(() => {
    if (!isEmpty(bounds)) {
      map.fitBounds(bounds);
    }
  }, [width, height]);

  return ref;
}

export function usePrintMedia() {
  return useMediaQuery("@media print");
}
