import { Provider } from "@dhis2/app-runtime";
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import hispTheme from "./theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: hispTheme,
  },
};

const appConfig = {
  baseUrl: process.env.STORYBOOK_DHIS2_BASE_URL ?? "http://localhost:8081",
  apiVersion: parseInt(process.env.STORYBOOK_DHIS2_API_VERSION ?? "38") ?? 38,
};

const LOGIN_ENDPOINT = "dhis-web-commons-security/login.action";

const loginUrl = `${process.env.STORYBOOK_DHIS2_BASE_URL ?? "http://localhost:8081"}/${LOGIN_ENDPOINT}`;
const meUrl = `${process.env.STORYBOOK_DHIS2_BASE_URL ?? "http://localhost:8081"}/api/${process.env.STORYBOOK_DHIS2_API_VERSION ?? "38"}/me?fields=id,name`;
const checkAuthentication = async () => {
  try {
    const response = await fetch(meUrl, { redirect: "error" });
    if (response) {
      return response.status === 200;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

function useLogin() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function login() {
      setLoading(true);
      const data = [
        `${encodeURIComponent("j_username")}=${encodeURIComponent(username)}`,
        `${encodeURIComponent("j_password")}=${encodeURIComponent(password)}`,
      ].join("&");
      try {
        if (!(await checkAuthentication())) {
          await fetch(loginUrl, {
            method: "POST",
            followRedirect: false,
            redirect: "follow",
            credentials: "include",
            mode: "no-cors",
            headers: {
              Accept: "*",
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Allow-Origin": "*",
            },
            body: data,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }

    login()
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  return { loading };
}

const DHIS2Provider = ({ children }) => <Provider config={appConfig}>{children}</Provider>;

const StoryPreview = ({ children }) => {
  const { loading } = useLogin();

  return loading ? (
    <div style={{ width: "100%", height: 500 }}>
      <CenteredContent>
        <CircularLoader small />
      </CenteredContent>
    </div>
  ) : (
    <>{children}</>
  );
};

export const decorators = [
  (Story) => (
    <DHIS2Provider>
      <StoryPreview>
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "80vh",
          }}>
          <Story />
        </div>
      </StoryPreview>
    </DHIS2Provider>
  ),
];
