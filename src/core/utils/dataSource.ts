const identifiableObjectsQuery = {
    object: {
        resource: "identifiableObjects",
        id: ({id}:any) => id,
    }
}

function getResourceFromHref(href:any) {
    const resource = href.split("/");
    return resource[resource.length - 2];
}

function getTypeFromResource(resource:any) {
    switch (resource) {
        case "indicators":
            return "indicator";
        case "dataElements":
            return "dataElement";
        case "dataSets":
            return "dataSet";
        case "programIndicators":
            return "programIndicator";
        case "eventDataItems":
            return "dataElement";
        default:
            return resource;
    }
}

export async function getDataSourceType(engine:any, dataSourceId:any) {
    const {object} = await engine.query(identifiableObjectsQuery, {variables: {id: dataSourceId}}) ?? {};
    if (object.href) {
        const resource = getResourceFromHref(object.href);
        return getTypeFromResource(resource);
    }
    return null;
}
