import i18n from "@dhis2/d2-i18n";
import { Button, Field, IconCross24, InputField } from "@dhis2/ui";
import { DateTime } from "luxon";
import React, { useCallback, useMemo } from "react";
import { VALUE_TYPES } from "../../constants";
import { FinalFormFieldInput } from "../../types";
import classes from "./AgeField.module.css";
import { formatDate, getValues } from "./utils";

export default function AgeField({ name, value, onChange, error, max, ...props }: FinalFormFieldInput, ref: React.Ref<any>) {
  const { years, months, days } = useMemo(() => getValues(value), [value]);

  const onDateChange = useCallback(
    ({ value, name }: { value: any; name: string }) => {
      onChange({ name, value: new Date(value).toISOString() });
    },
    [onChange]
  );

  const onClear = useCallback(() => {
    onChange({ name, value: "" });
  }, [onChange]);

  return (
    <Field error={Boolean(error)} name={name}>
      <div className={classes["age-field-container"]}>
        <div className={classes["date-input"]}>
          <InputField
            {...props}
            max={max ?? DateTime.now().toFormat("yyyy-LL-dd")}
            error={Boolean(error)}
            ref={ref}
            value={formatDate(value)}
            label={i18n.t("Date")}
            name={name}
            onChange={onDateChange}
            type={VALUE_TYPES.DATE.formName}
          />
        </div>
        <div style={{ width: value ? "40%" : "50%" }} className={classes["age-inputs-container"]}>
          <InputField className={classes["age-input"]} value={`${Math.floor(years as number)}`} disabled label={i18n.t("Years")} type="number" />
          <InputField className={classes["age-input"]} value={`${Math.floor(months as number)}`} disabled label={i18n.t("Months")} type="number" />
          <InputField className={classes["age-input"]} value={`${Math.floor(days as number)}`} disabled label={i18n.t("Days")} type="number" />
        </div>
        {value && <Button className={classes["clear-button"]} icon={<IconCross24 />} onClick={onClear} />}
      </div>
    </Field>
  );
}
