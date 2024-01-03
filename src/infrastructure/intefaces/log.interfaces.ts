import { LogEntry } from 'winston';
import { LogLevels } from '../../shared/types/log.enum';

export interface ILogEntry extends LogEntry {
  level: LogLevels;
  message: string;
  metadata?: ILogPayload;
  chat_id?: string;
  message_thread_id?: number;
}

export interface ILogPayload {
  /**
   * @description Context of the log
   */
  organization?: string;
  context?: string;
  app?: string;
  /**
   * @description Error object
   */
  error?: Error;
  /**
   * @description Additional log data
   */
  props?: NodeJS.Dict<unknown>;
}
