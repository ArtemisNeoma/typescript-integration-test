import { createLogger, format, Logform, transports } from 'winston';

const baseFormat = format.printf(
  ({ level, message, label, timestamp }: Logform.TransformableInfo) =>
    `[${timestamp} - ${label}] ${level}: ${message}`,
);

export const serverLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.label({ label: 'test' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    baseFormat,
  ),
  defaultMeta: { service: 'Server Info' },
  transports: [new transports.Console()],
});
