export interface PeriodSelectProps {
  singleSelection?: boolean;
  excludedPeriodTypes: Array<string>;
  onSelect?: ({ items }: { items: Array<string> }) => void;
  selectedPeriods?: Array<string>;
  excludeRelativePeriods?: boolean;
  excludeFixedPeriods?: boolean;
}
