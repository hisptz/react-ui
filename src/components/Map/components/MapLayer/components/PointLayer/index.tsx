import { useConfig, useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import L from "leaflet";
import { compact, find } from "lodash";
import React, { useMemo } from "react";
import { GeoJSON, LayerGroup, LayersControl, Popup, Tooltip } from "react-leaflet";
import { PointOrgUnit } from "../../../../interfaces";
import { getOrgUnitsSelection, sanitizeOrgUnits, toGeoJson } from "../../../../utils/map";
import { useMapOrganisationUnit } from "../../../MapProvider/hooks";
import { CustomPointLayer } from "../../interfaces";

const query = {
  layer: {
    resource: "geoFeatures",
    params: ({ ous }: any) => ({
      ou: `ou:${ous.join(";")}`,
    }),
  },
  analytics: {
    resource: "analytics",
    params: ({ ous }: any) => ({
      dimension: [`ou:${ous.join(";")}`, `pe:${new Date().getFullYear()}`],
      skipData: true,
      hierarchyMeta: true,
    }),
  },
};

const groupSetQuery = {
  groupSet: {
    resource: "organisationUnitGroupSets",
    id: ({ groupSet }: any) => groupSet,
    params: {
      fields: ["organisationUnitGroups[name,color,symbol,organisationUnits[id]]"],
    },
  },
};

function getIconUrl({ type, icon }: { icon: string; type: string }, { baseUrl }: { baseUrl: string }) {
  return `${baseUrl}/images/orgunitgroup/${icon ?? "01.png"}`;
}

function getIcon(url: string): L.Icon | undefined {
  return new L.Icon({
    iconUrl: url,
  });
}

function usePointLayer(config: CustomPointLayer) {
  const { orgUnitSelection } = useMapOrganisationUnit();
  const level = useMemo(() => (config.level ? `LEVEL-${config.level}` : undefined), [config]);
  const group = useMemo(() => (config.group ? `OU_GROUP-${config.group}` : undefined), [config]);
  const ous = useMemo(() => [...getOrgUnitsSelection(orgUnitSelection), level, group], [orgUnitSelection, group, level]);

  const { data, loading } = useDataQuery(query, {
    variables: {
      ous,
      groupSet: config.style?.groupSet,
    },
  });
  const { data: groupSetData, loading: groupSetDataLoading } = useDataQuery(groupSetQuery, {
    variables: {
      groupSet: config.style?.groupSet,
    },
    lazy: config.style?.groupSet === undefined,
  });

  const orgUnits: PointOrgUnit[] = useMemo(() => {
    if (loading || groupSetDataLoading) {
      return [];
    }
    const { analytics, layer } = (data as any) ?? {};
    const rawOrgUnits = sanitizeOrgUnits(analytics?.metaData);
    const geoJSONObjects = toGeoJson(layer?.filter((bound: any) => bound.co));
    return compact(
      rawOrgUnits.map((orgUnit: any) => {
        const geoJSONObject: any = geoJSONObjects?.find((geoJSON: any) => geoJSON.properties.id === orgUnit.id);
        const orgUnitGroups: any = (groupSetData?.groupSet as any)?.organisationUnitGroups ?? [];
        const ouGroup = find(orgUnitGroups, (ouGroup) => !!find(ouGroup?.organisationUnits ?? [], ["id", orgUnit.id]));

        if (!geoJSONObject || geoJSONObject.properties.type !== "Point") {
          return;
        }
        return {
          ...orgUnit,
          geoJSON: geoJSONObject,
          level: geoJSONObject.properties.level,
          icon: {
            type: "groupIcon",
            icon: ouGroup?.symbol,
          },
        };
      })
    );
  }, [data, groupSetData]);

  return {
    loading: loading || groupSetDataLoading,
    orgUnits,
  };
}

export function PointLayer(props: CustomPointLayer) {
  const { enabled, label } = props ?? {};
  const { orgUnits, loading } = usePointLayer(props);
  const { baseUrl } = useConfig();

  if (loading) {
    return null;
  }

  return (
    <LayersControl.Overlay checked={enabled} name={label ?? i18n.t("Points")}>
      <LayerGroup>
        {orgUnits?.map((area: PointOrgUnit) => {
          return (
            <GeoJSON
              pointToLayer={(_, coordinates) => {
                return L.marker(coordinates, { icon: getIcon(getIconUrl(area.icon, { baseUrl })) });
              }}
              data={area.geoJSON}
              interactive
              key={`${area.id}-polygon`}>
              <Tooltip>{area.name}</Tooltip>
              <Popup minWidth={80}>
                <h3>{area.name}</h3>
              </Popup>
            </GeoJSON>
          );
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
}
