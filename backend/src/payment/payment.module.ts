import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';

import { OrdersService } from 'src/order/order.service';
import { PaymentController } from './payment.controller';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, OrdersService],
  exports: [PaymentService]
})
export class PaymentModule {}