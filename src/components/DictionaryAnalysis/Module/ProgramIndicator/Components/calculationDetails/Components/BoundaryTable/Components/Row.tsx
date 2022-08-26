import { TableHead, TableBody, DataTable, DataTableRow, DataTableCell, DataTableColumnHeader, } from "@dhis2/ui";
import React from "react";
import { lowerCaseAllWordsExceptFirstLetters } from "../../../../../../../Utils/Functions/FormulaFunctions";

export default function Row(props:any) {
    const target = props.target;
    const analyticsPeriodBoundaryType = props.analyticsPeriodBoundaryType;
    const offsetPeriod = props.offsetPeriod;
    const periodType = props.periodType;

    return (<DataTableRow>
      <DataTableCell bordered>
        {lowerCaseAllWordsExceptFirstLetters(target)?.replace(/_/g, " ")}
      </DataTableCell>
      <DataTableCell bordered>
        {lowerCaseAllWordsExceptFirstLetters(analyticsPeriodBoundaryType)?.replace(/_/g, " ")}
      </DataTableCell>
      <DataTableCell bordered b>
        {offsetPeriod}
      </DataTableCell>
      <DataTableCell bordered>{periodType}</DataTableCell>
    </DataTableRow>);
}

