import { ChartConfiguration } from '../types/props';
export declare function getInitialChartObject(analyticsObject: any, chartConfiguration: ChartConfiguration): {
    chart: any;
    title: any;
    subtitle: {
        text: string;
        align: string;
        style: {
            fontWeight: string;
            fontSize: string;
        };
    } | null;
    credits: any;
    colors: any[];
    plotOptions: any;
    tooltip: {};
};
