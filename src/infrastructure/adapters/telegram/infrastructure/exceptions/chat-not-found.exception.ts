export class ChatNotFoundException extends Error {
  constructor(chatId: string) {
    super(`Chat ${chatId} not found`);
  }
}
