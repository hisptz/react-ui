import { Period } from "../components/CalendarSpecificPeriodDimension/interfaces/period";

export type PeriodSelectorProps = {
  excludedPeriodTypes?: Array<string>;
  calendar?: string;
  selectedPeriods?: Array<Period>;
  onSelect?: ({ items }: { items: Array<Period> }) => void;
  excludeRelativePeriods?: boolean;
  excludeFixedPeriods?: boolean;
};
