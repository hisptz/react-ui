import { EarthEngineLayerConfig } from "../MapLayer/interfaces";
import { Controller, FormProvider, useForm, useFormContext, UseFormReturn, useWatch } from "react-hook-form";
import React, { useEffect, useMemo } from "react";
import { EARTH_ENGINE_LAYERS, SUPPORTED_EARTH_ENGINE_LAYERS } from "../MapLayer/components/GoogleEngineLayer/constants";
import { capitalize, filter, find, head, isEmpty } from "lodash";
import i18n from "@dhis2/d2-i18n";
import {
  Button,
  ButtonStrip,
  CenteredContent,
  CircularLoader,
  Field,
  InputField,
  Modal,
  ModalActions,
  ModalContent,
  ModalTitle,
  MultiSelectField,
  MultiSelectOption,
  SingleSelectField,
  SingleSelectOption,
} from "@dhis2/ui";
import { useGoogleEngineToken } from "../MapLayer/components/GoogleEngineLayer/hooks";
import { EarthEngineOptions } from "../MapLayer/components/GoogleEngineLayer/interfaces";
import { EarthEngine } from "../MapLayer/components/GoogleEngineLayer/services/engine";
import { useQuery } from "react-query";
import ColorScaleSelect from "../ThematicLayerConfiguration/components/ColorScaleSelect";
import { defaultClasses, defaultColorScaleName, getColorClasses, getColorPalette, getColorScale } from "../../utils/colors";

export interface EarthEngineLayerConfigurationProps {
  form: UseFormReturn<EarthEngineLayerConfig>;
  excluded?: string[];
}

function useType() {
  const type = useWatch({
    name: "type",
  });
  return find(EARTH_ENGINE_LAYERS, ["id", type]);
}

function AggregationSelector() {
  const config = useType();

  if (!config?.defaultAggregations) {
    return null;
  }

  const supportedAggregations = config?.defaultAggregations ?? [];

  const maxAggregations = config?.maxAggregations;

  return (
    <Controller
      render={({ field, fieldState }) => {
        return maxAggregations === 1 ? (
          <SingleSelectField
            clearable
            error={Boolean(fieldState.error)}
            validationText={fieldState?.error?.message}
            selected={supportedAggregations.includes(head(field.value) ?? "") ? head(field.value) : undefined}
            onChange={({ selected }: { selected: string }) => field.onChange([selected])}
            label={i18n.t("Aggregation")}>
            {supportedAggregations.map((aggregation) => (
              <SingleSelectOption key={`${aggregation}-option`} label={capitalize(aggregation)} value={aggregation} />
            ))}
          </SingleSelectField>
        ) : (
          <MultiSelectField
            error={Boolean(fieldState.error)}
            validationText={fieldState?.error?.message}
            selected={field.value?.filter((value: string) => supportedAggregations?.includes(value))}
            onChange={({ selected }: { selected: string[] }) => field.onChange(selected)}
            label={i18n.t("Aggregations")}>
            {supportedAggregations.map((aggregation) => (
              <MultiSelectOption key={`${aggregation}-option`} label={capitalize(aggregation)} value={aggregation} />
            ))}
          </MultiSelectField>
        );
      }}
      name={"aggregations"}
    />
  );
}

function useDatasetInfo(shouldRun: boolean, config?: EarthEngineOptions) {
  const { refresh } = useGoogleEngineToken();

  async function getInfo() {
    if (config) {
      const tokenData = await refresh();
      await EarthEngine.setToken(tokenData.token, refresh);
      const engine = new EarthEngine({
        options: config,
      });
      return engine.getPeriod();
    }
  }

  const { data, error, isLoading } = useQuery([config], getInfo);

  const periods = useMemo(() => {
    const features = (data as any)?.features;
    return features?.map((feature: any) => {
      return new Date(feature?.properties["system:time_start"])?.getFullYear();
    });
  }, [data]);

  return {
    loading: isLoading,
    error: error as any,
    periods,
  };
}

function PeriodSelector() {
  const config = useType();
  const { setValue, getValues } = useFormContext();
  const filters = config?.filters ?? [];
  const hasPeriodFilter = filters.includes("period");
  const { loading, error, periods } = useDatasetInfo(hasPeriodFilter, config);
  const initialPeriod = getValues("filters.period");

  useEffect(() => {
    if (!isEmpty(periods) && !initialPeriod) {
      setValue("filters.period", head(periods));
    }
  }, [periods]);

  if (!hasPeriodFilter) {
    return null;
  }

  if (error) {
    return (
      <div style={{ minWidth: "100%", minHeight: 100 }}>
        <CenteredContent>
          <p>{error?.message ?? error?.toString()}</p>
        </CenteredContent>
      </div>
    );
  }

  return (
    <Controller
      name="filters.period"
      rules={{
        required: i18n.t("Period is required"),
      }}
      render={({ field, fieldState }) => (
        <div style={{ gap: 4 }} className="row align-items-center">
          <div style={{ flex: 1 }}>
            <SingleSelectField
              helpText={i18n.t("Available periods are set by the source data")}
              loading={loading}
              filterable
              label={i18n.t("Period")}
              required
              error={Boolean(fieldState.error)}
              validationText={fieldState.error?.message}
              onChange={({ selected }: { selected: string }) => field.onChange(parseInt(selected))}
              selected={periods?.includes(field.value) ? field.value?.toString() : undefined}>
              {periods?.map((period: number) => (
                <SingleSelectOption key={`${period}-option`} value={period.toString()} label={period.toString()} />
              ))}
            </SingleSelectField>
          </div>
          {loading && <CircularLoader extrasmall />}
        </div>
      )}
    />
  );
}

