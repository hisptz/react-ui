import { filter as _filter, flattenDeep, fromPairs, isEmpty } from "lodash";
import { DATASTORE_FUNCTIONS_ENDPOINT } from "../../../../core/constants/config";
import DataSource from "components/DataSourceSelector/models/dataSource";

const keysQuery = {
  keys: {
    resource: DATASTORE_FUNCTIONS_ENDPOINT,
  },
};

const generateQuery = (keys = []) => {
  return fromPairs(
    keys?.map((key) => [
      key,
      { resource: DATASTORE_FUNCTIONS_ENDPOINT, id: key },
    ])
  );
};

export default class CustomFunctions extends DataSource {
  constructor({ label }) {
    super({ label, type: "customFunction" });
  }

  async setQuery(engine) {
    this.keys = (await engine.query(keysQuery))?.keys;
    this.query = generateQuery(this.keys);
  }

  async queryData(engine) {
    try {
      await this.setQuery(engine);
      this.functions = Object.values(await engine.query(this.query));
      this.rules = flattenDeep(
        this.functions?.map((func) =>
          func.rules?.map((rule) => ({
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

  async filter(engine, { selectedGroup, page, searchKeyword }) {
    const filter = {};
    if (selectedGroup) {
      filter.group = selectedGroup?.id;
    }
    if (searchKeyword) {
      filter.search = searchKeyword;
    }
    return this.getDataSources(engine, { filter, page });
  }

  async getGroups(engine) {
    if (!this.functions) {
      await this.queryData(engine);
    }
    return this.functions;
  }

  async getDataSources(engine, { filter }) {
    if (!this.functions) {
      await this.queryData(engine);
    }
    if (isEmpty(filter)) {
      return {
        pager: {},
        data: this.rules,
      };
    }
    let filteredRules = this.rules;

    if (filter?.group) {
      filteredRules = _filter(filteredRules, ({ id }) =>
        id.startsWith(filter?.group)
      );
    }

    if (filter?.search) {
      filteredRules = _filter(filteredRules, ({ displayName }) =>
        displayName.toLowerCase().match(RegExp(filter?.search.toLowerCase()))
      );
    }

    return {
      pager: {},
      data: filteredRules,
    };
  }
}
