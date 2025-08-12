import { Module } from "@nestjs/common";
import { OrdersController } from "./order.controller";
import { OrdersService } from "./order.service";
import { ProdumusModule } from "src/produmus/produmus.module";

@Module({
  controllers: [OrdersController],
  providers: [OrdersService], // только сервисы здесь
  imports: [ProdumusModule],  // модули импортируются тут
  exports: [OrdersService],
})
export class OrdersModule {}
