import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProdumusModule } from './produmus/produmus.module';
import { OrdersModule } from './order/order.module';
import { AudioController } from './supabase/audio.controller';
import { SupabaseService } from './supabase/supabase.service';
import { UploadController } from './supabase/upload.controller';
import { FileController } from './supabase/file.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    ProdumusModule,
    OrdersModule,
  ],
  controllers: [AudioController, UploadController, FileController],
  providers: [SupabaseService], 
})
export class AppModule {}