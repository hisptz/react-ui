import i18n from "@dhis2/d2-i18n";
import { Button, Field, IconAdd24 } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RHFCustomInput } from "../../../index";
import { VALUE_TYPES } from "../../FormField/constants";

export function AddLegendDefinition({ onAdd }: {
  onAdd: (legendDefinition: any) => void;
}) {
  const form = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });

  const onAddClick = () => {
    form.handleSubmit(({ newLegendDefinition }) => onAdd(newLegendDefinition))();
    form.reset({ newLegendDefinition: { color: "", name: "" } });
  };

  const value = form.watch("newLegendDefinition");
  const disableButton = !value?.color || !value?.name;
  const error = form.getFieldState("newLegendDefinition")?.error;

  return (
    <FormProvider {...form}>
      <Field error={error} validationText={error?.message} label={i18n.t("New Legend Definition")}>
        <div className="row gap-16 align-items-center">
          <RHFCustomInput
            validations={{
              validate: (value: any) => {
                if (!value?.color) {
                  return i18n.t("Color is required");
                }
                if (!value?.name) {
                  return i18n.t("Label is required");
                }
                return true;
              }
            }}
            name="newLegendDefinition"
            valueType={VALUE_TYPES.LEGEND_DEFINITION.name} />
          <Button disabled={disableButton} icon={<IconAdd24 />}
                  onClick={onAddClick}>{i18n.t("Add")}</Button>
        </div>
      </Field>
    </FormProvider>
  );
}

AddLegendDefinition.propTypes = {
  onAdd: PropTypes.func.isRequired
};

