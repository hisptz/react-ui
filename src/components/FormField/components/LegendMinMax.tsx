import { Field, InputField } from "@dhis2/ui";
import React, { useMemo } from "react";
import { uid } from "../../../core/utils";
import Legend from "../models/legend";
import { FinalFormFieldInput, LegendDefinition } from "../types";

type LegendMinMaxProps = FinalFormFieldInput & {
  legendDefinition?: LegendDefinition;
};

export default function LegendMinMax({ name, value, onChange, legendDefinition, ...props }: LegendMinMaxProps, ref: React.Ref<any>) {
  const { id, color, name: legendName } = legendDefinition ?? {};

  const legend = useMemo(() => new Legend({ legendDefinitionId: id ?? uid() }), [id]);

  if (!id) {
    return null;
  }

  return (
    <Field {...props} name={name} value={value} label={undefined}>
      <div ref={ref} className="row space-between w-100 align-items-end">
        <div className="row">
          <div
            className="pr-16"
            style={{
              backgroundColor: color,
              border: `1px solid ${color}`,
              height: 24,
              width: 48,
              marginRight: 4,
            }}
          />
          <label className="pl-8">{legendName}</label>
        </div>
        <div className="row space-between gap-16">
          <InputField
            value={value?.startValue}
            type="number"
            min={"0"}
            max={`${value?.max}`}
            onChange={({ value: newValue }: { value: { [key: string]: any } }) => {
              const object = value ?? legend;
              onChange({
                name,
                value: Legend.set(object, "startValue", newValue),
              });
            }}
            className="pr-8"
            label="Min"
          />
          <InputField
            value={value?.endValue}
            type="number"
            min={`${value?.min ?? 0}`}
            onChange={({ value: newValue }: { value: { [key: string]: any } }) => {
              const object = value ?? legend;
              onChange({
                name,
                value: Legend.set(object, "endValue", newValue),
              });
            }}
            label="Max"
          />
        </div>
      </div>
    </Field>
  );
}
