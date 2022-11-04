//Only uncomment if you want live data
import { Provider } from "@dhis2/app-runtime";
import React from "react";
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
const DHIS2Provider = ({ children }) => <Provider config={appConfig}>{children}</Provider>;

const StoryPreview = ({ children }) => {
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
