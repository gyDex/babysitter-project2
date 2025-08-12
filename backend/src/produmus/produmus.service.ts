import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class ProdumusService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  generateSignature(params: Record<string, string>): string {
    const stringToSign = `${params.order_id}:${params.amount}`;
    const secretKey = this.configService.get<string>('PRODUMUS_SECRET_KEY');
    if (!secretKey) {
      throw new Error('secretKey отсутствует');
    }

    console.log('secretKey отсутствует')

    return crypto.createHmac('sha256', secretKey).update(stringToSign).digest('hex');
  }

  async handleCallback(body: any) {
    const { order_id, amount, signature, status } = body;

    console.log(body)

    // Проверяем подпись
    const expectedSignature = this.generateSignature({ order_id, amount });
    if (signature !== expectedSignature) {
      throw new BadRequestException('Invalid signature');
    }

    // Проверяем статус оплаты (например, 'paid' или 'success')
    if (status === 'paid' || status === 'success') {
      // Обновляем статус заказа в базе
      await this.prisma.order.update({
        where: { id: order_id },
        data: { 
          status: 'PAID',
         },
      });

      console.log(`Заказ ${order_id} оплачен успешно`);
      return { status: 'ok' };
    }

    // Если статус другой — можно обработать по-другому или игнорировать
    return { status: 'ignored' };
  }
}
