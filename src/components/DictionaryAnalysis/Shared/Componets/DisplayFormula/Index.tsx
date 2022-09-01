import { useDataEngine } from "@dhis2/app-runtime";
import DictionaryContext from "../../../../../components/DictionaryAnalysis/Store/DictionaryContext";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
// import { useSetRecoilState } from "recoil";
//import { dataElementsStateDictionary, programIndicatorStateDictionary, } from "../../../Store";
import { getDetailedValueFromApi, getFinalWordFormula, getFormulaSources, getWordData, } from "../../../Utils/Functions/FormulaFunctions";
import { useGetData } from "../../../Utils/Hooks";
import { dataTypes } from "../../../Utils/Models";
import Error from "../Error/ErrorAPIResult";
import Loader from "../Loaders/Loader";

export default function DisplayFormula(props:any) {
    //props
    const formula = props.formula;
    const loc = props.location; //either its in numerator or denominator
    const storeResult = props.storeResult;
    
   const {values,setValues}=useContext(DictionaryContext);

    //hooks
   // const updateDataElementHandler = useSetRecoilState(dataElementsStateDictionary);
    const engine = useDataEngine();
    const { loading, error, data }:any = useGetData(formula, engine, loc);

    useEffect(() => {
        if (storeResult && typeof data?.dataElements != dataTypes.UNDEFINED) {
            // updateDataElementHandler((prev:any) => {
            //     return prev?.concat(data?.dataElements);
            // });

            setValues({...values,...{dataElements:values?.dataElements?.concat(data?.dataElements)}})
        }
    }, [data]);

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }
    return (<div>
      {getFinalWordFormula(formula, data?.dataElements, data?.programIndicators, data?.dataSetReportingRates, data?.attributes, data?.constants,null,null)}
    </div>);
}

DisplayFormula.PropTypes = {
    formula: PropTypes.string.isRequired,
    location: PropTypes.string,
    storeResult: PropTypes.bool
};

