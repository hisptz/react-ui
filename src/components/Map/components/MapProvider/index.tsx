import { useDataQuery } from "@dhis2/app-runtime";
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { compact, isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { MapOrgUnit, MapProviderProps } from "../../interfaces";
import { MapOrgUnitContext, MapPeriodContext } from "../../state";
import { getOrgUnitsSelection, sanitizeOrgUnits, toGeoJson } from "../../utils/map";

const boundaryQuery = {
  boundaries: {
    resource: "geoFeatures",
    params: ({ orgUnitIds }: any) => ({
      ou: `ou:${orgUnitIds?.join(";")}`,
    }),
  },
  analytics: {
    resource: "analytics",
    params: ({ orgUnitIds }: any) => ({
      dimension: [`ou:${orgUnitIds.join(";")}`, `pe:${new Date().getFullYear()}`],
      skipData: true,
      hierarchyMeta: true,
    }),
  },
};

export function MapProvider({ children, orgUnitSelection, periodSelection }: MapProviderProps) {
  const [orgUnits, setOrgUnits] = useState<MapOrgUnit[]>([]);
  const { refetch, loading } = useDataQuery(boundaryQuery, { lazy: true });

  useEffect(() => {
    async function getOrgUnits() {
      const rawOrgUnitIds = getOrgUnitsSelection(orgUnitSelection);
      const data = await refetch({ orgUnitIds: rawOrgUnitIds });
      const { analytics, boundaries } = (data as any) ?? {};
      const rawOrgUnits = sanitizeOrgUnits(analytics?.metaData);
      const geoJSONObjects = toGeoJson(boundaries.filter((bound: any) => bound.co));
      const orgUnits: MapOrgUnit[] = compact(
        rawOrgUnits.map((orgUnit: any) => {
          const geoJSONObject: any = geoJSONObjects?.find((geoJSON: any) => geoJSON.properties.id === orgUnit.id);

          if (!geoJSONObject) {
            return;
          }
          return {
            ...orgUnit,
            geoJSON: geoJSONObject,
            bounds: [],
            level: geoJSONObject.properties.level,
          };
        })
      );
      setOrgUnits(orgUnits);
    }

    getOrgUnits();
  }, [orgUnitSelection, refetch]);

  if (!loading) {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <CenteredContent>
          <CircularLoader small />
        </CenteredContent>
      </div>
    );
  }
  if (!isEmpty(orgUnits)) {
    return (
      <MapOrgUnitContext.Provider value={{ orgUnitSelection, orgUnits }}>
        <MapPeriodContext.Provider value={periodSelection}>{children}</MapPeriodContext.Provider>
      </MapOrgUnitContext.Provider>
    );
  }

  return null;
}
