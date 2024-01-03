import { TelegramTransport } from '../../../src';
import { LogLevels } from '../../../src/shared/types/log.enum';

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
      new TelegramTransport({
        levels: [LogLevels.Info],
        token: '6581515204:AAFECpWwl7XsNpehc0dbgWZxtg0QcVajTTg', // for demo
        chatId: '-1002035814378', // act like default chat id
      }),
  ]
});

// TEST
logger.log({
  level: LogLevels.Info,
  message: 'Send logs to default chat',
});

logger.log(LogLevels.Info,"Sent to specific chat", {
  chat_id: '-1002035814378'
});

logger.log(LogLevels.Info, "Or send to topic!", {
  chat_id: '-1001901864911',
  message_thread_id: 5
});
