"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = 3333;
const exitStatus = {
  failure: 1,
  success: 0
};
process.on('unhandledRejection', (reason, promise) => {
  console.error(`App exiting due to an unhadled promise: ${promise} and reason: ${reason}`);
  throw reason;
});
process.on('uncaughtException', error => {
  console.error(`App exiting due to an uncaught exception: ${error}`);
  process.exit(exitStatus.failure);
});

(async () => {
  try {
    const app = await (0, _app.default)();
    const server = app.listen(port, () => console.info(`App running on port: ${port}`));
    const exitSignals = ["SIGINT", 'SIGTERM', 'SIGQUIT'];
    exitSignals.map(sig => process.on(sig, async () => {
      try {
        await server.close();
        console.info(' App successfully closed!');
        await app.database.close();
        console.info(' PSQl database successfully closed!');
        process.exit(exitStatus.success);
      } catch (error) {
        console.err('App exited with error:', error);
        process.exit(exitStatus.failure);
      }
    }));
  } catch (error) {
    console.error('App exited with error:', error);
    process.exit(exitStatus.failure);
  }
})();