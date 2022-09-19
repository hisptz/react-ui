import { isEmpty } from "lodash";
import { useState, useEffect } from "react";
import { dataSourceTypes } from "../../Models";

const dataElementsSearch = {
  matches: {
    resource: "dataElements",
    params: ({ keyword }:any) => ({
      fields: ["id", "displayName", "href"],
      pageSize: 10,
      filter: [`id:ilike:${keyword}`, `displayName:ilike:${keyword}`],
      rootJunction: "OR",
    }),
  },
};

const indicatorSearch = {
  matches: {
    resource: "indicators",
    params: ({ keyword }:any) => ({
      fields: ["id", "displayName", "href"],
      pageSize: 10,
      filter: [`id:ilike:${keyword}`, `displayName:ilike:${keyword}`],
      rootJunction: "OR",
    }),
  },
};

const programIndicatorSearch = {
  matches: {
    resource: "programIndicators",
    params: ({ keyword }:any) => ({
      fields: ["id", "displayName", "href"],
      pageSize: 10,
      filter: [`id:ilike:${keyword}`, `displayName:ilike:${keyword}`],
      rootJunction: "OR",
    }),
  },
};

const dataElementGroupsSearch = {
  matches: {
    resource: "dataElementGroups",
    params: ({ keyword }:any) => ({
      fields: ["id", "displayName", "href"],
      pageSize: 10,
      filter: [`id:ilike:${keyword}`, `displayName:ilike:${keyword}`],
      rootJunction: "OR",
    }),
  },
};

const indicatorGroupsSearch = {
  matches: {
    resource: "indicatorGroups",
    params: ({ keyword }:any) => ({
      fields: ["id", "displayName", "href"],
      pageSize: 10,
      filter: [`id:ilike:${keyword}`, `displayName:ilike:${keyword}`],
      rootJunction: "OR",
    }),
  },
};

export function useGetSearchResult(keyword:any, type:any, engine:any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  const result = [];
  useEffect(() => {
    async function fetch() {
      if (keyword !== "") {
        return await getResult(keyword, engine, type);
      }
    }
    fetch()
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [keyword, type]);
  return {
    loading,
    error,
    data,
  };
}

async function getResult(keyword:any, engine:any, type:any) {
  if (type === dataSourceTypes.DATA_ELEMENT) {
    const data = await engine.query(dataElementsSearch, {
      variables: { keyword },
    });
    return data.matches.dataElements;
  }
  if (type === dataSourceTypes.INDICATOR) {
    const data = await engine.query(indicatorSearch, {
      variables: { keyword },
    });
    return data.matches.indicators;
  }
  if (type === dataSourceTypes.PROGRAM_INDICATOR) {
    const data = await engine.query(programIndicatorSearch, {
      variables: { keyword },
    });
    return data.matches.programIndicators;
  }
  if (type === dataSourceTypes.DATA_ELEMENT_GROUP) {
    const data = await engine.query(dataElementGroupsSearch, {
      variables: { keyword },
    });
    return data.matches.dataElementGroups;
  }
  if (type === dataSourceTypes.INDICATOR_GROUP) {
    const data = await engine.query(indicatorGroupsSearch, {
      variables: { keyword },
    });
    return data.matches.indicatorGroups;
  }
  // if(type===dataSourceTypes.FUNCTION){
  //     const data = await engine.query(query6, {variables: {keyword}})
  // }
}
