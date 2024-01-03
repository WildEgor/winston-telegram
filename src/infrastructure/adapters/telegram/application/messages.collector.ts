import { RuntimeException } from '../infrastructure/exceptions/runtime.exception';
import {
  IMessageCollector,
  IMessagesCollectorOpts,
  TMessagesDrainHandlerFn,
} from '../infrastructure/interfaces/messages-collector.interfaces';

/**
 * @description Holds messages in memory for a given time and then flushes them to the given handler
 */
export class MessageCollector<T> implements IMessageCollector<T>{

  private readonly _MAX_MESSAGES = 100;
  private readonly _messages: T[];
  private readonly _timeout: number;
  private _resolveHandler: TMessagesDrainHandlerFn | null;
  private _timeoutId: NodeJS.Timeout | null = null;

  public constructor(opts: IMessagesCollectorOpts) {
    this._messages = [];
    this._resolveHandler = null;
    this._timeout = opts.timeout;
  }

  public onDrained(handler: TMessagesDrainHandlerFn): void {
    this._resolveHandler = handler;
  }

  public cache(message: T): void {
    this._messages.push(message);

    if (this._timeoutId !== null) {
      clearTimeout(this._timeoutId);
    }

    if (this._messages.length === this._MAX_MESSAGES) {
      this._clear();
    }

    this._timeoutId = setTimeout(() => {
      this._clear();
    }, this._timeout);
  }

  /**
   * @description Clears messages and calls resolve handler
   * @private
   */
  private _clear(): void {
    if (this._resolveHandler === null || typeof this._resolveHandler !== 'function') {
      throw new RuntimeException("Resolve handler is not defined");
    }

    if (this._messages.length) {
      this._resolveHandler(this._messages);
    }

    this._messages.length = 0;
    this._timeoutId = null;
  }

}
