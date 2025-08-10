// sms.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private readonly apiId = process.env.SMS_RU_API_ID;
  private readonly apiUrl = 'https://sms.ru/sms/send';

  constructor(private readonly httpService: HttpService) {}

  async send(to: string, message: string): Promise<void> {
    try {
        console.log(message)
      const response$ = this.httpService.get(this.apiUrl, {
        params: {
          api_id: this.apiId,
          to,
          msg: message,
          json: 1,
        },
      });

      const { data } = await lastValueFrom(response$);

      console.log('SMS API response:', data);

      if (data.status !== 'OK') {
        this.logger.warn(`Ошибка при отправке SMS: ${data.status_text}`);
        throw new Error(`SMS failed: ${data.status_text}`);
      }

      this.logger.log(`SMS отправлено на ${to}`);
    } catch (error) {
      this.logger.error(`Ошибка HTTP-запроса: ${error.message}`);
      throw error;
    }
  }
}
