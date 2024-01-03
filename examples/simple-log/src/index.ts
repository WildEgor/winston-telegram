import { TelegramTransport } from '../../../src';

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new TelegramTransport({
        token: 'YOUR_TOKEN',
      }),
  ]
});

logger.log({
  level: 'info',
  message: 'Hello distributed log files!',
  to: {
    chatId: 'YOUR_CHAT_ID',
  },
});
