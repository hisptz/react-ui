export default class Legend {
    id: string;
    legendDefinitionId: string;
    startValue: number | undefined;
    endValue: number | undefined;
    constructor({ id, legendDefinitionId }: {
        id?: string;
        legendDefinitionId: string;
    });
    static set(object: {
        [key: string]: any;
    }, key: string, value: any): {
        [key: string]: any;
    };
}
