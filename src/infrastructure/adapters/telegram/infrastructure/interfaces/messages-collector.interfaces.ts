export type TMessagesDrainHandlerFn = <T>(messages: T[]) => void;

export interface IMessagesCollectorOpts {
  timeout: number;
}

export interface IMessageCollector<T> {
  cache(message: T): void;
  onDrained(handler: TMessagesDrainHandlerFn): void;
}
