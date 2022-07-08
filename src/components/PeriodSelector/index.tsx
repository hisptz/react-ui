import i18n from "@dhis2/d2-i18n";
import { SegmentedControl } from "@dhis2/ui";
import { PeriodInterface } from "@iapps/period-utilities";
import React, { useState } from "react";
import CalendarSpecificPeriodSelector from "./components/CalendarSpecificPeriodDimension";
import DateRange from "./components/CalendarSpecificPeriodDimension/components/DateRange";
import { CalendarTypes } from "./components/CalendarSpecificPeriodDimension/constants/calendar";
import { DateRangeValue, PeriodSelectorProps } from "./types/props";

export default function PeriodSelector({
  excludedPeriodTypes,
  calendar,
  selectedPeriods,
  onSelect,
  excludeFixedPeriods,
  excludeRelativePeriods,
  singleSelection,
  enableDateRange,
}: PeriodSelectorProps) {
  const [inputType, setInputType] = useState("period");

  return (
    <div className="column gap-16">
      {enableDateRange && (
        <SegmentedControl
          selected={inputType}
          onChange={({ value }: { value: string }) => setInputType(value)}
          options={[
            {
              label: i18n.t("Period"),
              value: "period",
            },
            {
              label: i18n.t("Date Range"),
              value: "dateRange",
            },
          ]}
        />
      )}
      {inputType === "period" && (
        <CalendarSpecificPeriodSelector
          singleSelection={singleSelection}
          excludedPeriodTypes={excludedPeriodTypes ?? []}
          calendar={calendar ?? CalendarTypes.GREGORIAN}
          onSelect={onSelect}
          selectedPeriods={selectedPeriods as PeriodInterface[]}
          excludeFixedPeriods={excludeFixedPeriods}
          excludeRelativePeriods={excludeRelativePeriods}
        />
      )}
      {inputType === "dateRange" && <DateRange value={selectedPeriods as DateRangeValue[]} onChange={onSelect} />}
    </div>
  );
}
