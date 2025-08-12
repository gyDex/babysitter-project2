// Payment.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,        
  ) {}

  async generatePaymentData(userId: string, orderId: string, amount: string) {
    const baseUrl = 'https://nanny.payform.ru/';

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
         phone: true,
      }
    })

    const params = new URLSearchParams({
      do: 'pay',
      order_id: orderId,
      customer_phone: user?.phone as string, // сюда можно вставить телефон, если есть
      'products[0][name]': 'Подписка',
      'products[0][price]': amount,
      'products[0][quantity]': '1',
      'products[0][urlSuccess]': 'http://localhost:3000/',
      'products[0][urlReturn]': 'http://localhost:3000/auth',
      customer_extra: 'Описание заказа',
    });

    const paymentLink = `${baseUrl}?${params.toString()}`;

    return {
      paymentLink,
    };
  }
}
