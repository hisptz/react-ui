import { Provider } from "@dhis2/app-runtime";
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import React, { useState } from "react";

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

function useLogin() {
  const [loading] = useState(false);
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
