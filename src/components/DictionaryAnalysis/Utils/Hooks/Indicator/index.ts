import { useEffect, useState } from "react";
import { getDetailedValueFromApi, getFormulaSources, getWordDataForAll, } from "../../Functions/FormulaFunctions";
import { dataTypes, dataTypesInitials } from "../../Models";

export function useGetFormulaDataDetailed(formula:any, engine:any, location:any) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        let tempArr = getFormulaSources(formula, dataTypesInitials.DATA_ELEMENT);
        let tempArr2 = getFormulaSources(formula, dataTypesInitials.PROGRAM_INDICATOR);
        let tempArr3 = getFormulaSources(formula, dataTypesInitials.DATASET_REPORTING_RATES);
        let tempArr4 = getFormulaSources(formula, dataTypesInitials.ATTRIBUTES);
        let tempArr5 = getFormulaSources(formula, dataTypesInitials.CONSTANTS);
        let tempArr6 = getFormulaSources(formula, dataTypesInitials.ORG_UNIT_COUNT);
        let tempArr7 = getFormulaSources(formula, dataTypesInitials.PROGRAM_DATA_ELEMENT);

        async function fetch() {
            tempArr = await getWordData(engine, tempArr, dataTypes.DATA_ELEMENT, location);
            tempArr2 = await getWordData(engine, tempArr2, dataTypes.PROGRAM_INDICATOR, location);
            tempArr3 = await getWordData(engine, tempArr3, dataTypes.DATASET_REPORTING_RATES, location);
            tempArr4 = await getWordData(engine, tempArr4, dataTypes.ATTRIBUTES, location);
            tempArr5 = await getWordData(engine, tempArr5, dataTypes.CONSTANTS, location);
            tempArr6 = await getWordData(engine, tempArr6, dataTypes.ORG_UNIT_COUNT, location);
            tempArr7 = await getWordData(engine, tempArr7, dataTypes.PROGRAM_DATA_ELEMENT, location);
        }
        fetch()
            .then(() => {
            const result = {
                dataElements: tempArr,
                programIndicators: tempArr2,
                dataSetReportingRates: tempArr3,
                attributes: tempArr4,
                constants: tempArr5,
                orgUnitCount: tempArr6,
                programDtElement: tempArr7
            } as any;
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

async function getWordData(engine:any, arr:any, type:any, location:any) {
    //arr for array of id of datas to get their values, type indicates the data type of data eg dataElement=0 program indicator=1, reporting rates=2

    const allPromises = arr?.map((e:any) => {
        return getDetailedValueFromApi(engine, e, type);
    });

    return await Promise.all(allPromises).then((value) => {
        return value.map((val, i) => {
            if (type === dataTypes.DATA_ELEMENT) {
                if (val.length === 2) {
                    //array of two elements first element is dataElement second element of array is category option combo
                    return {
                        id: arr[i],
                        val: val[0].displayName + " " + val[1],
                        location: location,
                        sources: val[0].dataSetElements
                    };
                }
                if (val.length === 1) {
                    //this is array of one element for data element that are just pure no category options
                    return {
                        id: arr[i],
                        val: val[0].displayName,
                        location: location,
                        sources: val[0].dataSetElements
                    };
                }
            }
            if (type === dataTypes.ATTRIBUTES ||
                type === dataTypes.PROGRAM_DATA_ELEMENT) {
                return { id: arr[i], val: val[1], location: location, sources: val[0] };
            }
            if (type === dataTypes.PROGRAM_INDICATOR) {
                return {
                    id: arr[i],
                    val: val[0].displayName,
                    location: location,
                    sources: val[0].program
                };
            }
            else {
                //for orgUnit count, constants and reporting rates
                return { id: arr[i], val: val[0], location: location };
            }
        });
        // if(type===dataTypes.DATA_ELEMENT){
        //     value.map((val,i)=>{ //We always return array just for uniformity
        //         if(val.length===2){ //array of two elements first element is dataElement second element of array is category option combo
        //           return  {id:arr[i],val:val[0].displayName+" "+val[1],location:location,sources:val[0].dataSetElements}
        //         }if(val.length===1){   //this is array of one element for data element that are just pure no category options
        //
        //             return  {id:arr[i],val:val[0].displayName,"location":location,sources:val[0].dataSetElements}
        //         }
        //
        //     })
        // }
        // if(type===dataTypes.ATTRIBUTES || type===dataTypes.PROGRAM_DATA_ELEMENT){
        //     value.map((val,i)=> {
        //         return {id: arr[i], "val": val[1].displayName, location: location, sources: val[0].displayName}
        //     })
        // }
        //
        // if(type===dataTypes.PROGRAM_INDICATOR){
        //     value.map((val,i)=>{ //We always return array just for uniformity
        //       return  {"id":arr[i],"val":val[0].displayName,"location":location,sources:val[0].program}
        //
        //     })
        // }
        // else { //for orgUnit count, constants and reporting rates
        //     value.map((val,i)=>{ //We always return array just for uniformity
        //         return {"id":arr[i],"val":val[0],"location":location}
        //
        //     })
        // }

        // if(wordDtEl.length===arr.length){ //array is full so we reload to update UI
        //     setDataElementArray(wordDtEl)
        //     updateDataElementHandler( (prev)=>{
        //         return  prev.concat(wordDtEl)
        //     } )
        // }
        // if(programInd.length===arr.length){
        //     setProgramIndicatorArray(programInd)
        //     updateProgramIndicatorHandler((prev)=>{
        //         return  prev.concat(programInd)
        //     }  )
        // }
        // if(dataSetReportingRates.length===arr.length){
        //     setDataSetReportingRatesArray(dataSetReportingRates)
        //     updateDataSetReportingRatesHandler((prev)=>{
        //         return prev.concat(dataSetReportingRates)
        //     })
        // }
    });
}

