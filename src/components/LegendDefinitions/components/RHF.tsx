import React from "react";
import { Controller } from "react-hook-form";
import { FormFieldProps, LegendDefinition } from "../../FormField/types";
import LegendDefinitionsFormField from "./LegendDefinitions";


export interface RHFLegendDefinitionFormFieldProps extends FormFieldProps {
  shouldVerify: boolean;
  onResetLegends: (definitions: LegendDefinition[]) => void;
}

export default function RHFLegendDefinitions({
                                               name,
                                               label,
                                               shouldVerify,
                                               onResetLegends,
                                               control
                                             }: RHFLegendDefinitionFormFieldProps) {


  return <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      return (
        <LegendDefinitionsFormField
          {...field}
          {...fieldState}
          shouldVerify={shouldVerify}
          onResetLegends={onResetLegends}
          label={label ?? ""} />
      );
    }}

  />;
}
