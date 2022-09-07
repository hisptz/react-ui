import i18n from "@dhis2/d2-i18n";
import { SegmentedControl } from "@dhis2/ui";
import { head, isEmpty } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import DateRange from "./components/DateRange";
import PeriodSelect from "./components/PeriodSelect";
import { DateRangeValue, PeriodSelectorProps } from "./types/props";

export default function PeriodSelector({
  excludedPeriodTypes,
  selectedPeriods,
  onSelect,
  excludeFixedPeriods,
  excludeRelativePeriods,
  singleSelection,
  enableDateRange,
  defaultInputType,
}: PeriodSelectorProps) {
  const initialInputType = useMemo(() => {
    if (!isEmpty(selectedPeriods)) {
      const period: any = head(selectedPeriods ?? []);
      if (period?.type === "RANGE") {
        return "dateRange";
      } else {
        return "period";
      }
    } else {
      return defaultInputType ?? "period";
    }
  }, []);
  const [inputType, setInputType] = useState<string>(initialInputType);

  const onInputTypeChange = useCallback(
    ({ value }: { value: string }) => {
      onSelect({ items: [] });
      setInputType(value);
    },
    [onSelect]
  );

  return (
    <div className="column gap-16">
      {enableDateRange && (
        <SegmentedControl
          selected={inputType}
          onChange={onInputTypeChange}
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
        <PeriodSelect
          singleSelection={singleSelection}
          excludedPeriodTypes={excludedPeriodTypes ?? []}
          onSelect={onSelect as unknown as (selected: { items: string[] }) => void}
          selectedPeriods={selectedPeriods as string[]}
          excludeFixedPeriods={excludeFixedPeriods}
          excludeRelativePeriods={excludeRelativePeriods}
        />
      )}
      {inputType === "dateRange" && (
        <DateRange value={selectedPeriods as DateRangeValue[]} onChange={onSelect as unknown as (selected: { items: DateRangeValue[] }) => void} />
      )}
    </div>
  );
}
