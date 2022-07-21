import { useDataQuery } from "@dhis2/app-runtime";
import { CircularLoader } from "@dhis2/ui";
import { compact, isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { getOrgUnitsSelection, sanitizeOrgUnits } from "../../hooks/orgUnit";
import { MapOrgUnit, MapProviderProps } from "../../interfaces";
import { MapOrgUnitContext } from "../../state";

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

export function MapProvider({ children, orgUnitSelection }: MapProviderProps) {
  const [orgUnits, setOrgUnits] = useState<MapOrgUnit[]>([]);
  const { refetch, loading, error } = useDataQuery(boundaryQuery, { lazy: true });

  useEffect(() => {
    async function getOrgUnits() {
      const rawOrgUnitIds = getOrgUnitsSelection(orgUnitSelection);
      const data = await refetch({ orgUnitIds: rawOrgUnitIds });
      const { analytics, boundaries } = (data as any) ?? {};
      const rawOrgUnits = sanitizeOrgUnits(analytics?.metaData);
      const orgUnits: MapOrgUnit[] = compact(
        rawOrgUnits.map((orgUnit: any) => {
          const coordinateObject: any = boundaries?.find((coordinate: any) => coordinate.id === orgUnit.id);
          if (!coordinateObject) {
            return;
          }
          return {
            ...orgUnit,
            bounds: JSON.parse(coordinateObject?.co),
            level: coordinateObject?.le,
          };
        })
      );
      setOrgUnits(orgUnits);
    }

    getOrgUnits();
  }, [orgUnitSelection, refetch]);

  if (loading) {
    return (
      <div>
        <CircularLoader small />
      </div>
    );
  }
  if (!isEmpty(orgUnits)) {
    return <MapOrgUnitContext.Provider value={{ orgUnitSelection, orgUnits }}>{children}</MapOrgUnitContext.Provider>;
  }

  return null;
}
