// @ts-check

const { commands, reusable } = require("@circleci/circleci-config-sdk");
const { sharedJob } = require("./shared");
const { BrowserToolsOrb } = require("../orbs");

const setupAppAndCypress = sharedJob("run-app-and-cypress")
  .addStep(
    new commands.Run({
      name: "List project dir",
      command: "ls",
    })
  )
  .addStep(
    new commands.Run({
      name: "install missing dependency for Chrome Stable",
      command: "sudo apt-get update -y && sudo apt-get install -y libu2f-udev",
    })
  )
  .addStep(
    new reusable.ReusedCommand(BrowserToolsOrb.commands["install-chrome"], {
      channel: "stable",
      "chrome-version": "119.0.6045.105",
      "replace-existing": true,
    })
  )
  .addStep(
    new commands.Run({
      command: "npx cypress info",
      name: "Show Cypress info",
    })
  );

module.exports = {
  setupAppAndCypress,
};
