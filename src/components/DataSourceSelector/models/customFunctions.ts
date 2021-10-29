import { filter as _filter, flattenDeep, fromPairs, isArray, isEmpty } from "lodash";
import { DATASTORE_FUNCTIONS_ENDPOINT } from "../constants";
import DataSource from "components/DataSourceSelector/models/dataSource";
import { DataSourceResponse } from "components/DataSourceSelector/types";

const keysQuery = {
  keys: {
    resource: DATASTORE_FUNCTIONS_ENDPOINT,
  },
};

const generateQuery = (keys: Array<string> | undefined) => {
  return fromPairs(keys?.map((key) => [key, { resource: DATASTORE_FUNCTIONS_ENDPOINT, id: key }]));
};

export default class CustomFunctions extends DataSource {
  functions: any | undefined;
  keys: Array<string> | undefined;
  rules: any | undefined;
  query: any | undefined;

  constructor({ label }: { label: string }) {
    super({ resource: "", label, type: "customFunction" });
  }

  async setQuery(engine: any) {
    this.keys = (await engine.query(keysQuery))?.keys;
    this.query = generateQuery(this.keys);
  }

  async queryData(engine: any) {
    try {
      await this.setQuery(engine);
      this.functions = Object.values(await engine.query(this.query));
      this.rules = flattenDeep(
        this.functions?.map((func: any) =>
          func.rules?.map((rule: any) => ({
            id: `${func.id}.${rule.id}`,
            displayName: rule.name,
          }))
        )
      );
    } catch (e) {
      console.error(e);
      this.functions = [];
      this.rules = [];
    }
  }

  async filter(engine: any, { selectedGroup, page, searchKeyword }: { selectedGroup: { id: string }; page: number; searchKeyword: string }) {
    const filter: { group: string | undefined; search: string | undefined } = {
      group: undefined,
      search: undefined,
    };
    if (selectedGroup) {
      filter.group = selectedGroup?.id;
    }
    if (searchKeyword) {
      filter.search = searchKeyword;
    }
    return this.getDataSources(engine, { filter, page });
  }

  async getGroups(engine: any) {
    if (!this.functions) {
      await this.queryData(engine);
    }
    return this.functions;
  }

  async getDataSources(
    engine: any,
    { filter }: { filter?: Array<string> | { group: string | undefined; search: string | undefined }; page: number; programId?: string }
  ): Promise<DataSourceResponse> {
    if (!this.functions) {
      await this.queryData(engine);
    }
    if (isEmpty(filter)) {
      return {
        pager: {
          pageCount: 1,
        },
        data: this.rules,
      };
    }
    let filteredRules = this.rules;

    if (!isArray(filter) && filter?.group) {
      filteredRules = _filter(filteredRules, ({ id }) => id.startsWith(filter?.group));
    }

    if (!isArray(filter) && filter?.search) {
      filteredRules = _filter(filteredRules, ({ displayName }) => displayName.toLowerCase().match(RegExp(filter?.search?.toLowerCase() ?? "")));
    }

    return Promise.resolve({
      pager: {
        pageCount: 1,
      },
      data: filteredRules ?? [],
    });
  }
}
