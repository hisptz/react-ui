import { useDataEngine, useDataQuery } from "@dhis2/app-runtime";
import { DataTableRow, DataTableCell, CircularLoader } from "@dhis2/ui";
import { useEffect, useState } from "react";
import { getFinalWordFormula, getFormulaSources, getSummaryValueFromApi, lowerCaseAllWordsExceptFirstLetters, } from "../../../../Utils/Functions/FormulaFunctions";
import { dataTypes } from "../../../../Utils/Models";

const query = {
    programIndicator: {
        resource: "programIndicators",
        id: ({ id }:any) => id,
        params: {
            fields: [
                "id",
                "displayName",
                "aggregationType",
                "analyticsType",
                "analyticsPeriodBoundaries[id,analyticsPeriodBoundaryType,boundaryTarget]",
                "filter",
                "programIndicatorGroups[id,displayName]",
                "legendSets[id,displayName]",
            ]
        }
    }
};

export default function Row(props:any) {
    //props
    const programIndicator = props.programInd;
    const id = programIndicator.id;

    const { loading, error, data }:any = useDataQuery(query, { variables: { id } });

    //hooks
    const engine = useDataEngine();
    const [dataElementsArray, setDataElementArray]:any = useState([]);
    const [attributesArray, setAttributesArray]:any = useState([]);
    const [constantsArray, setConstantsArray]:any = useState([]);

    useEffect(() => {
        if (data?.programIndicator?.filter) {
            const tempArr = getFormulaSources(data?.programIndicator?.filter, "#{");
            if (tempArr.length) {
                getWordData(tempArr, 0), () => { };
            }
        }
    }, [data]);
    useEffect(() => {
        const tempArr = getFormulaSources(data?.programIndicator?.filter, "A{");

        if (tempArr.length) {
            getWordData(tempArr, 3), () => { };
        }
    }, [data]);
    useEffect(() => {
        const tempArr = getFormulaSources(data?.programIndicator?.filter, "C{");

        if (tempArr.length) {
            getWordData(tempArr, 4), () => { };
        }
    }, [data]);

    //variables
    const wordDtEl:any[] = [];
    const attributes:any[]  = [];
    const constants:any[]  = [];
    const final_filter_result = getFinalWordFormula(data?.programIndicator?.filter, dataElementsArray, [], [], attributesArray, constantsArray);

    // if(loading){
    //     return <CircularLoader />
    // }
    // if(error){
    //     return <i>Something went wrong</i>
    // }

    async function getWordData(arr:any, type:any) {
        //arr for array of id of datas to get their values, type indicates the data type of data eg dataElement=0 program indicator=1, reporting rates=2
        const allPromises = [];
        let i = 0;
        for (i = 0; i < arr.length; i++) {
            //reverse the element since here, for dataElement it goes as programStage, then
            const proms = getSummaryValueFromApi(engine, arr[i]);
            allPromises.push(proms);
        }
        i = 0;
        await Promise.all(allPromises).then((value) => {
            if (type === dataTypes.DATA_ELEMENT) {
                value.map((val:any) => {
                    //We always return array just for uniformity
                    if (val.length > 1) {
                        //array of two elements first element is dataElement second element of array is category option combo
                        wordDtEl.push({ id: arr[i], val: val[0] + " " + val[1] });
                    }
                    else {
                        //this is array of one element for data element that are just pure no category options
                        wordDtEl.push({ id: arr[i], val: val[0] });
                    }
                    ++i;
                });
            }
            if (type === dataTypes.ATTRIBUTES) {
                //for Attribute
                value.map((val:any) => {
                    //We always return array just for uniformity
                    attributes.push({ id: arr[i], val: val[0] });
                    ++i;
                });
            }
            if (type === dataTypes.CONSTANTS) {
                value.map((val:any) => {
                    //We always return array just for uniformity
                    constants.push({ id: arr[i], val: val[0] });
                    ++i;
                });
            }

            if (wordDtEl.length === arr.length) {
                //array is full so we reload to update UI
                setDataElementArray(wordDtEl);
            }
            if (attributes.length === arr.length) {
                //array is full so we reload to update UI
                setAttributesArray(attributes);
            }
            if (constants.length === arr.length) {
                //array is full so we reload to update UI
                setConstantsArray(constants);
            }
        });
    }

    function OtherCells(prog:any) {
        return (<>
        <DataTableCell bordered>{final_filter_result}</DataTableCell>
        <DataTableCell bordered>{prog?.aggregationType}</DataTableCell>
        <DataTableCell bordered>{prog?.analyticsType}</DataTableCell>
        <DataTableCell bordered>
          <ol>
            {prog?.analyticsPeriodBoundaries.map((boundary:any) => {
                return (<li key={boundary.id}>
                  {lowerCaseAllWordsExceptFirstLetters(boundary?.analyticsPeriodBoundaryType?.replace(/_/g, " "))}
                </li>);
            })}
          </ol>
        </DataTableCell>
        <DataTableCell bordered>
          <ol>
            {prog?.legendSets.map((legend:any) => {
                return <li key={legend.id}>{legend?.displayName}</li>;
            })}
          </ol>
        </DataTableCell>
        <DataTableCell bordered>
          <ol>
            {prog?.programIndicatorGroups.map((group:any) => {
                return <li key={group.id}>{group?.displayName}</li>;
            })}
          </ol>
        </DataTableCell>
      </>);
    }

    return (<DataTableRow>
      <DataTableCell bordered>{programIndicator?.val}</DataTableCell>
      <DataTableCell bordered>{programIndicator?.location}</DataTableCell>
      {OtherCells(data?.programIndicator)}
    </DataTableRow>);
}

