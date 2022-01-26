import { Period } from "../components/CalendarSpecificPeriodDimension/interfaces/period";
import { PeriodInterface } from "@iapps/period-utilities";

export type CalendarTypes = "ethiopian" | "gregorian";

export type PeriodSelectorProps = {
  singleSelection?: boolean;
  excludedPeriodTypes?: Array<string>;
  calendar?: CalendarTypes | string;
  selectedPeriods?: Array<Period | PeriodInterface>;
  onSelect?: ({ items }: { items: Array<Period | PeriodInterface> }) => void;
  excludeRelativePeriods?: boolean;
  excludeFixedPeriods?: boolean;
};
