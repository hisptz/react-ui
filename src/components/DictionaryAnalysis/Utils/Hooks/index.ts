import React, { useEffect, useState } from "react";
import { getDataSetsArray, getNumDenMatch, } from "../Functions/DataElementGroupSetFunctions";
import { getFormulaSources, getWordDataForAll, } from "../Functions/FormulaFunctions";
import { dataTypes, dataTypesInitials } from "../Models";

export function useGetData(formula:any, engine:any, loc:any) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        let arrDtEle = getFormulaSources(formula, dataTypesInitials.DATA_ELEMENT);
        let arrProgInd = getFormulaSources(formula, dataTypesInitials.PROGRAM_INDICATOR);
        let arrDtSetRep = getFormulaSources(formula, dataTypesInitials.DATASET_REPORTING_RATES);
        let arrAttr = getFormulaSources(formula, dataTypesInitials.ATTRIBUTES);
        let arrConst = getFormulaSources(formula, dataTypesInitials.CONSTANTS);

        async function fetch() {
            arrDtEle = await getWordDataForAll(engine, arrDtEle, loc) as any;
            arrProgInd = await getWordDataForAll(engine, arrProgInd, loc) as any;
            arrDtSetRep = await getWordDataForAll(engine, arrDtSetRep, loc) as any;
            arrAttr = await getWordDataForAll(engine, arrAttr, loc) as any;
            arrConst = await getWordDataForAll(engine, arrConst, loc) as any;
        }
        fetch()
            .then(() => {
            const result = {
                dataElements: arrDtEle,
                programIndicators: arrProgInd,
                dataSetReportingRates: arrDtSetRep,
                attributes: arrAttr,
                constants: arrConst
            } as any;

            setData(result);
            // setData((prevState => {return prevState.concat(result) }))
            setLoading(false);
        })
            .catch((error) => {
            setLoading(false);
            setError(error);
        });
    }, []);

    return {
        loading,
        error,
        data
    };
}

export function useGetDataSet(array:any, engine:any) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    //{"dataSetName:[dataElements in {id:"",displname:""}]}
    useEffect(() => {
        let tempArr:any;
        async function fetch() {
            tempArr = await getDataSetsArray(engine, array);
        }
        fetch()
            .then(() => {
            const result = { dataSets: tempArr } as any;

            setData(result);
            setLoading(false);
        })
            .catch((error) => {
            setLoading(false);
            setError(error);
        });
    }, []);

    return {
        loading,
        error,
        data
    };
}

export function useGetNumDenMatch(array:any, engine:any) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        let tempArr:any;
        async function fetch() {
            tempArr = await getNumDenMatch(engine, array);
        }
        fetch()
            .then(() => {
            const result = { matches: tempArr } as any;
            setData(result);
            setLoading(false);
        })
            .catch((error) => {
            setLoading(false);
            setError(error);
        });
    }, [array?.length]);

    return {
        loading,
        error,
        data
    };
}

