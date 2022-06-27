import { useDataEngine } from "@dhis2/app-runtime";
import { useEffect, useState } from "react";
import DataSource from "../../../models/dataSource";

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
          const response: any = await initialSelectedDataType.getGroups(engine);
          if (response) {
            setData(response);
          }
        } catch (e: any) {
          setError(e);
        }
        setLoading(false);
      }
    }

    fetch();
  }, [engine, initialSelectedDataType]);

  return { loading, groups: data ?? [], error };
}
