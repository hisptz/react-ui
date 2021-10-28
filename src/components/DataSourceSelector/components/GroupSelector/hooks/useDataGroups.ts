import { useDataEngine } from "@dhis2/app-runtime";
import { useEffect, useState } from "react";
import DataSource from "components/DataSourceSelector/models/dataSource";

export default function useDataGroups(initialSelectedDataType: DataSource): { groups: Array<any>; loading: boolean; error: any } {
  const [data, setData] = useState<Array<any> | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  const engine = useDataEngine();

  useEffect(() => {
    async function fetch() {
      if (initialSelectedDataType) {
        setLoading(true);
        try {
          const response = await initialSelectedDataType.getGroups(engine);
          // @ts-ignore
          if (response) {
            setData(response);
          }
        } catch (e) {
          // @ts-ignore
          setError(e);
        }
        setLoading(false);
      }
    }

    fetch();
  }, [engine, initialSelectedDataType]);

  return { loading, groups: data ?? [], error };
}
