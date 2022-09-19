import { DataTable, DataTableColumnHeader, DataTableRow, TableBody, TableHead, } from "@dhis2/ui";
import React from "react";
import Row from "./Components/Row";

export default function BoundaryTable(props:any) {
    const res = props.rows;

    return (<DataTable>
      <TableHead>
        <DataTableRow>
          <DataTableColumnHeader>Boundary target</DataTableColumnHeader>
          <DataTableColumnHeader>
            Analytics period boundary type
          </DataTableColumnHeader>
          <DataTableColumnHeader>Offset period by amount</DataTableColumnHeader>
          <DataTableColumnHeader>Period type</DataTableColumnHeader>
        </DataTableRow>
      </TableHead>
      <TableBody>
        {res?.map((row:any) => {
            return (<Row key={row?.id} tableDetail={row?.analyticsPeriodBoundaries} target={row?.boundaryTarget} analyticsPeriodBoundaryType={row?.analyticsPeriodBoundaryType} offsetPeriod={row?.offsetPeriods} periodType={row?.offsetPeriodType}/>);
        })}
      </TableBody>
    </DataTable>);
}

