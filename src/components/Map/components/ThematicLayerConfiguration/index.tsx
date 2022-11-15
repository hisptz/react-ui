import i18n from "@dhis2/d2-i18n";
import { Button, Field, InputField, Radio, SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import { Controller, FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import React, { useMemo, useState } from "react";
import { compact } from "lodash";
import { defaultClasses, defaultColorScaleName } from "../../utils/colors";
import { CustomThematicPrimitiveLayer } from "../MapLayer/interfaces";
import IndicatorSelectorModal from "./components/IndicatorSelectorModal";
import { LegendSetSelector } from "./components/LegendSetSelector";
import { CustomLegend } from "./components/CustomLegend";

export interface ThematicLayerConfigurationProps {
  config?: CustomThematicPrimitiveLayer;
  exclude?: string[];
  form: UseFormReturn<CustomThematicPrimitiveLayer>;
}

export function RadiusField() {
  return (
    <div className="row gap-8">
      <Controller
        render={({ field, fieldState }) => (
          <InputField
            {...field}
            error={Boolean(fieldState.error)}
            validationText={fieldState.error?.message}
            value={field.value.toString()}
            onChange={({ value }: { value: string }) => field.onChange(parseInt(value))}
            label={i18n.t("Min radius")}
            type="number"
          />
        )}
        name={"radius.min"}
      />
      <Controller
        render={({ field, fieldState }) => (
          <InputField
            value={field.value.toString()}
            onChange={({ value }: { value: string }) => field.onChange(parseInt(value))}
            label={i18n.t("Max radius")}
            type="number"
          />
        )}
        name={"radius.max"}
      />
    </div>
  );
}

export function ThematicLayerConfiguration({ config, exclude, form }: ThematicLayerConfigurationProps) {
  const [legendType, setLegendType] = useState(config?.dataItem.legendSet ? "legendSet" : "custom");
  const [dataSelectorOpen, setDataSelectorOpen] = useState(false);

  const type = useWatch({
    control: form.control,
    name: "type",
  });

  const onLegendTypeChange =
    (type: string) =>
    ({ value }: { value: string }) => {
      if (type === "custom") {
        form.setValue("dataItem.legendSet", undefined);
        form.setValue("dataItem.legendConfig.scale", defaultClasses);
        form.setValue("dataItem.legendConfig.colorClass", defaultColorScaleName);
      } else {
        form.setValue("dataItem.legendConfig", undefined);
      }
      setLegendType(value);
    };
  const disabled = useMemo(() => exclude?.filter((indicator) => indicator !== config?.dataItem?.id) ?? [], [config, exclude]);
  return (
    <FormProvider {...form}>
      <div className="column gap-16">
        <Controller
          rules={{
            required: i18n.t("Layer type is required"),
          }}
          render={({ field, fieldState }) => {
            return (
              <SingleSelectField
                label={i18n.t("Layer type")}
                required
                error={Boolean(fieldState.error)}
                validationText={fieldState.error?.message}
                onChange={({ selected }: { selected: string }) => field.onChange(selected)}
                selected={field.value}>
                <SingleSelectOption value={"choropleth"} label={i18n.t("Choropleth")} />
                <SingleSelectOption value={"bubble"} label={i18n.t("Bubble")} />
              </SingleSelectField>
            );
          }}
          name={"type"}
        />
        <Controller
          rules={{
            validate: {
              required: (value: { id: string; name: string }) => {
                return Boolean(value?.id) || i18n.t("A data item is required");
              },
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <div style={{ alignItems: "flex-end" }} className="row w-100 gap-16 align-end">
                <div onClick={() => setDataSelectorOpen(true)} style={{ flex: 1 }}>
                  <InputField
                    required
                    error={Boolean(fieldState.error)}
                    validationText={fieldState.error?.message}
                    disabled
                    inputWidth="100%"
                    label={i18n.t("Data Item")}
                    value={field.value?.name}
                  />
                </div>
                <Button onClick={() => setDataSelectorOpen(true)}>{field.value?.id ? i18n.t("Change") : i18n.t("Select")}</Button>
              </div>
              {dataSelectorOpen && (
                <IndicatorSelectorModal
                  disabled={disabled}
                  onUpdate={(values: any[]) => {
                    const [indicator] = values ?? [];
                    field.onChange({
                      id: indicator.id,
                      name: indicator.displayName,
                    });
                  }}
                  onClose={() => setDataSelectorOpen(false)}
                  hide={!dataSelectorOpen}
                  selected={compact([
                    {
                      id: field.value?.id,
                      displayName: field.value?.name,
                    },
                  ])}
                />
              )}
            </>
          )}
          name={"dataItem"}
        />
        <div>
          <Field label={i18n.t("Legend")}>
            <div className="column gap-8">
              <div className="row gap-16">
                <Radio
                  checked={legendType === "legendSet"}
                  label={i18n.t("Legend set")}
                  name="legendSet"
                  value="legendSet"
                  onChange={onLegendTypeChange("legendSet")}
                />
                <Radio checked={legendType === "custom"} label={i18n.t("Custom legend")} name="custom" value="custom" onChange={onLegendTypeChange("custom")} />
              </div>
              <div>
                {legendType === "legendSet" && (
                  <Controller
                    rules={{
                      required: i18n.t("Legend set is required"),
                    }}
                    name="dataItem.legendSet"
                    render={({ field, fieldState }) => <LegendSetSelector required selected={field.value} {...field} {...fieldState} />}
                  />
                )}
                {legendType === "custom" && <CustomLegend />}
              </div>
            </div>
          </Field>
          {type === "bubble" && (
            <Field label={i18n.t("Radius")}>
              <RadiusField />
            </Field>
          )}
        </div>
      </div>
    </FormProvider>
  );
}