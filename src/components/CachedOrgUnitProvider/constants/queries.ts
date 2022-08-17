const levelQuery = {
  levels: {
    resource: "organisationUnitLevels",
    params: ({ page, pageSize }: any) => ({
      fields: "id,name,displayName,level",
      pageSize,
      page,
    }),
  },
};
const groupQuery = {
  groups: {
    resource: "organisationUnitGroups",
    params: ({ page, pageSize }: any) => ({
      fields: "id,name,displayName",
      pageSize,
      page,
    }),
  },
};
const ouQuery = {
  ous: {
    resource: "organisationUnits",
    params: ({ page, pageSize }: any) => ({
      fields: "id,name,displayName,level,path,organisationUnitGroups[id],parent[id]",
      pageSize,
      page,
    }),
  },
};

export { levelQuery, groupQuery, ouQuery };
