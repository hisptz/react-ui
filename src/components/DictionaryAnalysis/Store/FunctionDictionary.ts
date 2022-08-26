import { atom } from "recoil";

export const functionDictionarySourceSelector = atom({
    key: "functionDictionarySourceSelector",
    default: 0
});

export const allFunctionsRulesInStore = atom({
    key: "allFunctionsInStore",
    default: []
});

export const showFunctionsSearchResult = atom({
    key: "showFunctionsSearchResult",
    default: true
});

export const searchedResultRules = atom({
    key: "searchedResultRules",
    default: []
});

export const oneFunctionSelected = atom({
    key: "oneFunctionSelected",
    default: false
});

export const showAllFunctions = atom({
    key: "showAllFunctions",
    default: true
});

