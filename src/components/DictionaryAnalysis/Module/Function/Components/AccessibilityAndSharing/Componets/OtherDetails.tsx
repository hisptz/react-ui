import i18n from "@dhis2/d2-i18n";
import { TableHead, TableBody, DataTable, DataTableRow, DataTableCell, DataTableColumnHeader, CircularLoader, } from "@dhis2/ui";
import React from "react";
import { displayAccessPermission } from "../../../../../Utils/Functions/DataElementDictionaryFunctions";

export default function OtherDetails({ result }:any) {
    return (<div>
      <p>
        {i18n.t("Function will be visible for users with the following access:")}
      </p>
      <DataTable>
        <TableHead>
          <DataTableRow>
            <DataTableColumnHeader></DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Details")}</DataTableColumnHeader>
          </DataTableRow>
        </TableHead>
        <TableBody>
          <DataTableRow>
            <DataTableCell bordered tag="th">
              {i18n.t("User Access")}
            </DataTableCell>
            <DataTableCell bordered>
              {i18n.t(result?.userAccesses?.length === 0
            ? "No access granted"
            : "" ?? "")}
              <ul>
                {result?.userAccesses?.map((dt:any) => {
            return (<li key={dt.id}>
                      {dt?.displayName} {i18n.t("can")}{" "}
                      <i>{displayAccessPermission(dt.access)} </i>{" "}
                    </li>);
        })}
              </ul>
            </DataTableCell>
          </DataTableRow>
          <DataTableRow>
            <DataTableCell bordered tag="th">
              {i18n.t("User Group Access")}
            </DataTableCell>
            <DataTableCell bordered>
              {i18n.t(result?.userGroupAccesses?.length === 0
            ? "No access granted"
            : "" ?? "")}
              <ul>
                {result?.userGroupAccesses?.map((dt:any) => {
            return (<li key={dt.id}>
                      {dt?.displayName} {i18n.t("can")}{" "}
                      <i>{displayAccessPermission(dt.access)}</i>{" "}
                    </li>);
        })}
              </ul>
            </DataTableCell>
          </DataTableRow>
        </TableBody>
      </DataTable>
    </div>);
}

