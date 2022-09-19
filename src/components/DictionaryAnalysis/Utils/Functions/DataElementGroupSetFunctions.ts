const query = {
    dataSets: {
        resource: "dataSets",

        params: ({ id }:any) => ({
            fields: ["id", "displayName", "periodType", "timelyDays"],
            filter: [`dataSetElements.dataElement.id:eq:${id}`]
        })
    }
};

const query2 = {
    numeratorMatch: {
        resource: "indicators",
        params: ({ id }:any) => ({
            fields: ["id"],
            filter: [`numerator:like:${id}`]
        })
    },
    denominatorMatch: {
        resource: "indicators",
        params: ({ id }:any) => ({
            fields: ["id"],
            filter: [`denominator:like:${id}`]
        })
    }
};

export async function getNumDenMatch(engine:any, arr:any) {
    const allPromises = arr?.map((id:any) => {
        return new Promise((resolve, reject) => {
            resolve(getMatch(engine, id));
        });
    });
    return await Promise.all(allPromises).then((value) => {
        return value.map((val, index) => {
            //We always return array just for uniformity

            return val;
        });
    });
}

export async function getDataSetsArray(engine:any, arr:any) {
    if (arr?.length > 0) {
        const allPromises = arr?.map((id:any) => {
            return new Promise((resolve, reject) => {
                resolve(getDataSetsFromApi(engine, id));
            });
        });
        return await Promise.all(allPromises).then((value) => {
            return value.map((val, index) => {
                //We always return array just for uniformity
                return val?.dataSets;
            });
        });
    }
}

async function getDataSetsFromApi(engine:any, id:any) {
    const data = await engine.query(query, { variables: { id } });
    return data?.dataSets;
}

async function getMatch(engine:any, id:any) {
    const data = await engine.query(query2, { variables: { id } });
    return data;
}

