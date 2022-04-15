import i18n from "@dhis2/d2-i18n";
import { Button, Field, IconCross24, InputField } from "@dhis2/ui";
import React, { useCallback, useMemo } from "react";
import { VALUE_TYPES } from "../../constants";
import { FinalFormFieldInput } from "../../types";
import classes from "./AgeField.module.css";
import { getValues } from "./utils";

export default function AgeField({ name, value, onChange, error, ...props }: FinalFormFieldInput, ref: React.Ref<any>) {
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
    <Field error={Boolean(error)} {...props} name={name}>
      <div className={classes["age-field-container"]}>
        <InputField
          className={classes["date-input"]}
          ref={ref}
          value={value}
          label={i18n.t("Date")}
          name={name}
          onChange={onDateChange}
          type={VALUE_TYPES.DATE.formName}
        />
        <div className={classes["age-inputs-container"]}>
          <InputField error={Boolean(error)} className={classes["age-input"]} value={`${years}`} disabled label={i18n.t("Years")} type="number" />
          <InputField className={classes["age-input"]} value={`${months}`} disabled label={i18n.t("Months")} type="number" />
          <InputField className={classes["age-input"]} value={`${days}`} disabled label={i18n.t("Days")} type="number" />
        </div>
        {value && <Button icon={<IconCross24 />} onClick={onClear} />}
      </div>
    </Field>
  );
}
