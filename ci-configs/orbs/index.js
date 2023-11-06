const { orb, parameters } = require("@circleci/circleci-config-sdk");

const BrowserToolsOrb = new orb.OrbImport(
  "browser-tools",
  "circleci",
  "browser-tools",
  "1.4.6",
  "",
  {
    jobs: {},
    commands: {
      "install-chrome": new parameters.CustomParametersList([
        new parameters.CustomEnumParameter("channel", ["stable, canary"]),
        new parameters.CustomParameter("chrome-version", "string"),
        new parameters.CustomParameter("replace-existing", "boolean"),
      ]),
    },
    executors: {},
  }
);

module.exports = {
  BrowserToolsOrb,
};
