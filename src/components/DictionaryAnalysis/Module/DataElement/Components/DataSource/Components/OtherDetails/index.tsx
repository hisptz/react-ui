import { useConfig, useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { TableHead, TableBody, DataTable, DataTableRow, DataTableCell, DataTableColumnHeader, } from "@dhis2/ui";
import React from "react";
import Error from "../../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../../Shared/Componets/Loaders/Loader";
import { dataTypes } from "../../../../../../Utils/Models";

const query = {
    orgUnitLevels: {
        resource: "organisationUnitLevels",
        params: ({ levels }:any) => ({
            fields: ["id", "displayName"],
            filter: levels?.map((level:any) => `level:eq:${level}`) ?? [],
            rootJunction: "OR"
        })
    }
};

export default function OtherDetailTable(props:any) {
    const { baseUrl } = useConfig();

    const detail = props?.other;

    const levels = detail?.aggregationLevels;

    const { loading, error, data, refetch }:any = useDataQuery(query, {
        variables: { levels }
    });

    return (<DataTable>
      <TableHead>
        <DataTableRow>
          <DataTableColumnHeader></DataTableColumnHeader>
          <DataTableColumnHeader>{i18n.t("Color")}</DataTableColumnHeader>
          <DataTableColumnHeader>{i18n.t(" Icon")}</DataTableColumnHeader>
          <DataTableColumnHeader>{i18n.t("Option set")}</DataTableColumnHeader>
          <DataTableColumnHeader>
            {i18n.t("Option set for Comments")}
          </DataTableColumnHeader>
          <DataTableColumnHeader>{i18n.t("Legends")}</DataTableColumnHeader>
          <DataTableColumnHeader>
            {i18n.t("Aggregation Levels")}
          </DataTableColumnHeader>
        </DataTableRow>
      </TableHead>
      <TableBody>
        <DataTableRow>
          <DataTableCell bordered tag="th">
            {i18n.t("Details")}
          </DataTableCell>
          <td style={{
            background: detail?.style?.color,
            width: "inherit",
            height: 50
        }}>
            {typeof detail?.style?.color === dataTypes.UNDEFINED
            ? i18n.t("no color")
            : ""}
          </td>
          <DataTableCell bordered>
            {typeof detail?.style?.icon === dataTypes.UNDEFINED ? (i18n.t("no icon")) : (<img src={`${baseUrl}/api/icons/${detail?.style?.icon}/icon.svg`} alt={"icon"}/>)}
          </DataTableCell>
          <DataTableCell bordered>
            {JSON.stringify(detail?.optionSetValue)}
          </DataTableCell>
          <DataTableCell bordered>
            {detail?.commentOptionSet?.displayName ?? "no comments"}
          </DataTableCell>
          <DataTableCell bordered>
            {detail?.legendSets?.length === 0 ? (i18n.t("No legends assigned")) : (<ol>
                {detail?.legendSets?.map((legend:any) => {
                return <li key={legend.id}>{legend?.displayName}</li>;
            })}
              </ol>)}
          </DataTableCell>
          <DataTableCell bordered>
            {loading ? (<Loader text={""}/>) : error ? (<Error error={error}/>) : data?.orgUnitLevels?.organisationUnitLevels?.length === 0 ? (i18n.t("No organization unit level assigned")) : (<ol>
                {data?.orgUnitLevels?.organisationUnitLevels?.map((lev:any) => {
                return <li key={lev?.id}>{lev?.displayName}</li>;
            })}
              </ol>)}
          </DataTableCell>
        </DataTableRow>
      </TableBody>
    </DataTable>);
}

