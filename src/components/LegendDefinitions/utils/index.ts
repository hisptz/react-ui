import { cloneDeep, isEmpty, set } from "lodash";
import { uid } from "../../../core/utils";

export function generateLegendDefaults(legendDefinitions: any[] = [], weight = 100, highIsGood = true): any[] {
  if (!isEmpty(legendDefinitions)) {
    const actualWeight = weight ?? 100; //sets 100 as the default weight
    const range = actualWeight / legendDefinitions?.length;
    const values = [];
    let legendDefinitionIterator = legendDefinitions.length - 1;
    for (let i = 0; i < actualWeight; i += range) {
      const { id } = legendDefinitions[legendDefinitionIterator];
      values.push({
        id: uid(),
        startValue: `${Math.floor(i)}`,
        endValue: `${Math.floor(i + range)}`,
        legendDefinitionId: id,
      });
      legendDefinitionIterator--;
    }
    return highIsGood ? values.reverse() : values;
  }
  return [];
}

export function resetLegends(groups: any[], legendDefinitions: any[]) {
  const newGroups = cloneDeep(groups);
  if (newGroups) {
    newGroups?.forEach((group) => {
      group?.dataHolders?.forEach((dataHolder: { dataSources: any[] }) => {
        dataHolder?.dataSources?.forEach((dataSource) => {
          set(dataSource, "legends", generateLegendDefaults(getNonDefaultLegendDefinitions(legendDefinitions)));
          if (!isEmpty(dataSource.specificTargets)) {
            dataSource.specificTargets.forEach((specificTarget: any) => {
              set(specificTarget, "legends", generateLegendDefaults(getNonDefaultLegendDefinitions(legendDefinitions)));
            });
          }
        });
      });
    });
  }
  return newGroups;
}

export function getNonDefaultLegendDefinitions(legendDefinitions: any[]): any[] {
  return legendDefinitions?.filter((legendDefinition) => !legendDefinition.isDefault) ?? [];
}

export function getDefaultLegendDefinitions(legendDefinitions: any[]): any[] {
  return legendDefinitions?.filter((legendDefinition) => legendDefinition.isDefault) ?? [];
}
