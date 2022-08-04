import { geoJSON } from "leaflet";
import { useMemo } from "react";
import { useMapOrganisationUnit } from "../components/MapProvider/hooks";

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
