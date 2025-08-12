import { Module } from '@nestjs/common';
import { ProdumusService } from './produmus.service';
import { ProdumusController } from './produmus.controller';
import { OrdersService } from 'src/order/order.service';

@Module({
  controllers: [ProdumusController],
  providers: [ProdumusService, OrdersService],
  exports: [ProdumusService]
})
export class ProdumusModule {}