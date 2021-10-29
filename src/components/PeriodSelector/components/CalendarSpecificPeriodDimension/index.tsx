import i18n from "@dhis2/d2-i18n";
import { CssReset, InputField, SingleSelectField, SingleSelectOption, Tab, TabBar, Transfer } from "@dhis2/ui";
import { Period } from "@iapps/period-utilities";
import { filter, find, head, isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import PeriodTransferOption from "./components/TransferOption";
import { CalendarTypes } from "./constants/calendar";
import { PeriodCategories } from "./constants/period";
import { Period as PeriodInterface } from "./interfaces/period";
import { CalendarSpecificPeriodSelectorProps } from "./interfaces/props";
import "styles/styles.css";

export default function CalendarSpecificPeriodSelector({
  excludedPeriodTypes,
  calendar,
  onSelect,
  selectedPeriods,
  excludeFixedPeriods,
  excludeRelativePeriods,
}: CalendarSpecificPeriodSelectorProps) {
  const periodInstance = new Period().setCalendar(CalendarTypes.ETHIOPIAN);

  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    periodInstance.setPreferences({ allowFuturePeriods: true });
    periodInstance.setCalendar(calendar);
    if (calendar === CalendarTypes.ETHIOPIAN) {
      setYear(new Date().getFullYear() - 7);
    } else {
      setYear(new Date().getFullYear());
    }
  }, [calendar]);

  // @ts-ignore
  const { _periodType } = periodInstance.get() ?? {};
  const { _periodTypes } = _periodType ?? {};
  const filteredPeriodTypes = filter(_periodTypes, ({ id }) => !excludedPeriodTypes.includes(id));

  const relativePeriodTypes = filter(filteredPeriodTypes, ({ id }) => id.toLowerCase().match(RegExp("relative".toLowerCase())));
  const fixedPeriodTypes = filter(filteredPeriodTypes, ({ id }) => !id.toLowerCase().match(RegExp("relative".toLowerCase())));

  const [selectedRelativePeriodType, setSelectedRelativePeriodType] = useState(head(relativePeriodTypes)?.id);
  const [selectedFixedPeriodType, setSelectedFixedPeriodType] = useState(head(fixedPeriodTypes)?.id);

  const tabs = useMemo(() => {
    const tabs = [];
    if (!isEmpty(relativePeriodTypes) && !excludeRelativePeriods) {
      tabs.push(find(Object.values(PeriodCategories), ["key", "relative"]));
    }
    if (!isEmpty(fixedPeriodTypes) && !excludeFixedPeriods) {
      tabs.push(find(Object.values(PeriodCategories), ["key", "fixed"]));
    }

    return tabs;
  }, []);

  const [selectedPeriodCategory, setSelectedPeriodCategory] = useState(head(tabs));

  useEffect(() => {
    if (excludeFixedPeriods && excludeRelativePeriods) {
      throw Error("Both Fixed and Relative Periods are excluded.");
    }
  }, [excludeFixedPeriods, excludeRelativePeriods]);

  const periods = useMemo(() => {
    if (selectedPeriodCategory) {
      if (selectedRelativePeriodType) {
        if (selectedPeriodCategory.key === PeriodCategories.RELATIVE.key) {
          return new Period().setCalendar(calendar).setYear(year).setType(selectedRelativePeriodType).get().list();
        }
      }
      if (selectedFixedPeriodType) {
        if (selectedPeriodCategory.key === PeriodCategories.FIXED.key) {
          return new Period().setCalendar(calendar).setYear(year).setType(selectedFixedPeriodType).get().list();
        }
      }
    }
    return [];
  }, [selectedPeriodCategory, selectedRelativePeriodType, selectedFixedPeriodType, year]);

  return (
    <div className="column center align-items-center w-100 m-8">
      <CssReset />
      <Transfer
        selected={selectedPeriods}
        selectedWidth={"400px"}
        optionsWidth={"400px"}
        height={"500px"}
        leftHeader={
          <div className="column pb-8">
            <TabBar fixed>
              {tabs?.map((periodCategory) => (
                <Tab
                  dataTest={`${periodCategory?.key}-tab`}
                  onClick={() => {
                    setSelectedPeriodCategory(periodCategory);
                  }}
                  selected={selectedPeriodCategory?.key === periodCategory?.key}
                  key={`${periodCategory?.key}-tab`}>
                  {periodCategory?.name}
                </Tab>
              ))}
            </TabBar>
            {selectedPeriodCategory?.key === "relative" ? (
              <div className="pt-8 pb-8">
                <SingleSelectField
                  dataTest={"relative-period-type-selector"}
                  dense
                  selected={selectedRelativePeriodType}
                  onChange={({ selected }: { selected: string }) => setSelectedRelativePeriodType(selected)}
                  label={i18n.t("Period Type")}>
                  {relativePeriodTypes?.map((periodType) => (
                    <SingleSelectOption dataTest={`${periodType?.id}-type`} key={periodType?.id} label={periodType?.name} value={periodType?.id} />
                  ))}
                </SingleSelectField>
              </div>
            ) : (
              <div className="row space-between align-items-center w-100 pt-8 pb-8">
                <div className="w-60">
                  <SingleSelectField
                    dense
                    dataTest={"fixed-period-type-selector"}
                    selected={selectedFixedPeriodType}
                    onChange={({ selected }: { selected: string }) => setSelectedFixedPeriodType(selected)}
                    label={i18n.t("Period Type")}>
                    {fixedPeriodTypes?.map((periodType) => (
                      <SingleSelectOption dataTest={`${periodType?.id}-type`} key={periodType?.id} label={periodType?.name} value={periodType?.id} />
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
        options={[...periods, ...(selectedPeriods ?? [])]?.map((period) => ({
          label: period?.name,
          value: period,
          key: period?.id,
        }))}
        renderOption={(options: any) => <PeriodTransferOption {...options} />}
        onChange={({ selected }: { selected: Array<PeriodInterface> }) => {
          if (onSelect) {
            onSelect({
              items: selected,
            });
          }
        }}
      />
    </div>
  );
}
