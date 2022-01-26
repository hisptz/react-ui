import { Period } from "./period";
import { PeriodInstance } from "@iapps/period-utilities/utilities/period-instance.utility";
import { PeriodInterface } from "@iapps/period-utilities";

export interface CalendarSpecificPeriodSelectorProps {
  singleSelection?: boolean;
  excludedPeriodTypes: Array<string>;
  calendar: string;
  onSelect?: ({ items }: { items: Array<PeriodInterface | Period> }) => void;
  selectedPeriods?: Array<PeriodInterface | Period>;
  excludeRelativePeriods?: boolean;
  excludeFixedPeriods?: boolean;
}
