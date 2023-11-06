// @ts-check

/**
 * one config -> n-workflow -> m-jobs
 */

const { Config, Workflow } = require("@circleci/circleci-config-sdk");
const { setupAppAndCypress } = require("./jobs");
const { BrowserToolsOrb } = require("./orbs");

const linuxConfig = new Config();
const apiTestsWorkflow = new Workflow("API tests with Cypress");

linuxConfig.importOrb(BrowserToolsOrb);
linuxConfig.addWorkflow(apiTestsWorkflow);

linuxConfig.addJob(setupAppAndCypress);
apiTestsWorkflow.addJob(setupAppAndCypress);

linuxConfig
  .writeFile("./.circleci/config.yml")
  .then(() => console.log("Generated CircleCI config!"));
