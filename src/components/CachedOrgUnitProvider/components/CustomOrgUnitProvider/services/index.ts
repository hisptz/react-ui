import { Table } from "dexie";
import { cloneDeep, compact, forEach, head, isEmpty, last, set } from "lodash";
import { OfflineOrganisationUnit, OfflineOrganisationUnitGroup, OfflineOrganisationUnitLevel } from "../../../services/db";

async function getFromEngine(engine: any, query: any) {
  return (await engine.query({ query }))?.query;
}

async function getData(instance: Table<OfflineOrganisationUnitGroup> | Table<OfflineOrganisationUnitLevel>, query: any, { engine }: { engine: any }) {
  if (query.id) {
    const data = head(await instance.where("id").equals(query.id).toArray());
    if (data) {
      return data;
    } else {
      return getFromEngine(engine, query);
    }
  }
  return {
    [query.resource]: await instance.toArray(),
  };
}

async function getOrgUnits(instance: Table<OfflineOrganisationUnit>, query: any, { engine }: { engine: any }) {
  if (query.id) {
    const orgUnit = head(await instance.where("id").equals(query.id).toArray());
    if (orgUnit) {
      if (!isEmpty(query.params.fields)) {
        const updatedOrgUnit = cloneDeep(orgUnit);
        const children = await instance.where("parent.id").equals(updatedOrgUnit.id).toArray();
        if (!Array.isArray(query.params.fields)) {
          if (query.params.fields.includes("children")) {
            set(updatedOrgUnit, "children", children);
          }
        } else {
          forEach(query.params.fields, (field: string) => {
            if (field === "children::size") {
              set(updatedOrgUnit, "children", children.length);
            }
            if (field === "children[id,path,displayName]") {
              set(updatedOrgUnit, "children", children);
            }
          });
        }
        return updatedOrgUnit;
      }
      return orgUnit;
    } else {
      return getFromEngine(engine, query);
    }
  }
  if (query.params.userDataViewFallback) {
    return (await engine.query({ query }))?.query;
  }
  if (!isEmpty(query.params.filter)) {
    const filter = query.params.filter;
    if (Array.isArray(filter)) {
      const keywords = compact(filter.map((filterString: string) => last(filterString.split(":"))?.trim())) ?? [];
      return {
        [query.resource]: await instance.where("id").startsWithAnyOfIgnoreCase(keywords).or("displayName").startsWithAnyOfIgnoreCase(keywords).toArray(),
      };
    } else {
      const keyword: string | undefined = last(filter.split(":") as string[])?.trim();
      if (keyword) {
        return {
          [query.resource]: await instance.where("id").startsWithIgnoreCase(keyword).or("displayName").startsWithIgnoreCase(keyword).toArray(),
        };
      }
    }
  }
  return {
    [query.resource]: await instance.toArray(),
  };
}

export { getData, getOrgUnits };
