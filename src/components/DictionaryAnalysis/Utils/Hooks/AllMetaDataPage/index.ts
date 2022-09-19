import { useState, useEffect } from "react";

const query = {
  identify: {
    resource: "identifiableObjects",
    id: ({ id }:any) => id,
  },
};

export function useIdentifyObject(engine:any, id:any) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    async function fetch() {
      const data = await engine.query(query, { variables: { id } });
      return data?.identify;
    }
    fetch()
      .then((val) => {
        setData(val);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return { loading, error, data };
}
