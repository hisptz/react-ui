import i18n from "@dhis2/d2-i18n";
import { CssReset, InputField, SingleSelectField, SingleSelectOption, Tab, TabBar, Transfer } from "@dhis2/ui";
import { BasePeriod, PeriodTypeCategory, PeriodUtility } from "@hisptz/dhis2-utils";
import { capitalize, compact } from "lodash";
import React from "react";
import { usePeriodGenerator } from "../Selector/hooks";
import PeriodTransferOption from "./components/TransferOption";
import { PeriodSelectProps } from "./interfaces/props";
import "../../../../styles/styles.css";

export default function PeriodSelect({
  excludedPeriodTypes,
  onSelect,
  selectedPeriods,
  excludeFixedPeriods,
  excludeRelativePeriods,
  singleSelection,
}: PeriodSelectProps) {
  const { categories, setCategory, category, periodTypeId, setPeriodTypeId, periodTypes, year, setYear, periods } = usePeriodGenerator(
    {
      allowFuturePeriods: true,
    },
    {
      excludeFixedPeriods: excludeFixedPeriods,
      excludedPeriodTypes,
      excludeRelativePeriods,
    }
  );

  return (
    <div style={{ maxHeight: 500, overflow: "auto" }} className="column center align-items-center w-100">
      <CssReset />
      <Transfer
        maxSelections={singleSelection ? 1 : undefined}
        selected={selectedPeriods}
        selectedWidth={"400px"}
        optionsWidth={"400px"}
        height={"400px"}
        leftHeader={
          <div className="column pb-8">
            <TabBar fixed>
              {categories?.map((periodCategory) => (
                <Tab
                  dataTest={`${periodCategory}-tab`}
                  onClick={() => {
                    setCategory(periodCategory);
                  }}
                  selected={category === periodCategory}
                  key={`${periodCategory}-tab`}>
                  {capitalize(periodCategory)}
                </Tab>
              ))}
            </TabBar>
            {category === PeriodTypeCategory.RELATIVE ? (
              <div className="pt-8 pb-8">
                <SingleSelectField
                  dataTest={"relative-period-type-selector"}
                  dense
                  selected={periodTypeId}
                  onChange={({ selected }: { selected: string }) => setPeriodTypeId(selected)}
                  label={i18n.t("Period Type")}>
                  {periodTypes?.map((periodType) => (
                    <SingleSelectOption dataTest={`${periodType?.id}-type`} key={periodType?.id} label={periodType.config.name} value={periodType?.id} />
                  ))}
                </SingleSelectField>
              </div>
            ) : (
              <div className="row space-between align-items-center w-100 pt-8 pb-8 gap-8">
                <div className="w-60">
                  <SingleSelectField
                    dense
                    dataTest={"fixed-period-type-selector"}
                    selected={periodTypeId}
                    onChange={({ selected }: { selected: string }) => setPeriodTypeId(selected)}
                    label={i18n.t("Period Type")}>
                    {periodTypes?.map((periodType) => (
                      <SingleSelectOption dataTest={`${periodType?.id}-type`} key={periodType?.id} label={periodType.config.name} value={periodType?.id} />
                    ))}
                  </SingleSelectField>
                </div>
                <div className="w-40">
                  <InputField
                    dataTest="year-input"
                    name={"year"}
                    dense
                    label={i18n.t("Year")}
                    type={"number"}
                    value={year}
                    onChange={({ value }: { value: number }) => setYear(value)}
                  />
                </div>
              </div>
            )}
          </div>
        }
        options={[...periods, ...(selectedPeriods?.map((id) => PeriodUtility.getPeriodById(id)) ?? [])]?.map((period: BasePeriod) => {
          return {
            label: period?.name,
            value: period?.id,
            key: period?.id,
          };
        })}
        renderOption={(options: any) => <PeriodTransferOption {...options} />}
        onChange={({ selected }: { selected: Array<string> }) => {
          if (onSelect) {
            onSelect({
              items: compact(
                selected.map((id) => {
                  try {
                    return id;
                  } catch (e) {
                    return undefined;
                  }
                })
              ),
            });
          }
        }}
      />
    </div>
  );
}
