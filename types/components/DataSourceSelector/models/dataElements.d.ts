import NativeDataSource from "components/DataSourceSelector/models/nativeDataSource";
export default class DataElements extends NativeDataSource {
    getDataSources(engine: any, { page, filter }: {
        page: number;
        filter: Array<string>;
    }): Promise<{
        data: any;
        pager: any;
    }>;
}
