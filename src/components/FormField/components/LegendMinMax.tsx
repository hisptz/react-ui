import { Field, InputField } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import Legend from "../models/legend";
import { FinalFormFieldInput, LegendDefinition } from "../types";

type LegendMinMaxProps = FinalFormFieldInput & {
  legendDefinition: LegendDefinition;
};

export default function LegendMinMax({ name, value, onChange, legendDefinition }: LegendMinMaxProps) {
  const { id, color, name: legendName } = legendDefinition ?? {};
  const legend = useMemo(() => new Legend({ legendDefinitionId: id }), [id]);

  return (
    <Field name={name} value={value} label={undefined}>
      <div className="row space-between w-100 align-items-end">
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
        <div className="row space-between">
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
LegendMinMax.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  legendDefinition: PropTypes.object,
  value: PropTypes.any,
};
