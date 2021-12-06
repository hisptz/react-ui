import { Period } from "./period";

export interface CalendarSpecificPeriodSelectorProps {
  singleSelection?: boolean;
  excludedPeriodTypes: Array<string>;
  calendar: string;
  onSelect?: ({ items }: { items: Array<Period> }) => void;
  selectedPeriods?: Array<Period>;
  excludeRelativePeriods?: boolean;
  excludeFixedPeriods?: boolean;
}
