const query = {
    identifiableObjects: {
        resource: "identifiableObjects",
        id: ({ id }:any) => id,
        params: {
            fields: ["id", "displayName"]
        }
    }
};

const query2 = {
    program: {
        resource: "programIndicators",
        id: ({ id }:any) => id,
        params: {
            fields: ["program[id,displayName]"]
        }
    }
};

export async function getProgramFromAttributesOrDtElPrg(engine:any, arr:any) {
    if (arr?.length > 0) {
        const allPromises = arr?.map((id:any) => {
            return new Promise((resolve, reject) => {
                resolve(getProgramFromAttributesOrDtElPrgFromApi(engine, id));
            });
        });
        return await Promise.all(allPromises).then((value) => {
            return value.map((val, index) => {
                return val;
            });
        });
    }
}

async function getProgramFromAttributesOrDtElPrgFromApi(engine:any, id:any) {
    const data = await engine.query(query, { variables: { id } });
    return data?.identifiableObjects;
}

export async function getProgramFromProgramIndicator(engine:any, arr:any) {
    if (arr?.length > 0) {
        const allPromises = arr?.map((id:any) => {
            return new Promise((resolve, reject) => {
                resolve(getProgramFromProgramIndicatorApi(engine, id));
            });
        });
        return await Promise.all(allPromises).then((value) => {
            return value.map((val, index) => {
                //We always return array just for uniformity
                return val;
            });
        });
    }
}

async function getProgramFromProgramIndicatorApi(engine:any, id:any) {
    const data = await engine.query(query2, { variables: { id } });
    return data?.program?.program;
}

