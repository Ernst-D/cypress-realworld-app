// @ts-check

const { Job, commands } = require("@circleci/circleci-config-sdk");
const { dockerExecutor } = require("../executors");

const commandSetYarnClassic = new commands.Run({
  name: "Set Yarn Classic",
  command: "yarn set version classic",
});
const commandInstallPackages = new commands.Run({
  name: "Install packages",
  command: "yarn install",
});

const sharedJob = (jobName = "setup-project") =>
  new Job(jobName, dockerExecutor("18.12.1-browsers"), [
    new commands.Run({
      name: "install missing dependency",
      command: "sudo apt-get update -y && sudo apt-get install -y libu2f-udev",
    }),
    new commands.Checkout(),
    commandSetYarnClassic,
    commandInstallPackages,
    new commands.Run({
      name: "git status",
      command: "git status",
    }),
  ]);

module.exports = {
  sharedJob,
};
