import { Provider } from "@dhis2/app-runtime";
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import React, { useEffect, useState } from "react";
import hispTheme from "./theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
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
  baseUrl: process.env.STORYBOOK_DHIS2_BASE_URL ?? "http://localhost:8080",
  apiVersion: parseInt(process.env.STORYBOOK_DHIS2_API_VERSION ?? "") ?? 36,
};

const loginUrl = `${process.env.STORYBOOK_DHIS2_BASE_URL}/dhis-web-commons-security/login.action`;
const meUrl = `${process.env.STORYBOOK_DHIS2_BASE_URL}/api/${process.env.STORYBOOK_DHIS2_API_VERSION}/me?fields=id,name`;
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
        `${encodeURIComponent("j_username")}=${encodeURIComponent(process.env.STORYBOOK_DHIS2_USERNAME)}`,
        `${encodeURIComponent("j_password")}=${encodeURIComponent(process.env.STORYBOOK_DHIS2_PASSWORD)}`,
      ].join("&");
      try {
        if (!(await checkAuthentication())) {
          await fetch(loginUrl, {
            method: "POST",
            redirect: "follow",
            credentials: "include",
            mode: "no-cors",
            headers: {
              Accept: "*",
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": process.env.STORYBOOK_DHIS2_BASE_URL,
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <Story />
        </div>
      </StoryPreview>
    </DHIS2Provider>
  ),
];
