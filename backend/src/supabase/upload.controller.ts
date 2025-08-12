import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from './supabase.service';
import { encryptBuffer } from 'utils/encrypt';
import { JwtAuthGuard } from 'src/auth/strategies/guards/jwt-auth.guard';
import { slugify } from 'transliteration';

@Controller('upload')
export class UploadController {
  constructor(private readonly supabaseService: SupabaseService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(JwtAuthGuard)
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
        throw new BadRequestException('File is required');
        }

        const originalName = slugify(file.originalname, { lowercase: false }) as any;

        const { encrypted, iv } = encryptBuffer(file.buffer);

        const encryptedWithIv = Buffer.concat([iv, encrypted]);

        const path = `encrypted/${Date.now()}_${originalName}.enc`;

        await this.supabaseService.uploadFile(path, encryptedWithIv, 'application/octet-stream');

        return {
            message: 'File uploaded and encrypted',
            path,
        };
    }
}
