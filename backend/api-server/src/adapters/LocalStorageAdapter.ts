import { IStorageAdapter } from './IStorageAdapter';
import fs from 'fs';
import path from 'path';

// Example local file system storage adapter
export class LocalStorageAdapter implements IStorageAdapter {
  private baseDir: string;

  constructor(baseDir: string) {
    this.baseDir = baseDir;
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
  }

  async uploadFile(file: Buffer, filename: string): Promise<string> {
    const filePath = path.join(this.baseDir, filename);
    await fs.promises.writeFile(filePath, file);
    return filePath;
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(this.baseDir, filename);
    await fs.promises.unlink(filePath);
  }

  async getFileUrl(filename: string): Promise<string> {
    // For local, just return the path; in production, return a public URL
    return path.join(this.baseDir, filename);
  }
}
