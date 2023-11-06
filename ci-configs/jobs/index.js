// @ts-check

const { Job, commands } = require("@circleci/circleci-config-sdk");
const { dockerExecutor } = require("../executors");

const setupProject = new Job("setup-project", dockerExecutor());

const commandSetYarnClassic = new commands.Run({
  name: "Set Yarn Classic",
  command: "yarn set version classic",
});
const commandInstallPackages = new commands.Run({
  name: "Install packages",
  command: "yarn install",
});

setupProject
  .addStep(new commands.Checkout())
  .addStep(commandSetYarnClassic)
  .addStep(commandInstallPackages)
  .addStep(
    new commands.Run({
      name: "git status",
      command: "git status",
    })
  );

module.exports = {
  setupProject,
};
