const { Config, Workflow, executors, Job, commands } = require("@circleci/circleci-config-sdk");

const linuxConfig = new Config();
const apiTestsWorkflow = new Workflow("API tests with Cypress");

linuxConfig.addWorkflow(apiTestsWorkflow);

const linuxExecutor = new executors.DockerExecutor(
  "cypress/browsers:node-18.15.0-chrome-106.0.5249.61-1-ff-99.0.1-edge-114.0.1823.51-1",
  "small"
);

const apiTestsJob = new Job("run-api-tests", linuxExecutor);
linuxConfig.addJob(apiTestsJob);

apiTestsJob
  .addStep(new commands.Checkout())
  .addStep(
    new commands.Run({
      name: "Set Yarn Classic",
      command: "yarn set version classic",
    })
  )
  .addStep(
    new commands.Run({
      name: "Install packages",
      command: "yarn install",
    })
  )
  .addStep(
    new commands.Run({
      command: "npx cypress info",
      name: "Show Cypress info",
    })
  )
  .addStep(
    new commands.Run({
      name: "git status",
      command: "git status",
    })
  );

apiTestsWorkflow.addJob(apiTestsJob);

const yamlConfig = linuxConfig.stringify();

linuxConfig
  .writeFile("./.circleci/config.yml")
  .then(() => console.log("Generated CircleCI config!"));
