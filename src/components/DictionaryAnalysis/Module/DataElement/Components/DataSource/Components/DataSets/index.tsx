import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "@dhis2/d2-i18n";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Error from "../../../../../../Shared/Componets/Error/ErrorAPIResult";
import Loader from "../../../../../../Shared/Componets/Loaders/Loader";

const query = {
    sources: {
        resource: "dataElements",
        //   id: "Uvn6LCg7dVU",
        id: ({ id }:any) => id,
        params: {
            fields: [
                "id",
                "displayName",
                "dataSetElements[dataSet[id,displayName,periodType,timelyDays]]",
            ]
        }
    }
};

export default function DataSets({ id }:any) {
    const { loading, error, data, refetch } = useDataQuery(query, {
        variables: { id }
    });

    useEffect(() => {
        refetch({ id });
    }, [id]);

    if (loading) {
        return <Loader text={""}/>;
    }
    if (error) {
        return <Error error={error}/>;
    }

    return (<div>
      <h3>{i18n.t("Data sources")} </h3>
      <p>{i18n.t("Data element is captured from following sources")}</p>

      <h5>{i18n.t("Datasets")} </h5>
      <ul>
        {(data?.sources as any)?.dataSetElements?.map((dt:any) => {
            return (<li key={dt?.dataSet?.id}>
              <b> {dt?.dataSet?.displayName}</b>{" "}
              {i18n.t("submitting {{variables1}} after every {{variables2}} days ", {
                    variables1: dt?.dataSet?.periodType,
                    variables2: dt?.dataSet?.timelyDays
                })}{" "}
            </li>);
        })}
      </ul>
    </div>);
}

DataSets.propTypes = {
    id: PropTypes.string.isRequired
};

