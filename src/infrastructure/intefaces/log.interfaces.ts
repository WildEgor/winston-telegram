import { LogLevels } from '../../shared/types/log.enum';

export interface ILogTo {
  chat_id: string;
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
  to?: ILogTo;
}

export interface ILog {
  level: LogLevels;
  timestamp?: string;
  message: string;
  data?: ILogPayload;
}
