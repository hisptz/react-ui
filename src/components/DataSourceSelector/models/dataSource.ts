import { DataSourceResponse } from "../types";
/* eslint-disable no-unused-vars */
export default class DataSource {
  label: string;
  type: string;
  resource: string | undefined;
  groupResource: string | undefined;
  dimensionItemType: string | undefined;
  groupKey: string | undefined;
  filterType: string | undefined;
  groupsQuery: any;
  dataSourcesQuery: any;

  constructor({ label, type, resource }: { label: string; type: string; resource: string }) {
    this.label = label;
    this.type = type;
    this.resource = resource;
    this.getDataSources = this.getDataSources.bind(this);
    this.getGroups = this.getGroups.bind(this);
  }

  async getGroups(engine: any): Promise<void> {}

  async getDataSources(
    engine: any,
    { filter, page, programId }: { filter?: Array<string> | { group: string | undefined; search: string | undefined }; page: number; programId?: string }
  ): Promise<DataSourceResponse> {
    return { data: undefined };
  }

  async filter(
    engine: any,
    { selectedGroup, page, searchKeyword }: { selectedGroup?: { id: string }; page: number; searchKeyword: string }
  ): Promise<DataSourceResponse> {
    return { data: undefined };
  }
}
