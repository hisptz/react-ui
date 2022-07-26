import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { chromeAllowXSiteCookies, networkShim } from "@dhis2/cypress-plugins";
import { defineConfig } from "cypress";

async function cucumberPreprocessor(on, config) {
  await addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    createBundler({
      plugin: createEsbuildPlugin(config),
    })
  );
}

export default defineConfig({
  video: false,
  projectId: "w8u5sk",
  env: {
    dhis2DataTestPrefix: "dhis2-react-ui",
    networkMode: "live",
    dhis2ApiVersion: "38",
  },
  experimentalInteractiveRunEvents: true,
  component: {
    supportFile: "cypress/support/component.ts",
    setupNodeEvents: async (on, config) => {
      networkShim(on, config);
      chromeAllowXSiteCookies(on);
      await cucumberPreprocessor(on, config);
    },
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: {
        jsx: "vite-react",
        ts: true,
        tsConfig: "tsconfig.json",
      },
    },
    defaultCommandTimeout: 60000,
    viewportHeight: 763,
    viewportWidth: 1366,
    specPattern: "src/**/*.test.{js,ts,jsx,tsx}",
  },
});
