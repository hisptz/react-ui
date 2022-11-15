import { CustomGoogleEngineLayer } from "../MapLayer/interfaces";
import { Controller, FormProvider, useFormContext, UseFormReturn, useWatch } from "react-hook-form";
import React, { useEffect, useMemo } from "react";
import { EARTH_ENGINE_LAYERS, SUPPORTED_EARTH_ENGINE_LAYERS } from "../MapLayer/components/GoogleEngineLayer/constants";
import { capitalize, filter, find, head, isEmpty } from "lodash";
import i18n from "@dhis2/d2-i18n";
import { CenteredContent, CircularLoader, Field, InputField, MultiSelectField, MultiSelectOption, SingleSelectField, SingleSelectOption } from "@dhis2/ui";
import { useGoogleEngineToken } from "../MapLayer/components/GoogleEngineLayer/hooks";
import { EarthEngineOptions } from "../MapLayer/components/GoogleEngineLayer/interfaces";
import { EarthEngine } from "../MapLayer/components/GoogleEngineLayer/services/engine";
import { useQuery } from "react-query";
import ColorScaleSelect from "../ThematicLayerConfiguration/components/ColorScaleSelect";
import { defaultClasses, defaultColorScaleName, getColorClasses, getColorPalette, getColorScale } from "../../utils/colors";

export interface EarthEngineLayerConfigurationProps {
  config: CustomGoogleEngineLayer;
  form: UseFormReturn<CustomGoogleEngineLayer>;
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
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue("aggregations", config?.defaultAggregations);
  }, [config]);

  if (!config?.defaultAggregations) {
    return null;
  }

  const supportedAggregations = config?.defaultAggregations ?? [];

  return (
    <Controller
      render={({ field, fieldState }) => {
        return (
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
  const { refresh, token, loading } = useGoogleEngineToken();

  async function getInfo() {
    if (config && token) {
      await EarthEngine.setToken(token, refresh);
      const engine = new EarthEngine({
        options: config,
      });
      return engine.getPeriod();
    }
  }

  const { data, error, isLoading } = useQuery([token, config], getInfo);

  useEffect(() => {
    async function getToken() {
      if (shouldRun) {
        await refresh();
      }
    }

    getToken();
  }, [refresh, shouldRun]);

  const periods = useMemo(() => {
    const features = (data as any)?.features;
    return features?.map((feature: any) => {
      return new Date(feature?.properties["system:time_start"])?.getFullYear();
    });
  }, [data]);

  return {
    loading: loading || isLoading,
    error: error as any,
    periods,
  };
}

function PeriodSelector() {
  const config = useType();
  const { setValue } = useFormContext();
  const filters = config?.filters ?? [];
  const hasPeriodFilter = filters.includes("period");
  const { loading, error, periods } = useDatasetInfo(hasPeriodFilter, config);

  useEffect(() => {
    if (!isEmpty(periods)) {
      setValue("period", head(periods));
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
      name="period"
      rules={{
        required: i18n.t("Period is required"),
      }}
      render={({ field, fieldState }) => (
        <div className="row gap-8 align-items-center">
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
  const config = useType();
  const { setValue } = useFormContext();
  const scale = useWatch({
    name: "params.scale",
  });

  useEffect(() => {
    if (config?.params) {
      const { max, min, palette } = config.params;
      setValue("params.max", max);
      setValue("params.min", min);
      setValue("params.palette", palette);
    } else {
      setValue("params", undefined);
    }
  }, [config?.params]);

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

export function EarthEngineLayerConfiguration({ config, form, excluded }: EarthEngineLayerConfigurationProps) {
  const supportedLayers = filter(EARTH_ENGINE_LAYERS, ({ id }) => SUPPORTED_EARTH_ENGINE_LAYERS.includes(id) && !(excluded?.includes(id) ?? false));

  return (
    <FormProvider {...form}>
      <div className="column gap-16">
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
              onChange={({ selected }: { selected: string }) => field.onChange(selected)}
              selected={field.value}>
              {supportedLayers?.map((layer) => (
                <SingleSelectOption key={`${layer.id}-option`} value={layer.id} label={layer.name} />
              ))}
            </SingleSelectField>
          )}
        />
        <AggregationSelector />
        <PeriodSelector />
        <StylesConfig />
      </div>
    </FormProvider>
  );
}
