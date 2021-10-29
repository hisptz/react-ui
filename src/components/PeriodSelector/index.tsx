import React from "react";
import { CalendarTypes } from "./components/CalendarSpecificPeriodDimension/constants/calendar";
import { PeriodSelectorProps } from "./types/props";
import CalendarSpecificPeriodSelector from "components/PeriodSelector/components/CalendarSpecificPeriodDimension";

export default function PeriodSelector({
  excludedPeriodTypes,
  calendar,
  selectedPeriods,
  onSelect,
  excludeFixedPeriods,
  excludeRelativePeriods,
}: PeriodSelectorProps) {
  return (
    <CalendarSpecificPeriodSelector
      excludedPeriodTypes={excludedPeriodTypes ?? []}
      calendar={calendar ?? CalendarTypes.GREGORIAN}
      onSelect={onSelect}
      selectedPeriods={selectedPeriods}
      excludeFixedPeriods={excludeFixedPeriods}
      excludeRelativePeriods={excludeRelativePeriods}
    />
  );
}
