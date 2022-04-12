import { colors, Field } from "@dhis2/ui";
import React from "react";
import { LegendDefinition } from "../../FormField/types";
import { useManageLegendDefinitions } from "../hooks/useManageLegendDefinitions";
import { AddLegendDefinition } from "./AddLegendDefinition";
import { EditLegendDefinition } from "./EditLegendDefinition";

export default function LegendDefinitionsFormField({
                                                     value,
                                                     onChange,
                                                     onResetLegends,
                                                     shouldVerify,
                                                     error,
                                                     label,
                                                     name
                                                   }: { value: LegendDefinition[], shouldVerify: boolean, onResetLegends: (newDefinitions: LegendDefinition[]) => void, onChange: (value: any) => void, label: string, name: string, error?: { message?: string } }) {

  const {
    nonDefaultLegendDefinitions,
    defaultLegendDefinitions,
    onAdd,
    onDelete,
    onEdit
  } = useManageLegendDefinitions(value ?? [], {
    onChange,
    onResetLegends,
    shouldVerify
  });

  return (
    <div className="p-8" style={error ? { border: `1px solid ${colors.red600}`, borderRadius: 4 } : {}}>
      <Field error={error} validationText={error?.message} label={label}
             name={name}>
        {
          nonDefaultLegendDefinitions?.map((legendDefinition) => (
            <EditLegendDefinition key={`${legendDefinition.id}`} legendDefinition={legendDefinition}
                                  onEdit={onEdit}
                                  onDelete={onDelete} />
          ))
        }
        <div style={{ padding: 16, height: 10 }} />
        {
          defaultLegendDefinitions?.map((legendDefinition) => (
            <EditLegendDefinition key={`${legendDefinition.id}`} legendDefinition={legendDefinition}
                                  onEdit={onEdit} />
          ))
        }
        <AddLegendDefinition onAdd={onAdd} />
      </Field>
    </div>
  );
}
