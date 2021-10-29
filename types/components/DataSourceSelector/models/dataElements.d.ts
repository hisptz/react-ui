import NativeDataSource from "./nativeDataSource";
export default class DataElements extends NativeDataSource {
    getDataSources(engine: any, { page, filter }: {
        page: number;
        filter: Array<string>;
    }): Promise<{
        data: any;
        pager: any;
    }>;
}
