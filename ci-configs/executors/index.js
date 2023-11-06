const { executors } = require("@circleci/circleci-config-sdk");

const dockerExecutor = (nodeVersion = "18.12.1") =>
  new executors.DockerExecutor(`cimg/node:${nodeVersion}`, "small");

module.exports = {
  dockerExecutor,
};
