import { useDataEngine } from "@dhis2/app-runtime";
import { isArray } from "lodash";
import { useCallback, useEffect, useState } from "react";
import DataSource from "../../../models/dataSource";
import { DataSourceResponse } from "../../../types";

export default function useDataSources(selectedDataSourceType: DataSource, selectedGroup?: { id: string }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>();
  const [data, setData] = useState<Array<any> | undefined>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const engine = useDataEngine();

  const fetchData = useCallback(
    async (currentPage: number, searchKeyword?: string): Promise<DataSourceResponse> => {
      if (searchKeyword || selectedGroup) {
        return await selectedDataSourceType.filter(engine, {
          page: currentPage,
          searchKeyword: searchKeyword ?? "",
          selectedGroup,
        });
      }
      return await selectedDataSourceType.getDataSources(engine, {
        page: currentPage,
      });
    },
    [engine, selectedDataSourceType, selectedGroup]
  );

  const search = useCallback(
    async (keyword: string) => {
      setLoading(true);
      try {
        setPage(1);
        setTotalPages(undefined);
        setData([]);
        const response = await fetchData(1, keyword);
        if (isArray(response?.data)) {
          setData([...response?.data]);
        }
        setTotalPages(response?.pager?.pageCount);
        setError(undefined);
      } catch (e) {
        setLoading(false);
        // @ts-ignore
        setError(e);
      }
      setLoading(false);
    },
    [fetchData]
  );

  const nexPage = useCallback(async () => {
    if (totalPages && page < totalPages) {
      try {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
        const response = await fetchData(page + 1);
        setData((prevData) => [...(prevData ?? []), ...(response?.data ?? [])]);
        setError(undefined);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        // @ts-ignore
        setError(e);
      }
    }
  }, [data, fetchData, page, totalPages]);

  useEffect(() => {
    async function fetch() {
      if (selectedDataSourceType) {
        setLoading(true);
        try {
          setPage(1);
          setTotalPages(undefined);
          setData([]);
          const response = await fetchData(1);
          setData(response?.data);
          setTotalPages(response?.pager?.pageCount);
          setError(undefined);
        } catch (e) {
          setLoading(false);
          // @ts-ignore
          setError(e);
        }
        setLoading(false);
      }
    }

    fetch();
  }, [selectedGroup, selectedDataSourceType, fetchData]);

  return { data, error, loading, nexPage, search };
}
