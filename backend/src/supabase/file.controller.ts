import { Controller, Get, Query, Res, BadRequestException, UseGuards } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { Response } from 'express';
import { decryptBuffer } from 'utils/encrypt';
import { JwtAuthGuard } from 'src/auth/strategies/guards/jwt-auth.guard';

@Controller('file')
export class FileController {
  constructor(private readonly supabaseService: SupabaseService) {}

    @Get('download')
    @UseGuards(JwtAuthGuard)
    async downloadFile(@Query('path') path: string, @Res() res: Response) {
        if (!path) {
        throw new BadRequestException('Path query parameter is required');
        }

        const fileBuffer = await this.supabaseService.downloadFile(path);

        // В первых 16 байтах IV
        const iv = fileBuffer.slice(0, 16);
        const encrypted = fileBuffer.slice(16);

        const decrypted = decryptBuffer(encrypted, iv);

        // Определяем content-type по расширению исходного файла
        // Можно парсить из имени в path
        if (path.endsWith('.pdf.enc')) res.setHeader('Content-Type', 'application/pdf');
        else if (path.endsWith('.jpg.enc') || path.endsWith('.jpeg.enc')) res.setHeader('Content-Type', 'image/jpeg');
        else if (path.endsWith('.png.enc')) res.setHeader('Content-Type', 'image/png');
        else res.setHeader('Content-Type', 'application/octet-stream');

        res.send(decrypted);
    }
}
