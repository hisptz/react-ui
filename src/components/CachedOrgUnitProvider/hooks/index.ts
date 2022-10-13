import { useDataEngine } from "@dhis2/app-runtime";
import { mapSeries } from "async-es";
import { flattenDeep, get, range, set } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { OFFLINE_ORG_UNIT_PAGE_SIZE } from "../constants/config";
import { groupQuery, levelQuery, ouQuery } from "../constants/queries";
import { db, OfflineOrganisationUnit, OfflineOrganisationUnitGroup, OfflineOrganisationUnitLevel } from "../services/db";
import { getPagination } from "../utils";

function sanitizeOrgUnitGroups(groups: Array<any>): Array<OfflineOrganisationUnit> {
  return groups.map((ou) =>
    set(
      ou,
      "organisationUnitGroups",
      ou.organisationUnitGroups?.map((ouGroup: { id: string }) => ouGroup.id)
    )
  );
}

function useOrganisationUnitData(pageSize?: number) {
  const [loading, setLoading] = useState(false);
  const engine = useDataEngine();
  const getLevels = useCallback(async (options: any) => {
    db.clearOrgUnitLevels();
    const pagination = await getPagination(engine, levelQuery, {
      queryKey: "levels",
      options: {
        ...options,
        pageSize,
      },
    });
    const pageCount = pagination.pageCount ?? 0;
    if (pageCount > 0) {
      db.updateCount({
        resource: "levels",
        key: "total",
        value: pageCount,
      });
      const levels = await mapSeries(range(1, pageCount + 1), async (page: number) => {
        const data = await engine.query(levelQuery, {
          variables: { ...options, page },
        });
        db.updateCount({
          resource: "levels",
          key: "page",
          value: page,
        });
        return get(data, ["levels", "organisationUnitLevels"]) as OfflineOrganisationUnitLevel[];
      }).then(flattenDeep);
      await db.addOrganisationUnitLevels(levels);
    }
  }, []);

  const getOrgUnits = useCallback(async (options: any) => {
    db.clearOrgUnits();
    const pagination = await getPagination(engine, ouQuery, {
      queryKey: "ous",
      options: {
        pageSize,
      },
    });
    const pageCount = pagination.pageCount ?? 0;
    db.updateCount({
      resource: "orgUnits",
      key: "total",
      value: pageCount,
    });
    if (pageCount > 0) {
      const groups = await mapSeries(range(1, pageCount + 1), async (page: number) => {
        const data = await engine.query(ouQuery, {
          variables: { ...options, page },
        });
        db.updateCount({
          resource: "orgUnits",
          key: "page",
          value: page,
        });
        return get(data, ["ous", "organisationUnits"]) as OfflineOrganisationUnit[];
      }).then(flattenDeep);
      await db.addOrganisationUnits(sanitizeOrgUnitGroups(groups));
    }
  }, []);

  const getGroups = useCallback(async (options: any) => {
    db.clearOrgUnitGroups();
    const pagination = await getPagination(engine, groupQuery, {
      queryKey: "groups",
      options: {
        pageSize,
      },
    });
    const pageCount = pagination.pageCount ?? 0;
    db.updateCount({
      resource: "groups",
      key: "total",
      value: pageCount,
    });
    if (pageCount > 0) {
      const groups = await mapSeries(range(1, pageCount + 1), async (page: number) => {
        const data = await engine.query(groupQuery, {
          variables: { ...options, page },
        });
        db.updateCount({
          resource: "groups",
          key: "page",
          value: page,
        });
        return get(data, ["groups", "organisationUnitGroups"]) as OfflineOrganisationUnitGroup[];
      }).then(flattenDeep);
      await db.addOrganisationUnitGroups(groups);
    }
  }, []);

  useEffect(() => {
    async function get() {
      setLoading(true);
      try {
        const hasLevels = await db.hasOrganisationUnitLevels();
        const hasGroups = await db.hasOrganisationUnitGroups();
        const hasOus = await db.hasOrganisationUnits();
        if (!hasLevels) {
          await getLevels({ pageSize: pageSize ?? OFFLINE_ORG_UNIT_PAGE_SIZE });
        }
        if (!hasGroups) {
          await getGroups({ pageSize: pageSize ?? OFFLINE_ORG_UNIT_PAGE_SIZE });
        }
        if (!hasOus) {
          await getOrgUnits({ pageSize: pageSize ?? OFFLINE_ORG_UNIT_PAGE_SIZE });
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }

    get();
  }, []);

  return { loading };
}

function useClearOrganisationData() {
  return useCallback(async () => {
    try {
      await db.clear();
    } catch (e) {
      console.error(e);
    }
  }, []);
}

export { useOrganisationUnitData, useClearOrganisationData };
