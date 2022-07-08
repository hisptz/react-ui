import { PeriodInterface } from "@iapps/period-utilities";
import { PeriodInstance } from "@iapps/period-utilities/utilities/period-instance.utility";
import { Period } from "./period";

export interface CalendarSpecificPeriodSelectorProps {
  singleSelection?: boolean;
  excludedPeriodTypes: Array<string>;
  calendar: string;
  onSelect?: ({ items }: { items: Array<PeriodInterface | Period> }) => void;
  selectedPeriods?: Array<PeriodInterface>;
  excludeRelativePeriods?: boolean;
  excludeFixedPeriods?: boolean;
}
