import type { PeriodPreference } from "@hisptz/dhis2-utils";
import { BasePeriod, PeriodTypeCategory, PeriodUtility } from "@hisptz/dhis2-utils";
import { filter, head, isEmpty } from "lodash";
import { useCallback, useMemo, useState } from "react";

export function usePeriodGenerator(
  preference: PeriodPreference,
  {
    excludedPeriodTypes,
    excludeFixedPeriods,
    excludeRelativePeriods,
  }: { excludedPeriodTypes?: string[]; excludeFixedPeriods?: boolean; excludeRelativePeriods?: boolean }
) {
  const categories = useMemo(() => {
    const categories = [];
    if (!excludeRelativePeriods) {
      categories.push(PeriodTypeCategory.RELATIVE);
    }
    if (!excludeFixedPeriods) {
      categories.push(PeriodTypeCategory.FIXED);
    }

    return categories;
  }, [excludeRelativePeriods, excludeFixedPeriods]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [category, setCategory] = useState<PeriodTypeCategory>(head(categories) ?? PeriodTypeCategory.RELATIVE);
  const periodUtility = useMemo(() => {
    return PeriodUtility.fromObject({
      year,
      preference,
      category,
    });
  }, [year, category]);
  const periodTypes = useMemo(() => periodUtility.periodTypes, [periodUtility]);
  const [periodTypeId, setPeriodTypeId] = useState<string>(periodTypes[0]?.id);

  const onCategoryChange = useCallback((updatedCategory: PeriodTypeCategory) => {
    setCategory(updatedCategory);
    setPeriodTypeId(
      PeriodUtility.fromObject({
        year,
        category: updatedCategory,
        preference,
      }).periodTypes[0]?.id
    );
  }, []);

  const periods: BasePeriod[] = useMemo(() => {
    if (periodTypeId) {
      const periodType = periodUtility.getPeriodType(periodTypeId);
      return periodType?.periods ?? [];
    }
    return [];
  }, [periodTypeId, periodUtility]);

  const filteredPeriodTypes = useMemo(() => {
    if (!isEmpty(excludedPeriodTypes)) {
      return filter(periodTypes, (type) => !(excludedPeriodTypes ?? []).includes(type.id));
    }
    return periodTypes;
  }, [periodTypes]);

  return {
    categories,
    periods,
    periodTypes: filteredPeriodTypes,
    category,
    year,
    periodTypeId,
    //Setters,
    setYear,
    setCategory: onCategoryChange,
    setPeriodTypeId,
  };
}
