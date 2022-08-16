import { get } from "lodash";
import { OFFLINE_ORG_UNIT_PAGE_SIZE } from "../constants/config";

async function getPagination(engine: any, query: any, { options, queryKey }: { options: any; queryKey: string }): Promise<any> {
  const data = await engine.query(query, {
    variables: { ...options, pageSize: OFFLINE_ORG_UNIT_PAGE_SIZE, totalPages: true, skipData: true },
  });
  return get(data, [queryKey, "pager"], {}) as any;
}

export { getPagination };
