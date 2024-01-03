import Transport from 'winston-transport';
import { LogLevels } from '../shared/types/log.enum';
import {
  IMessageCollector
} from '../infrastructure/adapters/telegram/infrastructure/interfaces/messages-collector.interfaces';
import {
  ITelegramAdapter,
  ITelegramFormatOptions, ITelegramRequestPayload,
  TTelegramFormatMessageFn,
} from '../infrastructure/adapters/telegram/infrastructure/interfaces/telegram-adapter.interfaces';
import { MessageCollector } from '../infrastructure/adapters/telegram/application/messages.collector';
import { TelegramAdapter } from '../infrastructure/adapters/telegram/application/telegram.adapter';
import { ILog } from '../infrastructure/intefaces/log.interfaces';
import { ITelegramTransportOpts } from '../infrastructure/intefaces/options.interfaces';

export class TelegramTransport extends Transport {

  private readonly _MAX_MESSAGE_LENGTH = 4096;
  private readonly _token: string;
  private readonly _chatId: string | undefined;
  private readonly _parseMode: string;
  private readonly _lvls: Set<LogLevels>;
  private readonly _disableNotification: boolean;
  private readonly _template: string;
  private readonly _formatMessage?: TTelegramFormatMessageFn;
  private readonly _batchingDelay: number;
  private readonly _batchingSeparator: string;
  private readonly _sender: ITelegramAdapter;
  private readonly _messageCollector: IMessageCollector<ITelegramRequestPayload>;

  constructor(options: ITelegramTransportOpts) {
    super(options);

    // TODO: map to domain errors
    if (!options.token?.length) {
      throw new Error('You should provide token for Telegram transport');
    }

    // if (!options.chatId?.length) {
    //   throw new Error('You should provide chatId for Telegram transport');
    // }

    if (options.formatMessage && typeof options.formatMessage !== 'function') {
      throw new Error('\'formatMessage\' property should be function for Telegram transport');
    }

    this.handleExceptions = options.handleExceptions ?? true;
    this.silent = options.silent || false;

    this._token = options.token;
    this._chatId = options.chatId;
    this._parseMode = options.parseMode || 'Markdown';
    this._lvls = new Set(options.levels || []);
    this._disableNotification = options.disableNotification || false;
    this._template = options.template || `**{level}: [{context}]**
    **Message:** [{message}]`;
    this._formatMessage = options.formatMessage;
    this._batchingDelay = options.batchingDelay || 0;
    this._batchingSeparator = options.batchingSeparator || '\n\n';
    this._messageCollector = new MessageCollector<ITelegramRequestPayload>({
      timeout: options.batchingDelay || 1000,
    });
    this._sender = new TelegramAdapter();

    this._messageCollector.onDrained(<T>(messages: T[]) => {
      // TODO: group by chat_id and optimize sending
      for (const message of messages) {
        this.send(message as ITelegramRequestPayload).catch(console.error)
      }
    });
  }

  public static create(opts: ITelegramTransportOpts): TelegramTransport {
    return new TelegramTransport(opts);
  }

  log(info: ILog, next: () => void): void {
    if (!this.silent && this._lvls.has(info.level)) {
      // TODO: remove any
      const formatOptions: ITelegramFormatOptions<any> = {
        context: `${info?.data?.organization}.${info?.data?.context}.${info?.data?.app}`,
        timestamp: info.timestamp || new Date().toISOString(),
        level: info.level?.toUpperCase() as LogLevels,
        message: info.message,
        metadata: info.data || {},
      };

      const payload: ITelegramRequestPayload = {
        token: this._token,
        chat_id: this._chatId || info?.data?.to?.chat_id || '',
        text: '',
      };
      if (this._formatMessage) {
        payload.text = this._formatMessage(formatOptions, info);
      }
      else {
        payload.text = this._format(this._template, formatOptions);
      }

      if (this._batchingDelay) {
        this._messageCollector.cache(payload);
      }
      else {
        this.send(payload)
          .catch(console.error);
      }
    }

    next();
  }

  private async send(data: ITelegramRequestPayload): Promise<void> {
    if (data.text.length < this._MAX_MESSAGE_LENGTH) {
      await this._sender.send({
        ...data,
        disable_notification: this._disableNotification,
        parse_mode: this._parseMode,
      });
    }
    else {
      const size = Math.ceil(data.text.length / this._MAX_MESSAGE_LENGTH);
      let offset = 0;

      for (let i = 0; i < size; i += 1) {
        await this._sender.send({
          ...data,
          text: data.text.substring(offset, this._MAX_MESSAGE_LENGTH),
          disable_notification: this._disableNotification,
          parse_mode: this._parseMode,
        });

        offset += this._MAX_MESSAGE_LENGTH;
      }
    }
  }

  private _format(string: string, data: object): string {
    return Object.entries(data)
      .reduce((res, [key, value]) => {
        const search = `{${key}}`;

        if (
          res.indexOf(search) !== -1 &&
          res.indexOf(`\\${key}`) === -1 && // Escaped on start
          res.indexOf(`${key}\\`) === -1 // Escaped on end
        ) {
          return res.replace(search, value);
        }

        return res;
      }, string);
  }

}
