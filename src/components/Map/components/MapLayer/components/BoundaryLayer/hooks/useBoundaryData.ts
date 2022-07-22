import { useMapOrganisationUnit } from "../../../../MapProvider/hooks";

export function useBoundaryData() {
  const { orgUnits } = useMapOrganisationUnit();

  return orgUnits;
}
