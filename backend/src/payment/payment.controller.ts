// produmus.controller.ts
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/guards/jwt-auth.guard';
import { OrdersService } from 'src/order/order.service';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly produmusService: PaymentService,
    private readonly ordersService: OrdersService
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createPayment(@Req() req: any, @Body() body: { orderId: string; amount: string }) {
    const userId = req.user.id; 
    const order = await this.ordersService.create(userId, body.amount);
   
    return await this.produmusService.generatePaymentData(userId, order.id, body.amount);
  }

  // @Post('callback')
  // async handleCallback(@Body() body: any, @Headers() headers) {
  //   return this.produmusService.handleCallback(body, headers);
  // }
}
