export class BotNotActiveException extends Error {
  constructor() {
    super(`Bot not active`);
  }
}