function ColorConfig() {
  return (
    <div className="column gap-16">
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
          name={"params.min"}
        />
        <Controller
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              error={Boolean(fieldState.error)}
              validationText={fieldState.error?.message}
              value={field.value?.toString()}
              onChange={({ value }: { value: string }) => field.onChange(parseInt(value))}
              label={i18n.t("Max")}
              type="number"
            />
          )}
          name={"params.max"}
        />
        <Controller
          name="params.palette"
          render={({ field, fieldState }) => {
            const palette = field.value;
            const scale = getColorClasses(palette);
            const colorClass = getColorScale(palette ?? "");

            const onChange = ({ selected }: { selected: string }) => {
              const palette = getColorPalette(colorClass as string, parseInt(selected))?.join(",");
              field.onChange(palette);
            };

            return (
              <SingleSelectField
                validationText={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                selected={scale?.toString() ?? defaultClasses.toString()}
                label={i18n.t("Steps")}
                onChange={onChange}
                name="scale">
                {[3, 4, 5, 6, 7, 8, 9].map((value) => (
                  <SingleSelectOption key={`${value}-classes-option`} label={`${value}`} value={value?.toString()} />
                ))}
              </SingleSelectField>
            );
          }}
        />
      </div>
      <div>
        <Controller
          name="params.palette"
          render={({ field, fieldState }) => {
            const palette = field.value;
            const scale = getColorClasses(palette);
            const colorClass = getColorScale(palette ?? "");

            const onChange = (colorClass: string) => {
              const palette = getColorPalette(colorClass, scale)?.join(",");
              field.onChange(palette);
            };

            return (
              <Field error={Boolean(fieldState.error)} validationText={fieldState.error?.message} label={i18n.t("Colors")}>
                <ColorScaleSelect count={scale ?? defaultClasses} colorClass={colorClass ?? defaultColorScaleName} width={300} onChange={onChange} />
              </Field>
            );
          }}
        />
      </div>
    </div>
  );
}

function StylesConfig() {
  const config = useType();
  const hasParams = Boolean(config?.params);

  if (!hasParams) {
    return null;
  }

  return (
    <div style={{ minWidth: 200, minHeight: 100 }} className="row gap-16">
      <div className="column">
        <p>
          {i18n.t("Unit")}: {config?.unit}
        </p>
        <ColorConfig />
      </div>
    </div>
  );
}

function Name() {
  const config = useType();
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue("name", config?.name);
    setValue("id", config?.id);
  }, [config]);

  return (
    <Controller
      name="name"
      rules={{
        required: i18n.t("Name is required"),
      }}
      render={({ field, fieldState }) => (
        <InputField
          label={i18n.t("Layer name")}
          type="text"
          required
          error={Boolean(fieldState.error)}
          validationText={fieldState.error?.message}
          onChange={({ value }: { value: string }) => field.onChange(value)}
          value={field.value}
        />
      )}
    />
  );
}

function TypeField({ excluded }: { excluded?: string[] }) {
  const supportedLayers = filter(EARTH_ENGINE_LAYERS, ({ id }) => SUPPORTED_EARTH_ENGINE_LAYERS.includes(id) && !(excluded?.includes(id) ?? false));
  const { setValue } = useFormContext();
  const setConfigDefaults = (selected: string) => {
    const config = find(supportedLayers, ["id", selected]);
    if (!config) return;

    if (config?.defaultAggregations) {
      setValue("aggregations", config?.defaultAggregations);
    } else {
      setValue("aggregations", undefined);
    }

    if (config?.params) {
      const { max, min, palette } = config.params;
      setValue("params.max", max);
      setValue("params.min", min);
      setValue("params.palette", palette);
    } else {
      setValue("params", undefined);
    }
  };

  return (
    <Controller
      name="type"
      rules={{
        required: i18n.t("Type is required"),
      }}
      render={({ field, fieldState }) => (
        <SingleSelectField
          label={i18n.t("Layer type")}
          required
          error={Boolean(fieldState.error)}
          validationText={fieldState.error?.message}
          onChange={({ selected }: { selected: string }) => {
            setConfigDefaults(selected);
            field.onChange(selected);
          }}
          selected={Boolean(find(supportedLayers, "id", field.value)) ? field.value : undefined}>
          {supportedLayers?.map((layer) => (
            <SingleSelectOption key={`${layer.id}-option`} value={layer.id} label={layer.name} />
          ))}
        </SingleSelectField>
      )}
    />
  );
}

export function EarthEngineLayerConfiguration({ form, excluded }: EarthEngineLayerConfigurationProps) {
  return (
    <FormProvider {...form}>
      <div className="column gap-16">
        <TypeField excluded={excluded} />
        <Name />
        <AggregationSelector />
        <PeriodSelector />
        <StylesConfig />
      </div>
    </FormProvider>
  );
}

export interface EarthEngineLayerConfigModalProps {
  open: boolean;
  config?: EarthEngineLayerConfig;
  exclude?: string[];
  onClose: () => void;
  onChange: (config: EarthEngineLayerConfig) => void;
}

export function EarthEngineLayerConfigModal({ open, exclude, config, onClose, onChange, ...props }: EarthEngineLayerConfigModalProps) {
  const form = useForm<EarthEngineLayerConfig>({
    defaultValues: config ?? {},
  });
  const onSubmitClick = (values: EarthEngineLayerConfig) => {
    onChange(values);
    onClose();
  };

  return (
    <Modal {...props} open={open} onClose={onClose}>
      <ModalTitle>{i18n.t("Configure Earth Engine Layer")}</ModalTitle>
      <ModalContent>
        <EarthEngineLayerConfiguration form={form} excluded={exclude} />
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
