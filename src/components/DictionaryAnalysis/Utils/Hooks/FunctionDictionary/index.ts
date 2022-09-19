import { useEffect, useState } from "react";
import { getAllFunctions, getFunctionDetails, getIdDetails, } from "../../Functions/FunctionDictionary";

export function useGetFunctionsDetails(engine:any, array:any) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        async function fetch() {
            return await getFunctionDetails(engine, array);
        }

        fetch()
            .then((val:any) => {
            setData(val);
            setLoading(false);
        })
            .catch((error) => {
            setLoading(false);
            setError(error);
        });
    }, []);

    return {
        loading,
        error,
        data
    };
}

export function useGetIdDetails(array:any, engine:any) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        let tmp:any;
        async function fetch() {
            tmp = await getIdDetails(engine, array);
        }
        fetch()
            .then(() => {
            const result = { idDetails: tmp } as any;
            setData(result);
            setLoading(false);
        })
            .catch((error) => {
            setLoading(false);
            setError(error);
        });
    }, [JSON.stringify(array)]);

    return {
        loading,
        error,
        data
    };
}

export function useGetAllFunctionsId(engine:any) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        async function fetch() {
            return getAllFunctions(engine);
        }
        fetch()
            .then((value) => {
            setLoading(false);
            setData(value);
        })
            .catch((error) => {
            setLoading(false);
            setError(error);
        });
    }, []);

    return {
        loading,
        error,
        data
    };
}

