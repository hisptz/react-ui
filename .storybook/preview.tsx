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
  baseUrl: process.env.STORYBOOK_DHIS2_BASE_URL ??  "https://play.dhis2.org"??"http://localhost:8081",
  apiVersion: parseInt(process.env.STORYBOOK_DHIS2_API_VERSION ?? "38") ?? 38,
};
const DHIS2Provider = ({ children }: { children: React.ReactNode }) => <Provider config={appConfig}>{children}</Provider>;

const StoryPreview = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const decorators = [
  (Story: any) => (
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
