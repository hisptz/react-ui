const boundaryQuery = {
  boundaries: {
    resource: "geoFeatures",
    params: ({ orgUnitIds }: any) => ({
      ou: `ou:${orgUnitIds?.join(";")}`,
    }),
  },
};

// export function useBoundaryData(orgUnits: string[]): {
//   center: LatLngExpression;
//   bounds: LatLngTuple[];
//   data: any[];
// } {
//
//
//   return {
//     center:
//   };
// }
