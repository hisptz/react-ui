import {find, head, isEmpty, uniqBy} from "lodash";
import {atom, selector} from "recoil";
import {
    OrgUnitLevels,
    PeriodResolverState,
    ScorecardDataSourceState,
    ScorecardViewState,
    UserState
} from "@hisptz/scorecard-state";

const OrgUnitState = atom({
    key: "cell-analysis-orgUnit-state",
    default: selector({
        key: "cell-analysis-orgUnit-selector",
        get: ({get}) => {
            return get(ScorecardViewState("orgUnitSelection"));
        },
    }),
});

const userSubUnitsQuery = {
    ou: {
        resource: "analytics",
        params: ({pe, dx, ou}) => ({
            dimension: [`ou:${ou}`, `pe:${pe}`, `dx:${dx}`],
            skipData: true,
        }),
    },
};

const orgUnitOptionOnCell = atom({
    key: "orgUnitOptionCell",
    default: false
});

const orgUnitSelectorOptionOnCell = selector({
    key: "orgUnitOptionCellSelector",
    get: ({get}) => {
        return get(orgUnitOptionOnCell)
    },
    set: ({set}, value) => {
        set(orgUnitOptionOnCell, value);
    }
});

export const InitialOrgUnits = selector({
    key: "cell-analysis-initial-org-units-resolver",
    get: async ({get}) => {
        const {
            orgUnits,
            levels,
            groups,
            userOrgUnit,
            userSubUnit,
            userSubX2Unit,
        } = get(OrgUnitState);
        const periods = get(PeriodResolverState) ?? [];
        const dataHolders = get(ScorecardDataSourceState) ?? [];
        const {organisationUnits} = get(UserState);
        const orgUnitLevels = get(OrgUnitLevels);
        let resolvedOrgUnits = orgUnits;

        if (!isEmpty(dataHolders) && !isEmpty(periods)) {
            if (userSubX2Unit) {
                resolvedOrgUnits = [
                    ...resolvedOrgUnits,
                    {id: "USER_ORGUNIT_GRANDCHILDREN"}
                ];
            }
            if (userSubUnit) {
                resolvedOrgUnits = [
                    ...resolvedOrgUnits,
                    {id: "USER_ORGUNIT_CHILDREN"}
                ];
            }
            if (userOrgUnit) {
                resolvedOrgUnits = [...resolvedOrgUnits, ...organisationUnits];
            }

            if (!isEmpty(levels)) {
                resolvedOrgUnits = [
                    ...resolvedOrgUnits,
                    ...(levels?.map((level) => ({id: `LEVEL-${find(orgUnitLevels, {id: level})?.level}`})) ?? []),
                ];
            }

            if (!isEmpty(groups)) {
                resolvedOrgUnits = [
                    ...resolvedOrgUnits,
                    ...(groups?.map((group) => ({id: `OU_GROUP-${group}`})) ?? []),
                ];
            }
        }

        return {orgUnits: uniqBy(resolvedOrgUnits, "id")};
    },
});

export {OrgUnitState, orgUnitOptionOnCell, orgUnitSelectorOptionOnCell};
