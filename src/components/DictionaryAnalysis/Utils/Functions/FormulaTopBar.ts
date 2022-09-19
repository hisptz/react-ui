import _ from "lodash";
import { dataSourceTypes } from "../Models";
import { getValueDataSourcePromise, isPureDataElement, } from "./FormulaFunctions";

export default function IdentifiableObjectDataSource(engine:any, arrId:any) {
    //returns array of promises
    return arrId?.map((id:any) => {
        return getValueDataSourcePromise(engine, id);
    });
}

export function getDataSourceType(formula:any) {
    if (formula?.search("dataElements") >= 0) {
        return dataSourceTypes.DATA_ELEMENT;
    }
    if (formula?.search("indicators") >= 0) {
        return dataSourceTypes.INDICATOR;
    }
    if (formula?.search("programIndicators") >= 0) {
        return dataSourceTypes.PROGRAM_INDICATOR;
    }
    if (formula?.search("dataElementGroups") >= 0) {
        return dataSourceTypes.DATA_ELEMENT_GROUP;
    }
    if (formula?.search("indicatorGroups") >= 0) {
        return dataSourceTypes.INDICATOR_GROUP;
    }
    if (formula?.search("dataStore/function") >= 0) {
        return dataSourceTypes.FUNCTION;
    }
    if (formula?.search("dataSets") >= 0) {
        return dataSourceTypes.DATASET;
    }
}

export function displayNameSelector(id:any, obj:any) {
    if (isPureDataElement(id)) {
        return obj.displayName;
    }
    else {
        const ruleId = id.split(".")[1];
        const ruleObjectSelected = _.filter(obj?.rules, (e) => {
            return e?.id === ruleId;
        }); //will return matched object with one element

        return ruleObjectSelected[0]?.name;
    }
}

export function displayNameLength(name:any) {
    if (name?.length > 18) {
        return name?.substr(0, 16) + "...";
    }
    else {
        return name;
    }
}

export function idOrRuleSelector(id:any, obj:any) {
    if (isPureDataElement(id)) {
        return obj.id;
    }
    else {
        const ruleId = id.split(".")[1];
        const ruleObjectSelected = _.filter(obj?.rules, (e) => {
            return e?.id === ruleId;
        }); //will return matched object with one element

        return ruleObjectSelected[0];
    }
}

export function typeOrFunctionSelector(id:any, obj:any) {
    if (isPureDataElement(id)) {
        return getDataSourceType(obj.href);
    }
    else {
        return obj;
    }
}

export function displayBool(val:any) {
    if (val) {
        return "Yes";
    }
    else {
        return "No";
    }
}

