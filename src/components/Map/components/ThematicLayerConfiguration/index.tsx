import i18n from "@dhis2/d2-i18n";
import { Button, ButtonStrip, Field, InputField, Modal, ModalActions, ModalContent, ModalTitle, Radio, SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import { Controller, FormProvider, useForm, useFormContext, UseFormReturn, useWatch } from "react-hook-form";
import React, { useMemo, useState } from "react";
import { compact } from "lodash";
import { defaultClasses, defaultColorScaleName } from "../../utils/colors";
import { ThematicLayerConfig } from "../MapLayer/interfaces";
import IndicatorSelectorModal from "./components/IndicatorSelectorModal";
import { LegendSetSelector } from "./components/LegendSetSelector";
import { CustomLegend } from "./components/CustomLegend";

export interface ThematicLayerConfigurationProps {
  exclude?: string[];
  form: UseFormReturn<ThematicLayerConfig>;
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
            value={field.value?.toString()}
            onChange={({ value }: { value: string }) => field.onChange(parseInt(value))}
            label={i18n.t("Min")}
            type="number"
          />
        )}
        name={"radius.min"}
      />
      <Controller
        render={({ field, fieldState }) => (
          <InputField
            value={field.value?.toString()}
            onChange={({ value }: { value: string }) => field.onChange(parseInt(value))}
            label={i18n.t("Max")}
            type="number"
          />
        )}
        name={"radius.max"}
      />
    </div>
  );
}

function TypeField() {
  const { setValue } = useFormContext();
  const resetFields = (type: string) => {
    if (type === "bubble") {
      setValue(`radius`, {
        min: 5,
        max: 30,
      });
    } else {
      setValue(`radius`, undefined);
    }
  };

  return (
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
            onChange={({ selected }: { selected: string }) => {
              resetFields(selected);
              field.onChange(selected);
            }}
            selected={field.value}>
            <SingleSelectOption value={"choropleth"} label={i18n.t("Choropleth")} />
            <SingleSelectOption value={"bubble"} label={i18n.t("Bubble")} />
          </SingleSelectField>
        );
      }}
      name={"type"}
    />
  );
}

export function ThematicLayerConfiguration({ exclude, form }: ThematicLayerConfigurationProps) {
  const [type, legendSet, dataItemId] = useWatch({
    control: form.control,
    name: ["type", "dataItem.legendSet", "dataItem.id"],
  });
  const [legendType, setLegendType] = useState(legendSet ? "legendSet" : "custom");
  const [dataSelectorOpen, setDataSelectorOpen] = useState(false);

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
  const disabled = useMemo(() => exclude?.filter((indicator) => indicator !== dataItemId) ?? [], [dataItemId, exclude]);
  return (
    <FormProvider {...form}>
      <div className="column gap-16">
        <TypeField />
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
                    value={field.value?.displayName}
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
                      displayName: indicator.displayName,
                      type: "indicator",
                    });
                  }}
                  onClose={() => setDataSelectorOpen(false)}
                  hide={!dataSelectorOpen}
                  selected={compact([
                    {
                      id: field.value?.id,
                      displayName: field.value?.displayName,
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

export interface ThematicLayerConfigModalProps {
  open: boolean;
  config?: ThematicLayerConfig;
  exclude?: string[];
  onClose: () => void;
  onChange: (config: ThematicLayerConfig) => void;
}

export function ThematicLayerConfigModal({ open, exclude, config, onClose, onChange, ...props }: ThematicLayerConfigModalProps) {
  const form = useForm<ThematicLayerConfig>({
    defaultValues: config,
  });

  const onSubmitClick = (values: ThematicLayerConfig) => {
    onChange(values);
    onClose();
  };

  return (
    <Modal {...props} open={open} onClose={onClose}>
      <ModalTitle>{i18n.t("Configure Thematic Layer")}</ModalTitle>
      <ModalContent>
        <ThematicLayerConfiguration form={form} exclude={exclude} />
      </ModalContent>
      <ModalActions>
        <ButtonStrip>
          <Button onClick={onClose}>{i18n.t("Cancel")}</Button>
          <Button primary onClick={form.handleSubmit(onSubmitClick)}>
            {i18n.t("Save")}
          </Button>
        </ButtonStrip>
      </ModalActions>
    </Modal>
  );
}
