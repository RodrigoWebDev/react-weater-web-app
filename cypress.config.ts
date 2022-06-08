import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:1234',
    supportFile: './src/cypress/support/e2e.{js,jsx,ts,tsx}',
    downloadsFolder: './src/cypress/downloads',
    fixturesFolder: './src/cypress/fixtures',
    specPattern: './src/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  },
});
