import i18n from "@dhis2/d2-i18n";
import { DataTable, DataTableCell, DataTableColumnHeader, DataTableRow, TableBody, TableHead, } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import DisplayFormula from "../../../../../Shared/Componets/DisplayFormula/Index";

export default function ExpressionDetailTable({ expression, filter }:any) {
    return (<DataTable>
      <TableHead>
        <DataTableRow>
          <DataTableColumnHeader></DataTableColumnHeader>
          <DataTableColumnHeader>{i18n.t("Expression")}</DataTableColumnHeader>
          <DataTableColumnHeader>{i18n.t("Filter")}</DataTableColumnHeader>
        </DataTableRow>
      </TableHead>
      <TableBody>
        <DataTableRow>
          <DataTableCell bordered tag="th">
            {i18n.t("Details")}
          </DataTableCell>
          <DataTableCell bordered>
            <DisplayFormula formula={expression}/>
          </DataTableCell>
          <DataTableCell bordered>
            <DisplayFormula formula={filter}/>
          </DataTableCell>
        </DataTableRow>
      </TableBody>
    </DataTable>);
}

ExpressionDetailTable.propTypes = {
    expression: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired
};

