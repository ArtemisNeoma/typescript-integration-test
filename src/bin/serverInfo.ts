import { serverLogger } from '@util/logger';

export const onError = (
  error: NodeJS.ErrnoException,
  port: string | number,
): never => {
  if (error.syscall !== 'listen') throw error;
  switch (error.code) {
    case 'EACESS':
      serverLogger.log({
        level: 'error',
        message: `${port} requires elevated privileges`,
      });
      process.exit(1);
      break;
    case 'EADDRINUSE':
      serverLogger.log({
        level: 'error',
        message: `Address ${port} is already in use`,
      });
      process.exit(1);
      break;
    default:
      throw error;
  }
};

export const onListening = (port: string | number): void => {
  serverLogger.log({
    level: 'info',
    message: `Listening on port ${port}`,
  });
};
