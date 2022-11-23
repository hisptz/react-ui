import { geoJSON, LatLngTuple } from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { useMapOrganisationUnit } from "../components/MapProvider/hooks";
import { useElementSize } from "usehooks-ts";
import { isEmpty } from "lodash";
import { useMap } from "react-leaflet";

export function useMapBounds() {
  const { orgUnits } = useMapOrganisationUnit();
  const sizeChanged = useMediaQuery();
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
  }, [orgUnits, sizeChanged]);
  const bounds: any = useMemo(() => {
    return geoJSONObject.getBounds();
  }, [orgUnits, sizeChanged]);

  return {
    center,
    bounds,
  };
}

export function useMediaQuery() {
  const [sizeChanges, setSizeChanges] = useState(false);
  const toggleState = () => setSizeChanges((prevState) => !prevState);
  useEffect(() => {
    window.addEventListener("resize", toggleState);
    return () => {
      window.removeEventListener("resize", toggleState);
    };
  }, []);
  return sizeChanges;
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
