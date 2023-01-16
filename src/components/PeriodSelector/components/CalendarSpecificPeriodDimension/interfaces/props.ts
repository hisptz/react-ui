import { PeriodInterface } from "@iapps/period-utilities";
import { Period } from "./period";

export interface CalendarSpecificPeriodSelectorProps {
  singleSelection?: boolean;
  excludedPeriodTypes: Array<string>;
  calendar: string;
  onSelect?: ({ items }: { items: Array<PeriodInterface | Period> }) => void;
  selectedPeriods?: Array<PeriodInterface>;
  excludeRelativePeriods?: boolean;
  excludeFixedPeriods?: boolean;
  allowFuturePeriods?: boolean;
}
