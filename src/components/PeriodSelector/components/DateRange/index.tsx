import i18n from "@dhis2/d2-i18n";
import { CssReset, InputField } from "@dhis2/ui";
import { PeriodInterface } from "@iapps/period-utilities";
import { head } from "lodash";
import React, { useCallback, useMemo } from "react";
import { DateRangeValue } from "../../types/props";

export default function DateRange({
  value,
  onChange,
}: {
  value?: DateRangeValue[] | PeriodInterface[];
  onChange: ({ items }: { items: DateRangeValue[] }) => void;
}) {
  const data = useMemo(() => head(value as DateRangeValue[]) ?? { startDate: "", endDate: "", type: "RANGE" }, [value]);
  const { startDate, endDate } = data;

  const onDateChange = useCallback(
    (key: string) =>
      ({ value: dateValue }: { value: string }) => {
        onChange({
          items: [{ ...data, [key]: dateValue } as DateRangeValue],
        });
      },
    [data]
  );

  return (
    <div className="column gap-16">
      <CssReset />
      <InputField value={startDate} onChange={onDateChange("startDate")} max={endDate} type="date" label={i18n.t("Start Date")} />
      <InputField value={endDate} onChange={onDateChange("endDate")} min={startDate} type="date" label={i18n.t("End Date")} />
    </div>
  );
}
