// @ts-ignore
declare module "@dhis2/analytics" {
  export function PeriodDimension({
    onSelect,
    selectedPeriods,
    excludedPeriodTypes,
  }: {
    onSelect: ({ items }: { items: Array<any> }) => void;
    selectedPeriods: Array<any>;
    excludedPeriodTypes: Array<string>;
  }): React.ReactElement;

  export function apiFetchOrganisationUnitRoots(engine): any;
}
