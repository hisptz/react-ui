import { Controller, useWatch } from "react-hook-form";
import { Field, SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import { defaultClasses, defaultColorScaleName } from "../../../../utils/colors";
import i18n from "@dhis2/d2-i18n";
import ColorScaleSelect from "../ColorScaleSelect";
import React from "react";

export function CustomLegend() {
  const scale = useWatch({
    name: "dataItem.legendConfig.scale",
  });

  return (
    <div className="row gap-16 space-between">
      <div style={{ width: "30%" }}>
        <Controller
          name="dataItem.legendConfig.scale"
          render={({ field, fieldState }) => (
            <SingleSelectField
              validationText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              selected={field.value?.toString() ?? defaultClasses.toString()}
              label={i18n.t("Classes")}
              onChange={({ selected }: { selected: string }) => field.onChange(parseInt(selected))}
              name="scale">
              {[3, 4, 5, 6, 7, 8, 9].map((value) => (
                <SingleSelectOption key={`${value}-classes-option`} label={`${value}`} value={value?.toString()} />
              ))}
            </SingleSelectField>
          )}
        />
      </div>
      <div style={{ width: "70%" }}>
        <Controller
          name="dataItem.legendConfig.colorClass"
          render={({ field }) => (
            <Field label={i18n.t("Colors")}>
              <ColorScaleSelect count={scale ?? defaultClasses} colorClass={field.value ?? defaultColorScaleName} width={300} onChange={field.onChange} />
            </Field>
          )}
        />
      </div>
    </div>
  );
}
