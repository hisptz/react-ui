import DataSource from "../../../models/dataSource";
export default function useDataSources(selectedDataSourceType: DataSource, selectedGroup?: {
    id: string;
}): {
    data: any[] | undefined;
    error: Error | undefined;
    loading: boolean;
    nexPage: () => Promise<void>;
    search: (keyword: string) => Promise<void>;
};
