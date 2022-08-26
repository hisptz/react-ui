import { useDataQuery } from "@dhis2/app-runtime";
import { DataTableRow, DataTableCell } from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";
import Error from "../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../Shared/Componets/Loaders/Loader";
import { isPureDataElement } from "../../../../../Utils/Functions/FormulaFunctions";

const query = {
    program: {
        resource: "identifiableObjects",
        id: ({ id1 }:any) => id1,
        params: {
            fields: ["displayName"]
        }
    },
    dataElementInIndicator: {
        resource: "dataElements",
        id: ({ id2 }:any) => id2,
        params: {
            fields: [
                "id",
                "displayName",
                "valueType",
                "zeroIsSignificant",
                "dataElementGroups[id,displayName]",
                "categoryCombo[categories[id,displayName]]",
            ]
        }
    }
};

export default function RowTracker({ id, location }:any) {
    const id1 = id?.split(".")[0];
    const id2 = id?.split(".")[1];

    const { loading, error, data }:any = useDataQuery(query, {
        variables: { id1, id2 }
    });

    if (loading) {
        return <Loader />;
    }
    if (error) {
        return <Error error={""}/>;
    }

    return (<DataTableRow>
      <DataTableCell bordered>
        {data?.dataElementInIndicator?.displayName}
      </DataTableCell>
      <DataTableCell bordered>{location}</DataTableCell>
      <DataTableCell bordered>
        {data?.dataElementInIndicator?.valueType}
      </DataTableCell>

      <DataTableCell bordered>
        {JSON.stringify(data?.dataElementInIndicator?.zeroIsSignificant)}
      </DataTableCell>
      <DataTableCell bordered>
        <ol>
          {data?.dataElementInIndicator?.categoryCombo?.categories.map((cat:any) => {
            return <li key={cat?.id}>{cat?.displayName}</li>;
        })}
        </ol>
      </DataTableCell>
      <DataTableCell bordered>{data?.program?.displayName}</DataTableCell>
      <DataTableCell bordered>
        <ol>
          {data?.dataElementInIndicator?.dataElementGroups?.map((group:any) => {
            return <li key={group?.id}>{group?.displayName}</li>;
        })}
        </ol>
      </DataTableCell>
    </DataTableRow>);
}

RowTracker.propTypes = {
    id: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
};

