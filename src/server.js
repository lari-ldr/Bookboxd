import setupApp from './app';
import chalk from 'chalk';
const port = 3333;

const exitStatus = {
  failure: 1,
  success: 0,
};

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    chalk.black.bgRed(
      `App exiting due to an unhadled promise: ${promise} and reason: ${reason}`
    )
  );
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.error(
    chalk.black.bgRed(`App exiting due to an uncaught exception: ${error}`)
  );
  process.exit(exitStatus.failure);
});

(async () => {
  try {
    const app = await setupApp();
    const server = app.listen(port, () =>
      console.info(chalk.magenta(`App running on port: ${port}`))
    );

    const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.map((sig) =>
      process.on(sig, async () => {
        try {
          await server.close();
          console.info(chalk.yellow(' App successfully closed!'));
          await app.database.close();
          console.info(chalk.cyan(' PSQl database successfully closed!'));
          process.exit(exitStatus.success);
        } catch (error) {
          console.err(chalk.black.bgRed('App exited with error:'), error);
          process.exit(exitStatus.failure);
        }
      })
    );
  } catch (error) {
    console.error(chalk.black.bgRed('App exited with error:'), error);
    process.exit(exitStatus.failure);
  }
})();
