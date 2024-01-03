import axios, { AxiosError } from 'axios';
import { ITelegramAdapter, ITelegramRequestPayload } from '../infrastructure/interfaces/telegram-adapter.interfaces';

export class TelegramAdapter implements ITelegramAdapter {

  private readonly _baseUrl: string = 'https://api.telegram.org';
  private readonly _defaultParseMode = 'Markdown';

  public async send(payload: ITelegramRequestPayload): Promise<void> {
    try {
      const requestBody = {
        text: payload.text,
        chat_id: payload.chat_id,
        disable_notification: payload.disable_notification,
        parse_mode: this._defaultParseMode,
      };

      if (payload.parse_mode) {
        requestBody.parse_mode = payload.parse_mode;
      }

      await axios.post(`${this._baseUrl}/bot${payload.token}/sendMessage`, requestBody);
    }
    catch (e: unknown) {
      // TODO: map to domain error
      if (e instanceof AxiosError) {
        console.error(e.response?.data);
      }
      else if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }

}
