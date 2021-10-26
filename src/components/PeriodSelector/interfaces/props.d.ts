import { Period } from "components/PeriodSelector/components/CalendarSpecificPeriodDimension/interfaces/period";
export interface PeriodSelectorProps {
    excludedPeriodTypes?: Array<string>;
    calendar?: string;
    selectedPeriods: Array<Period>;
    onSelect: ({ items }: {
        items: Array<Period>;
    }) => void;
    excludeRelativePeriods?: boolean;
    excludeFixedPeriods?: boolean;
}
