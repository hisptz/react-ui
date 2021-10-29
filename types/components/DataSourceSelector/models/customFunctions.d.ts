import { DataSourceResponse } from "../types";
import DataSource from "./dataSource";
export default class CustomFunctions extends DataSource {
    functions: any | undefined;
    keys: Array<string> | undefined;
    rules: any | undefined;
    query: any | undefined;
    constructor({ label }: {
        label: string;
    });
    setQuery(engine: any): Promise<void>;
    queryData(engine: any): Promise<void>;
    filter(engine: any, { selectedGroup, page, searchKeyword }: {
        selectedGroup: {
            id: string;
        };
        page: number;
        searchKeyword: string;
    }): Promise<DataSourceResponse>;
    getGroups(engine: any): Promise<any>;
    getDataSources(engine: any, { filter }: {
        filter?: Array<string> | {
            group: string | undefined;
            search: string | undefined;
        };
        page: number;
        programId?: string;
    }): Promise<DataSourceResponse>;
}
