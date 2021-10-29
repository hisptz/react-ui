import { DataSourceResponse } from "components/DataSourceSelector/types";
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
    constructor({ label, type, resource }: {
        label: string;
        type: string;
        resource: string;
    });
    getGroups(engine: any): Promise<void>;
    getDataSources(engine: any, { filter, page, programId }: {
        filter?: Array<string> | {
            group: string | undefined;
            search: string | undefined;
        };
        page: number;
        programId?: string;
    }): Promise<DataSourceResponse>;
    filter(engine: any, { selectedGroup, page, searchKeyword }: {
        selectedGroup?: {
            id: string;
        };
        page: number;
        searchKeyword: string;
    }): Promise<DataSourceResponse>;
}
