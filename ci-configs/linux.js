// @ts-check

const { Config, Workflow, executors, Job, commands } = require("@circleci/circleci-config-sdk");

const cacheKeyNodeModules = `v1-deps-{{ checksum "yarn.lock" }}`;
const commandRestoreCacheNodeModules = new commands.cache.Restore({
  key: cacheKeyNodeModules,
});
const commandSaveCacheNodeModules = new commands.cache.Save({
  paths: ["node_modules"],
  key: cacheKeyNodeModules,
});

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
  .addStep(commandRestoreCacheNodeModules)
  .addStep(
    new commands.Run({
      name: "Install packages",
      command: "yarn install",
    })
  )
  .addStep(commandSaveCacheNodeModules);
// .addStep(
//   new commands.Run({
//     command: "npx cypress info",
//     name: "Show Cypress info",
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

apiTestsWorkflow.addJob(apiTestsJob);

const yamlConfig = linuxConfig.stringify();

linuxConfig
  .writeFile("./.circleci/config.yml")
  .then(() => console.log("Generated CircleCI config!"));
