import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import webpack from "@cypress/webpack-preprocessor";
import { networkShim, chromeAllowXSiteCookies } from "@dhis2/cypress-plugins";
import { defineConfig } from "cypress";

async function cucumberPreprocessor(on, config) {
  await addCucumberPreprocessorPlugin(on, config);
  const webpackConfig = import("./webpack.config");
  on("file:preprocessor", webpack(webpackConfig));
}

export default defineConfig({
  video: false,
  projectId: "w8u5sk",
  experimentalInteractiveRunEvents: true,
  component: {
    env: {
      dhis2DataTestPrefix: "dhis2-reactui",
      networkMode: "live",
    },
    setupNodeEvents: async (on, config) => {
      chromeAllowXSiteCookies(on);
      await cucumberPreprocessor(on, config);
      networkShim(on, config);
    },
    port: 3000,
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
    viewportHeight: 763,
    viewportWidth: 1366,
    specPattern: "src/**/*.test.{js,ts,jsx,tsx}",
  },
  e2e: {
    setupNodeEvents: async (on, config) => {
      networkShim(on, config);
      chromeAllowXSiteCookies(on);
      await cucumberPreprocessor(on, config);
    },
  },
});
