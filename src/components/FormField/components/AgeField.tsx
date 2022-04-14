import i18n from "@dhis2/d2-i18n";
import { Button, Field, InputField } from "@dhis2/ui";
import { DateTime, Duration } from "luxon";
import React, { useCallback, useMemo } from "react";
import { VALUE_TYPES } from "../constants";
import { FinalFormFieldInput } from "../types";

function getValues(date: string) {
  if (!date) {
    return {
      years: "",
      months: "",
      days: "",
    };
  }
  const jsDate = DateTime.fromFormat(date, "yyyy-MM-dd");
  const duration = Duration.fromMillis(DateTime.now().diff(jsDate).as("milliseconds")).shiftTo("years", "months", "days");

  return {
    years: Math.round(duration.get("years")),
    months: Math.round(duration.get("months")),
    days: Math.round(duration.get("days")),
  };
}

export default function AgeField({ name, value, onChange, ...props }: FinalFormFieldInput, ref: React.Ref<any>) {
  const { years, months, days } = useMemo(() => getValues(value), [value]);

  const onDateChange = useCallback(
    ({ value, name }: { value: any; name: string }) => {
      onChange({ name, value });
    },
    [onChange]
  );

  const onClear = useCallback(() => {
    onChange({ name, value: "" });
  }, [onChange]);

  return (
    <Field {...props} name={name}>
      <div className="row gap-8 w-100 align-items-end">
        <div style={{ flex: 1, width: "60%" }}>
          <InputField ref={ref} value={value} label={i18n.t("Date")} name={name} onChange={onDateChange} type={VALUE_TYPES.DATE.formName} />
        </div>
        <div className="row gap-8 align-items-end" style={{ width: "40%" }}>
          <InputField value={`${years}`} disabled label={i18n.t("Years")} type="number" />
          <InputField value={`${months}`} disabled label={i18n.t("Months")} type="number" />
          <InputField value={`${days}`} disabled label={i18n.t("Days")} type="number" />
        </div>
        {value && <Button onClick={onClear}>Clear</Button>}
      </div>
    </Field>
  );
}
