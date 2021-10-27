import { Period } from "components/PeriodSelector/components/CalendarSpecificPeriodDimension/interfaces/period";
export declare type PeriodSelectorProps = {
    excludedPeriodTypes?: Array<string>;
    calendar?: string;
    selectedPeriods: Array<Period>;
    onSelect: ({ items }: {
        items: Array<Period>;
    }) => void;
    excludeRelativePeriods?: boolean;
    excludeFixedPeriods?: boolean;
};
