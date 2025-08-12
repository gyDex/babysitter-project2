// supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL as any,
      process.env.SUPABASE_SERVICE_ROLE_KEY as any,
    );
  }

  async uploadFile(path: string, fileBuffer: Buffer, contentType: string) {
    const { data, error } = await this.supabase.storage
      .from('files')
      .upload(path, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async downloadFile(path: string): Promise<Buffer> {
    const { data, error } = await this.supabase.storage.from('files').download(path);
    console.log(data)

    if (error || !data) {
      throw new Error(error?.message || 'File not found');
    }
    return Buffer.from(await data.arrayBuffer());
  }

  getClient() {
    return this.supabase;
  }
}
