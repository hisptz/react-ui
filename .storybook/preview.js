import { Provider } from "@dhis2/app-runtime";
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import React, { useEffect, useState } from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const appConfig = {
  baseUrl: process.env.STORYBOOK_DHIS2_BASE_URL ?? "http://localhost:8080",
  apiVersion: parseInt(process.env.STORYBOOK_DHIS2_API_VERSION ?? "") ?? 36,
};

const loginUrl = `${process.env.STORYBOOK_DHIS2_BASE_URL}/dhis-web-commons-security/login.action`;

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
        const response = await fetch(loginUrl, {
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
        console.log(response);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }

    login();
  }, []);

  return { loading };
}

const DHIS2Provider = ({ children }) => <Provider config={appConfig}>{children}</Provider>;

const StoryPreview = ({ children }) => {
  const { loading } = useLogin();

  return loading ? (
    <CenteredContent>
      <CircularLoader />
    </CenteredContent>
  ) : (
    <>{children}</>
  );
};

export const decorators = [
  (Story) => (
    <DHIS2Provider>
      <StoryPreview>
        <Story />
      </StoryPreview>
    </DHIS2Provider>
  ),
];
