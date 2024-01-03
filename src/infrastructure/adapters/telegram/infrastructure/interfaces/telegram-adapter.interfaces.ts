import { LogLevels } from '../../../../../shared/types/log.enum';
import { ISender } from './sender.interfaces';

export interface ITelegramFormatOptions<T extends NodeJS.Dict<unknown>> {
  context: string;
  timestamp: string;
  level: LogLevels;
  message: string;
  metadata: T;
}

export type TTelegramFormatMessageFn = <T extends NodeJS.Dict<unknown>>(params: ITelegramFormatOptions<T>, info: unknown) => string;

export interface ITelegramRequestPayload {
  chat_id: string;
  token: string;
  text: string;
  disable_notification?: boolean;
  parse_mode?: string;
}

export interface ITelegramAdapter extends ISender<ITelegramRequestPayload>{
  send(payload: ITelegramRequestPayload): Promise<void>;
}
