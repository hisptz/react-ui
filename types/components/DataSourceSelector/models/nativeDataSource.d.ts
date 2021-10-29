import DataSource from "./dataSource";
import { DataSourceType } from "components/DataSourceSelector/types";
export default class NativeDataSource extends DataSource {
    resource: string;
    groupResource: string | undefined;
    dimensionItemType: string | undefined;
    groupKey: string | undefined;
    filterType: string | undefined;
    groupsQuery: any;
    dataSourcesQuery: any;
    constructor({ label, resource, groupResource, dimensionItemType, groupKey, type, filterType }: DataSourceType);
    getGroups(engine: any): Promise<any>;
    getDataSources(engine: any, { page, filter, programId }: {
        page: number;
        filter?: Array<string>;
        programId?: string;
    }): Promise<{
        data: any;
        pager: any;
    }>;
    filter(engine: any, { page, selectedGroup, searchKeyword }: {
        page: number;
        selectedGroup: {
            id: string;
        };
        searchKeyword: string;
    }): Promise<{
        data: any;
        pager: any;
    }>;
}
