import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from './supabase.service';
import slugify from 'slugify';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/strategies/guards/jwt-auth.guard';

@Controller('audio')
export class AudioController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('No file uploaded');
    }

    const originalName = file.originalname;
    const ext = path.extname(originalName); // .png
    const nameWithoutExt = path.basename(originalName, ext);

    const safeName = slugify(nameWithoutExt, {
      replacement: '_',
      remove: /[^a-zA-Z0-9_-]/g,  // точку здесь удаляем, чтобы не сломать имя
      lower: false,
      strict: true,
    });

    const safeFileName = safeName + ext;

    const supabase = this.supabaseService.getClient();

    const fileName = `audio/${Date.now()}_${safeFileName}`;

    const { error } = await supabase.storage
      .from('nanny-busket')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      throw new Error(`Upload error: ${error.message}`);
    }

    const { data: urlData, error: urlError } = await supabase.storage
      .from('nanny-busket')
      .createSignedUrl(fileName, 31536000);

    if (urlError) {
      console.error('Ошибка создания signed URL:', urlError);
      return;
    }

    return {
      message: 'Upload successful',
      path: urlData.signedUrl,
    };
  }

  @Get('file/:filename')
  @UseGuards(JwtAuthGuard)
  async getAudio(@Param('filename') filename: string) {
    const supabase = this.supabaseService.getClient();

    const { data } = supabase.storage
      .from('nanny-busket')
      .getPublicUrl(filename);

    if (!data?.publicUrl) {
      throw new NotFoundException('File not found');
    }

    return { url: data.publicUrl };
  }
}
