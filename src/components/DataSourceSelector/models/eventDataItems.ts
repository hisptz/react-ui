import { filter as _filter, isEmpty } from "lodash";
import NativeDataSource from "components/DataSourceSelector/models/nativeDataSource";

export default class EventDataItems extends NativeDataSource {
  constructor() {
    super({
      label: "Event Data Items",
      resource: "programTrackedEntityAttributes",
      dimensionItemType: "[PROGRAM_DATA_ELEMENT,PROGRAM_ATTRIBUTE]",
      filterType: "in",
      groupKey: "programId",
      groupResource: "programs",
      type: "programDataItem",
    });

    this.dataSourcesQuery = {
      attributes: {
        resource: "programs",
        id: ({ id }: { id: string }) => id,
        params: {
          fields: ["id", "programTrackedEntityAttributes[trackedEntityAttribute[id,displayName,valueType]]"],
        },
      },
      dataElements: {
        resource: "programDataElements",
        params: ({ id, page, filter }: { id: string; page: number; filter: Array<string> }) => ({
          program: id,
          page,
          filter: [`valueType:eq:NUMBER`, ...filter],
          fields: ["dataElement[id,displayName]", "displayName", "valueType"],
        }),
      },
    };
  }

  async getDataSources(engine: any, { page, programId, searchKeyword }: { page: number; programId: string; searchKeyword: string }) {
    if (!isEmpty(programId)) {
      const response = await engine?.query(this.dataSourcesQuery, {
        variables: {
          page,
          id: programId,
          filter: searchKeyword ? [`displayName:ilike:${searchKeyword}`] : [],
        },
      });
      const trackedEntityAttributes = _filter(
        response?.sources?.programTrackedEntityAttributes?.map(({ trackedEntityAttribute }: { trackedEntityAttribute: string }) => trackedEntityAttribute),
        ["valueType", "NUMBER"]
      );
      const filteredTrackedEntityAttributes = searchKeyword
        ? _filter(trackedEntityAttributes, ({ displayName }) => displayName.toLowerCase().match(RegExp(searchKeyword.toLowerCase())))
        : trackedEntityAttributes;
      const dataElements = response?.dataElements?.programDataElements?.map(({ dataElement }: { dataElement: string }) => dataElement);
      return {
        data: [...filteredTrackedEntityAttributes, ...dataElements],
        pager: response?.dataElements?.pager,
      };
    }
    return {
      data: [],
      pager: {},
    };
  }

  async filter(engine: any, { page, selectedGroup, searchKeyword }: { page: number; selectedGroup: { id: string }; searchKeyword: string }) {
    return this.getDataSources(engine, {
      page,
      programId: selectedGroup?.id,
      searchKeyword,
    });
  }
}
