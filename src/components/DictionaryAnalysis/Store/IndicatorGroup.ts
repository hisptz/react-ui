import { atom } from "recoil";

export const indicatorGroupDataSets = atom({
    key: "indicatorGroupDataSetCount",
    default: []
});

export const indicatorGroupPrograms = atom({
    key: "indicatorGroupProgramCount",
    default: []
});

export const indicatorGroupProgramDataElements = atom({
    key: "programDataElements",
    default: []
});
export const indicatorGroupAggregateDataElements = atom({
    key: "indicatorGroupAggregateDataElements",
    default: []
});

export const indicatorGroupNumeratorDataElements = atom({
    key: "indicatorGroupNumeratorDataElements",
    default: {}
});

export const indicatorGroupDenominatorDataElements = atom({
    key: "indicatorGroupDenominatorDataElements",
    default: {}
});

