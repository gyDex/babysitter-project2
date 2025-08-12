import { Controller, Post, Body, InternalServerErrorException, UseGuards, Req } from '@nestjs/common';
import { ProdumusService } from 'src/produmus/produmus.service';
import { OrdersService } from './order.service';
import { JwtAuthGuard } from 'src/auth/strategies/guards/jwt-auth.guard';


@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private produmusService: ProdumusService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createOrder(@Req() req: any, @Body() body: { userId: string; amount: string }) {
    try
    {
      const userId = req.user.id; 
      const order = await this.ordersService.create(body.userId, body.amount);

      console.log('order', order)
  
      const paymentData = this.produmusService.generateSignature({
        order: order.id,
        amount: body.amount.toString()
      });
  
      return {
        paymentData,
        order_id: order.id,
      };
    }
    catch (error) {
        console.log(error)

        if (error.code === '42P01') {
            throw new InternalServerErrorException('Database configuration error');
        }

        throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}