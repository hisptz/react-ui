const orgUnitRootsQuery = {
    resource: 'organisationUnits',
    params: {
        fields: 'id,displayName,name',
        userDataViewFallback: true,
        paging: false
    }
};
const orgUnitLevelsQuery = {
    resource: "organisationUnitLevels",
    params: {
        fields: ["id", "displayName", "level"],
    },
};
const orgUnitGroupsQuery = {
    resource: "organisationUnitGroups",
    params: {
        fields: ["id", "displayName"],
    },
};

export const apiFetchOrganisationUnitRoots = async (dataEngine: any, onError?: (e: any) => void) => {
    const orgUnitRootsData = await dataEngine.query({
        orgUnitRoots: orgUnitRootsQuery
    }, {
        onError
    });
    return orgUnitRootsData.orgUnitRoots.organisationUnits;
};

export const apiFetchOrganisationUnitLevels = async (dataEngine: any, onError?: (e: any) => void) => {
    const orgUnitLevelsData = await dataEngine.query({
        orgUnitLevels: orgUnitLevelsQuery
    }, {
        onError
    });
    return orgUnitLevelsData.orgUnitLevels.organisationUnitLevels;
};
export const apiFetchOrganisationUnitGroups = async (dataEngine: any, onError?: (e: any) => void) => {
    const orgUnitGroupsData = await dataEngine.query({
        orgUnitGroups: orgUnitGroupsQuery
    }, {
        onError
    });
    return orgUnitGroupsData.orgUnitGroups.organisationUnitGroups;
};
