import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ProdumusService } from './produmus.service';

@Controller('payment')
export class ProdumusController {
  constructor(private readonly produmusService: ProdumusService) {}

  @Post('callback')
  async handleCallback(@Body() body: any) {
    return this.produmusService.handleCallback(body);
  }
} 