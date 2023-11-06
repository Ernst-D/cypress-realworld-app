// @ts-check

/**
 * one config -> n-workflow -> m-jobs
 */

const { Config, Workflow, executors, Job, commands } = require("@circleci/circleci-config-sdk");
const { setupProject, setupAppAndCypress } = require("./jobs");

const commandInstallWaitOn = new commands.Run({
  name: "Install 'wait-on' module",
  command: "npm install -g wait-on",
});

const commandRunApp = new commands.Run({
  name: "Run frontend and backend",
  command: "yarn start",
});

const commandWaitOnPort = (port, desc) =>
  new commands.Run({
    name: `Run 'wait-on' for ${desc}`,
    command: `wait-on http://localhost:${port}`,
  });

const linuxConfig = new Config();
const apiTestsWorkflow = new Workflow("API tests with Cypress");

linuxConfig.addWorkflow(apiTestsWorkflow);

// .addStep(commandRestoreCacheNodeModules)
// .addStep(
//   new commands.Run({
//     name: "Install packages",
//     command: "yarn install",
//   })
// )
// .addStep(commandSaveCacheNodeModules);
// .addStep(
//   new commands.Run({
//     command: "npx cypress info",
//     name: "Show Cypress info",´
//   })
// )
// .addStep(
//   new commands.Run({
//     name: "git status",
//     command: "git status",
//   })
// )
// .addStep(commandInstallWaitOn)
// .addStep(commandRunApp)
// .addStep(commandWaitOnPort(3000, "frontend port"))
// .addStep(commandWaitOnPort(3001, "backend port"))
// .addStep(
//   new commands.Run({
//     name: "Run API tests",
//     command: "npx cypress run --spec cypress/tests/api/",
//   })
// );

linuxConfig.addJob(setupProject);
linuxConfig.addJob(setupAppAndCypress);
apiTestsWorkflow.addJob(setupProject);
apiTestsWorkflow.addJob(setupAppAndCypress, {
  requires: ["setup-project"],
});

const yamlConfig = linuxConfig.stringify();

linuxConfig
  .writeFile("./.circleci/config.yml")
  .then(() => console.log("Generated CircleCI config!"));
