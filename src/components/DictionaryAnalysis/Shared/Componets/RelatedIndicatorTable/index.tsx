import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import { TableHead, TableBody, DataTable, DataTableRow, DataTableCell, DataTableColumnHeader, } from "@dhis2/ui";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import DisplayFormula from "../DisplayFormula/Index";
import Error from "../Error/ErrorAPIResult";
import Loader from "../Loaders/Loader";

const query = {
    relatedInd: {
        resource: "indicators",
        params: ({ id }:any) => ({
            fields: [
                "id",
                "displayName",
                "indicatorType[id,displayName]",
                "displayDescription",
                "numerator",
                "denominator",
            ],
            filter: [`numerator:like:${id}`, `denominator:like:${id}`],
            rootJunction: "OR"
        })
    }
};

export default function RelatedIndicatorTable(props:any) {
    const id = props.id;
    const resourceType = props.resourceType;

    const { loading, error, data, refetch }:any = useDataQuery(query, {
        variables: { id }
    });

    const result = data?.relatedInd?.indicators;
    useEffect(() => {
        refetch({ id });
    }, [id]);

    if (result?.length === 0) {
        return (<div>
        <p>
          {i18n.t("This {{variables1}} is not related to any indicator", {
                variables1: resourceType
            })}{" "}
        </p>
      </div>);
    }

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    return (<div>
      <p>
        {" "}
        {i18n.t("Below are set of indicators using this {{variables}} as numerator or denominator in their calculations.", { variables: resourceType })}
      </p>
      <DataTable>
        <TableHead>
          <DataTableRow>
            <DataTableColumnHeader>{i18n.t("Name")}</DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Numerator")}</DataTableColumnHeader>
            <DataTableColumnHeader>
              {i18n.t("Denominator")}
            </DataTableColumnHeader>
            <DataTableColumnHeader>{i18n.t("Type")}</DataTableColumnHeader>
            <DataTableColumnHeader>
              {i18n.t("Description")}
            </DataTableColumnHeader>
          </DataTableRow>
        </TableHead>
        <TableBody>
          {result?.map((result:any, index:any) => {
            return (<DataTableRow key={result?.id}>
                <DataTableCell bordered>{result?.displayName}</DataTableCell>
                <DataTableCell bordered>
                  <div style={{ margin: 5 }}>
                    <DisplayFormula formula={result?.numerator} location={"numerator"} storeResult={true}/>
                  </div>
                </DataTableCell>
                <DataTableCell bordered b>
                  <div style={{ margin: 5 }}>
                    <DisplayFormula formula={result?.denominator} location={"denominator"} storeResult={true}/>
                  </div>
                </DataTableCell>
                <DataTableCell bordered>
                  {result?.indicatorType?.displayName}
                </DataTableCell>
                <DataTableCell bordered>
                  <div style={{ margin: 5 }}>
                    {result?.displayDescription ??
                    i18n.t("No description given")}
                  </div>
                </DataTableCell>
              </DataTableRow>);
        })}
        </TableBody>
      </DataTable>
    </div>);
}

