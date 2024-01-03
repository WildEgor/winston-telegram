import { LogLevels } from '../../shared/types/log.enum';
import { TTelegramFormatMessageFn } from '../adapters/telegram/infrastructure/interfaces/telegram-adapter.interfaces';
import { ParserTypes } from '../../shared/types/parser.enum';

export interface ITelegramTransportOpts {
  /** The Telegram bot authentication token. */
  token: string;
  /** The Telegram chat_id you want just send. */
  chatId?: string;
  /** The Telegram mode for parsing entities in the message text. */
  parseMode?: ParserTypes;
  /** Levels of messages that this transport should log. (default none) */
  levels?: LogLevels[];
  /** Whether to suppress output. (default false) */
  silent?: boolean;
  /** Sends the message silently. (default false) */
  disableNotification?: boolean;
  /** Format output message. (default "[{level}] [message]") */
  template?: string;
  /** Format output message by own method. */
  formatMessage?: TTelegramFormatMessageFn;
  /** Handle uncaught exceptions. (default true) */
  handleExceptions?: boolean;
  /** Time in ms within which to batch messages together. (default = 0) (0 = disabled) */
  batchingDelay?: number;
  /** String with which to join batched messages with (default "\n\n") */
  batchingSeparator?: string;
}
