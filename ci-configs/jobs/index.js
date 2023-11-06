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
const cacheKeyNodeModules = `v1-deps-{{ checksum "yarn.lock" }}`;
const commandRestoreCacheNodeModules = new commands.cache.Restore({
  key: cacheKeyNodeModules,
});
const commandSaveCacheNodeModules = new commands.cache.Save({
  paths: ["node_modules"],
  key: cacheKeyNodeModules,
});

setupProject
  .addStep(new commands.Checkout())
  .addStep(commandSetYarnClassic)
  .addStep(commandRestoreCacheNodeModules)
  .addStep(commandInstallPackages)
  .addStep(
    new commands.Run({
      name: "git status",
      command: "git status",
    })
  );
// .addStep(commandSaveCacheNodeModules);

module.exports = {
  setupProject,
};
