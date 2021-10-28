import {useDataEngine} from "@dhis2/app-runtime";
import {useEffect, useState} from "react";
import {
    apiFetchOrganisationUnitGroups,
    apiFetchOrganisationUnitLevels,
    apiFetchOrganisationUnitRoots
} from "../services";

export function useOrgUnitsRoot(): { roots?: Array<any>, loading: boolean, error: any } {
    const engine = useDataEngine();
    const [roots, setRoots] = useState();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>();

    useEffect(() => {
        async function getOrgUnits() {
            try {
                setLoading(true);
                setRoots(await apiFetchOrganisationUnitRoots(engine));
                setLoading(false);
            } catch (e) {
                setError(e);
            }
        }

        getOrgUnits();
    }, []);

    return {roots, loading, error};
}


export function useOrgUnitLevelsAndGroups(): { levels: Array<any>, groups: Array<any>, loading: boolean, error: any } {
    const engine = useDataEngine();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any | undefined>();
    const [levels, setLevels] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function getLevelsAndGroups() {
            setLoading(true)
            try {
                setLevels(await apiFetchOrganisationUnitLevels(engine, setError))
                setGroups(await apiFetchOrganisationUnitGroups(engine, setError))
            } catch (e) {
                setError(e)
            }
            setLoading(false)
        }
        getLevelsAndGroups()
    }, []);


    return {
        levels,
        groups,
        error,
        loading
    };
}
