//Only uncomment if you want live data
import { Provider, useDataQuery } from "@dhis2/app-runtime";
import React, { useEffect } from "react";
import { post } from "./api";
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

const username = import.meta.env.STORYBOOK_DHIS2_USERNAME ?? "admin";
const password = import.meta.env.STORYBOOK_DHIS2_PASSWORD ?? "district";
const baseUrl = import.meta.env.STORYBOOK_DHIS2_BASE_URL ?? "http://localhost:8080";

const appConfig = {
  baseUrl,
  apiVersion: parseInt(import.meta.env.STORYBOOK_DHIS2_API_VERSION ?? "38") ?? 38,
};

const DHIS2Provider = ({ children }) => <Provider config={appConfig}>{children}</Provider>;

const USER_QUERY = {
  me: {
    resource: "me",
  },
};

const StoryPreview = ({ children }) => {
  const { error } = useDataQuery(USER_QUERY);

  async function login() {
    window.localStorage.DHIS2_BASE_URL = baseUrl;
    try {
      await post(`${baseUrl}/dhis-web-commons-security/login.action`, `j_username=${encodeURIComponent(username)}&j_password=${encodeURIComponent(password)}`);
    } catch (e) {
      console.error(`Could not login`);
    }
  }

  useEffect(() => {
    async function check() {
      if (error) {
        if (error.type === "access") {
          await login();
          window.location.reload();
        }
      }
    }
    check();
  }, [error]);

  return <>{children}</>;
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
