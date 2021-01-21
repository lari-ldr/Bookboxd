"use strict";

var _app = _interopRequireDefault(require("./app"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = 3333;
const exitStatus = {
  failure: 1,
  success: 0
};
process.on('unhandledRejection', (reason, promise) => {
  console.error(_chalk.default.black.bgRed(`App exiting due to an unhadled promise: ${promise} and reason: ${reason}`));
  throw reason;
});
process.on('uncaughtException', error => {
  console.error(_chalk.default.black.bgRed(`App exiting due to an uncaught exception: ${error}`));
  process.exit(exitStatus.failure);
});

(async () => {
  try {
    const app = await (0, _app.default)();
    const server = app.listen(port, () => console.info(_chalk.default.magenta(`App running on port: ${port}`)));
    const exitSignals = ["SIGINT", 'SIGTERM', 'SIGQUIT'];
    exitSignals.map(sig => process.on(sig, async () => {
      try {
        await server.close();
        console.info(_chalk.default.yellow(' App successfully closed!'));
        await app.database.close();
        console.info(_chalk.default.cyan(' PSQl database successfully closed!'));
        process.exit(exitStatus.success);
      } catch (error) {
        console.err(_chalk.default.black.bgRed('App exited with error:'), error);
        process.exit(exitStatus.failure);
      }
    }));
  } catch (error) {
    console.error(_chalk.default.black.bgRed('App exited with error:'), error);
    process.exit(exitStatus.failure);
  }
})();