import { PeriodInterface } from "@iapps/period-utilities";
import { Period } from "../components/CalendarSpecificPeriodDimension/interfaces/period";

export type CalendarTypes = "ethiopian" | "gregorian";

export type DateRangeValue = { startDate: string; endDate: string; type: "RANGE" };

export type PeriodSelectorProps = {
  singleSelection?: boolean;
  excludedPeriodTypes?: Array<string>;
  calendar?: CalendarTypes | string;
  selectedPeriods?: Array<PeriodInterface> | Array<DateRangeValue>;
  onSelect: ({ items }: { items: Array<PeriodInterface | DateRangeValue> }) => void;
  excludeRelativePeriods?: boolean;
  excludeFixedPeriods?: boolean;
  enableDateRange?: boolean;
  defaultInputType?: "period" | "dateRange";
};
