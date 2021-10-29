import NativeDataSource from "./nativeDataSource";
export default class EventDataItems extends NativeDataSource {
    constructor();
    getDataSources(engine: any, { page, programId, searchKeyword }: {
        page: number;
        programId: string;
        searchKeyword: string;
    }): Promise<{
        data: any[];
        pager: any;
    }>;
    filter(engine: any, { page, selectedGroup, searchKeyword }: {
        page: number;
        selectedGroup: {
            id: string;
        };
        searchKeyword: string;
    }): Promise<{
        data: any[];
        pager: any;
    }>;
}
