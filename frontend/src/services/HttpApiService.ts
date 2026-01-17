import { IApiService } from './IApiService';

export class HttpApiService implements IApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async uploadFile(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${this.baseUrl}/api/files/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  }

  async getFiles(): Promise<any[]> {
    const response = await fetch(`${this.baseUrl}/api/files/list`, {
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch files');
    return response.json();
  }

  // Add more API methods as needed
}
