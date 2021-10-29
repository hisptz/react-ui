import React from "react";
import CalendarSpecificPeriodSelector from "./components/CalendarSpecificPeriodDimension";
import { CalendarTypes } from "./components/CalendarSpecificPeriodDimension/constants/calendar";
import { PeriodSelectorProps } from "./types/props";

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
