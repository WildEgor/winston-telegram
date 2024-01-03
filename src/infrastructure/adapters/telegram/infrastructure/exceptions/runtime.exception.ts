export class RuntimeException extends Error {
  constructor(msg?: string) {
    super(`Runtime exception: ${msg}`);
  }
}
