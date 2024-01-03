export interface ISender<T> {
  send(payload: T): Promise<void>;
}
