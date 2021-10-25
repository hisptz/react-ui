export default class DataSource {
    label: string;
    type: string;

    constructor({label, type}: { label: string, type: string }) {
        this.label = label;
        this.type = type;
        this.getDataSources = this.getDataSources.bind(this);
        this.getGroups = this.getGroups.bind(this);
    }

    async getGroups(engine: any): Promise<void> {
    }

    async getDataSources(engine: any, {
        filter,
        page,
        programId
    }: { filter?: Array<string>, page: number, programId?: string }): Promise<object> {
        return {}
    }

    async filter(engine: any, {
        selectedGroup,
        page,
        searchKeyword
    }: { selectedGroup: { id: string }, page: number, searchKeyword: string }): Promise<object | string | undefined> {
        return;
    }

}
