import DataSource from "components/DataSourceSelector/models/dataSource";
import { DataSourceResponse } from "components/DataSourceSelector/types";
export default class DataSets extends DataSource {
    groupKey: string;
    groupResource: string;
    categories: Array<{
        label: string;
        id: string;
    }>;
    groups: Array<any>;
    groupQuery: any;
    constructor({ label }: {
        label: string;
    });
    getData(engine: any): Promise<void>;
    getDataSources(engine: any, { filter, page }: {
        filter: Array<string>;
        page: number;
    }): Promise<{
        pager: any;
        data: unknown[];
    }>;
    getGroups(engine: any): Promise<any>;
    filter(engine: any, { filter, selectedGroup, page, searchKeyword }: {
        filter: Array<string>;
        selectedGroup: {
            id: string;
        };
        page: number;
        searchKeyword: string;
    }): Promise<DataSourceResponse>;
}
