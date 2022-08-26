// const query={
//
//     functions:{
//         resource: 'dataStore/functions',
//         id: ({id})=>id,
//     }
// }
import { dataSourceTypes } from "../Models";
import { getDataSourceType } from "./FormulaTopBar";

const query = {
    identifiableObjects: {
        resource: "identifiableObjects",
        id: ({ id }:any) => id,
        params: {
            fields: [
                "id",
                "displayName",
                "href",
                "description",
                "code",
                "lastUpdated",
            ]
        }
    }
};

const query2 = {
    functions: {
        resource: "dataStore/functions"
    }
};

const query3 = {
    functionDetails: {
        resource: "dataStore/functions",
        id: ({ id }:any) => id
    }
};

//
export async function getFunctionDetails(engine:any, arr:any) {
    const allPromises = arr?.map((id:any) => {
        return new Promise((resolve, reject) => {
            resolve(getDetailsFunctionFromApi(engine, id));
        });
    });
    return await Promise.all(allPromises).then((value) => {
        return value.map((val, index) => {
            return val;
        });
    });
}

async function getDetailsFunctionFromApi(engine:any, id:any) {
    const data = await engine.query(query3, { variables: { id } });
    return data?.functionDetails;
}

async function getDetails(engine:any, id:any) {
    const data = await engine.query(query, { variables: { id } });
    return data?.identifiableObjects;
}

export async function getAllFunctions(engine:any) {
    const data = await engine.query(query2);
    return data?.functions;
}

export async function getIdDetails(engine:any, arr:any) {
    const allPromises = arr?.map((id:any) => {
        return new Promise((resolve, reject) => {
            resolve(getDetails(engine, id));
        });
    });
    return await Promise.all(allPromises).then((value) => {
        return value.map((val, index) => {
            return val;
        });
    });
}

function findUid(str:any) {
    //find something that starts as an UId
    const re = /[a-zA-Z]/g;
    const pos = str?.search(re);
    return pos;
}
function isValidUId(testStr:any) {
    const res = testStr.search("^[A-Za-z0-9]+$"); //using search method is faster
    return res >= 0; //if it finds anything that is not listed in the regex it returns -1
}

export function getAllId(json:any) {
    const allId = [];
    let str = json;
    let pos = findUid(str?.toString());

    while (pos >= 0) {
        str = str.substring(pos);
        const testStr = str.substring(0, 11);

        if (isValidUId(testStr)) {
            allId.push(testStr);
            str = str.substring(11);
        }
        else {
            const failInd = str.search(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/); //helps to reduce string length much faster

            str = str.substring(failInd);
        }
        pos = findUid(str);
    }
    return allId;
}

export function displayType(href:any) {
    switch (getDataSourceType(href)) {
        case dataSourceTypes.DATA_ELEMENT:
            return "Data Element";
            break;

        case dataSourceTypes.INDICATOR:
            return "Indicator";
            break;

        case dataSourceTypes.PROGRAM_INDICATOR:
            return "Program Indicator";
            break;

        case dataSourceTypes.DATA_ELEMENT_GROUP:
            return "Data Element Group";
            break;

        case dataSourceTypes.INDICATOR_GROUP:
            return "Indicator Group";
            break;

        case dataSourceTypes.FUNCTION:
            return "Function";
            break;

        case dataSourceTypes.DATASET:
            return "Dataset";
            break;

        default:
            return "Other";
    }
}

