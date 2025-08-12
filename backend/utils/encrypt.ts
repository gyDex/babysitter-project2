import * as crypto from 'crypto';


const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');

export function encryptBuffer(buffer: Buffer): { encrypted: Buffer; iv: Buffer } {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return { encrypted, iv };
}

export function decryptBuffer(encrypted: Buffer, iv: Buffer): Buffer {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}