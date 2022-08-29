import {Period} from "@iapps/period-utilities";
import {
    compact,
    differenceBy,
    filter,
    isArray,
    isEmpty,
    uniqBy,
} from "lodash";
import {atom, selector} from "recoil";
import {ScorecardViewState} from "@hisptz/scorecard-state";

const PeriodState = atom({
    key: "cell-analysis-period-state",
    default: selector({
        key: "cell-analysis-period-selector",
        get: ({get}:any) => {
            return get(ScorecardViewState("periodSelection"));
        },
    }),
});

const cellPeriodOptionAtom = atom({
    key: "cell-period-option-state",
    default: [],
})

const cellPeriodOptionSelector = selector({
    key: "cell-period-option-selector",
    get: ({get}:any) => {
        return get(cellPeriodOptionAtom);
    },
    set: ({set}:any, value:any) => {
        set(cellPeriodOptionAtom, value);
    },
    reset: ({reset}:any) => {
        reset(cellPeriodOptionAtom);
    }
})

const ResolvedPeriodState = selector({
    key: "cell-analysis-period-resolver",
    get: ({get}:any) => {
        const {periods} = get(PeriodState) ?? {};
        if (!isEmpty(periods)) {
            const relativePeriods = filter(get(cellPeriodOptionAtom).length > 0 ? get(cellPeriodOptionAtom) : periods, ({id}) => {
                const period = new Period().setPreferences({allowFuturePeriods: true}).getById(id);
                return period?.type?.match(RegExp("Relative"));
            });
            let allPeriods = [...differenceBy(periods, relativePeriods, "id")];
            get(cellPeriodOptionAtom).length > 0 ? allPeriods = [...differenceBy(relativePeriods, "id")] : allPeriods = [...differenceBy(periods, relativePeriods, "id")];
            for (const period of relativePeriods) {
                const periodInstance = new Period().setPreferences({allowFuturePeriods: true}).getById(period?.id);
                const actualPeriods = isArray(periodInstance?.iso)
                    ? periodInstance?.iso
                    : [periodInstance?.iso];
                allPeriods = allPeriods.concat(actualPeriods);
            }
            return uniqBy(compact(allPeriods), "id");
        }
        return [];
    },
});

export {PeriodState, ResolvedPeriodState, cellPeriodOptionSelector, cellPeriodOptionAtom};
