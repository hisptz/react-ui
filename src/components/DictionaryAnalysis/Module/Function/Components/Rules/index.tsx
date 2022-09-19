import i18n from "@dhis2/d2-i18n";
import { DataTable, DataTableToolbar, DataTableHead, TableHead, DataTableBody, TableBody, DataTableCell, DataTableRow, DataTableColumnHeader, } from "@dhis2/ui";
import _ from "lodash";
import React from "react";
import { displayBool } from "../../../../Utils/Functions/FormulaTopBar";

export default function Rules({ ruleObj, functionObj }:any) {
    const rules = _.filter(functionObj?.rules ?? [], (e) => {
        return e?.id !== ruleObj?.id;
    });

    return (<div>
      <h3>{i18n.t("Function Rules")} </h3>
      <p>
        {" "}
        {i18n.t("The following are available rules used for data analytics")}{" "}
      </p>

      <DataTable>
        <TableHead>
          <DataTableRow>
            <DataTableColumnHeader bordered>
              {i18n.t("Id")}
            </DataTableColumnHeader>
            <DataTableColumnHeader bordered>
              {i18n.t("Name")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>
              {i18n.t("Description")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>
              {i18n.t("Default Rule")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("JSON")}</DataTableColumnHeader>
          </DataTableRow>
        </TableHead>
        <TableBody>
          {rules?.map((e) => {
            return (<DataTableRow key={e?.id}>
                <DataTableCell bordered>{e?.id}</DataTableCell>
                <DataTableCell bordered>{e?.name}</DataTableCell>
                <DataTableCell bordered>{e?.description}</DataTableCell>
                <DataTableCell bordered>
                  {displayBool(e?.isDefault)}
                </DataTableCell>
                <DataTableCell bordered>
                  {JSON.stringify(e?.json)}
                </DataTableCell>
              </DataTableRow>);
        })}
        </TableBody>
      </DataTable>
    </div>);
}

