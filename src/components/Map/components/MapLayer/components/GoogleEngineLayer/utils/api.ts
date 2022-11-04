import { isObject, isString } from "lodash/fp";

// The api/configuration/xx endpoints returns an empty body if the config is not set
// This is a replacement for response.json() which gives error if body is empty
// https://stackoverflow.com/a/51320025
const getJsonResponse = async (response: Response) => {
  const string = await response.text();
  return string === "" ? undefined : JSON.parse(string);
};

export const apiFetch = async (url: string, method?: string, body?: Record<string, any> | string) => {
  const options = {
    headers: {
      "Content-Type": "application/json", // Default API response
    },
    credentials: "include" as RequestCredentials,
    method: method ?? "GET",
    body: "",
  };

  options.credentials = "include";

  if (method && body) {
    options.method = method;

    if (isString(body)) {
      options.headers["Content-Type"] = "text/html";
      options.body = body;
    } else if (isObject(body)) {
      options.body = JSON.stringify(body);
    }
  }

  // TODO: Better error handling
  return fetch(encodeURI(url), options)
    .then((response) => (["POST", "PUT", "PATCH"].includes(<string>method) ? response : getJsonResponse(response)))
    .catch((error) => console.log("Error: ", error)); // eslint-disable-line
};
