import { Collection, IndexableType, Table } from "dexie";
import { cloneDeep, forEach, head, intersection, isEmpty, set, tail } from "lodash";
import { OfflineOrganisationUnit, OfflineOrganisationUnitGroup, OfflineOrganisationUnitLevel } from "../../../services/db";

async function getFromEngine(engine: any, query: any) {
  return (await engine.query({ query }))?.query;
}

async function getData(instance: Table<OfflineOrganisationUnitGroup> | Table<OfflineOrganisationUnitLevel>, query: any, { engine }: { engine: any }) {
  if (query.id) {
    const data = head(await instance.where("id").equals(query.id).toArray());
    if (!isEmpty(data)) {
      return data;
    } else {
      const data = await getFromEngine(engine, query);
      if (!isEmpty(data)) {
        await instance.add(data);
      }
      return data;
    }
  }

  const data = await instance.toArray();
  if (!isEmpty(data)) {
    return {
      [query.resource]: data,
    };
  }
  const dataFromEngine = await getFromEngine(engine, query);
  return {
    [query.resource]: dataFromEngine?.[query.resource],
  };
}

async function getOrgUnitById(instance: Table<OfflineOrganisationUnit>, query: any, engine: any) {
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
  }
  const dataFromEngine = await getFromEngine(engine, query);
  if (dataFromEngine) {
    await instance.add(dataFromEngine);
  }
  return {
    [query.resource]: dataFromEngine,
  };
}

function generateWhereFromFilter(instance: Table<OfflineOrganisationUnit>, filter: string): Collection<OfflineOrganisationUnit, IndexableType> {
  const [type, , value] = filter.split(":");
  const orgUnitGroups = [];
  switch (type) {
    case "organisationUnitGroups.id":
      if (value.includes("[")) {
        orgUnitGroups.push(...[...value?.trim().replace("[", "").replace("]", "").split(",")]);
      } else {
        orgUnitGroups.push(value);
      }
      return instance.where("organisationUnitGroups").anyOfIgnoreCase(...orgUnitGroups);
    case "identifiable":
      return instance.where("id").startsWithIgnoreCase(value).or("displayName").startsWithAnyOfIgnoreCase(value);
  }
  return instance.toCollection();
}

function filterByStringFilter(ou: OfflineOrganisationUnit, filter: string): boolean {
  const [type, , value] = filter.split(":");
  const orgUnitGroups = [];
  switch (type) {
    case "organisationUnitGroups.id":
      if (value.includes("[")) {
        orgUnitGroups.push(...[...value?.trim().replace("[", "").replace("]", "").split(",")]);
      } else {
        orgUnitGroups.push(value);
      }
      return !isEmpty(intersection(orgUnitGroups, ou.organisationUnitGroups));
    case "identifiable":
      return !!ou.id.match(value) || !!ou.displayName.match(value);
  }
  return false;
}

async function getOrgUnits(instance: Table<OfflineOrganisationUnit>, query: any, { engine }: { engine: any }) {
  try {
    if (query.id) {
      return getOrgUnitById(instance, query, engine);
    }
    if (query.params.userDataViewFallback) {
      return await getFromEngine(engine, query);
    }
    if (!isEmpty(query.params.filter)) {
      const filter = query.params.filter;
      const filters: string[] = (Array.isArray(filter) ? filter : [filter]).reverse();
      let data;
      if (filters.length === 1) {
        data = await generateWhereFromFilter(instance, filters[0]).toArray();
      } else {
        const collection = generateWhereFromFilter(instance, filters[0]);
        collection.and((ou) => {
          //Filter all the rest filters, can be pretty slow...
          let value = false;
          for (const filter of tail(filters)) {
            value = value || filterByStringFilter(ou, filter);
          }
          return value;
        });
        data = await collection.toArray();
      }
      if (!isEmpty(data)) {
        return {
          [query.resource]: data,
        };
      }
      const dataFromEngine = await getFromEngine(engine, query);
      return {
        [query.resource]: dataFromEngine?.organisationUnits,
      };
    }
    return {
      [query.resource]: await instance.toArray(),
    };
  } catch (e) {
    console.info("Could not get data from cache...");
    return {
      [query.resource]: await getFromEngine(engine, query),
    };
  }
}

export { getData, getOrgUnits };
