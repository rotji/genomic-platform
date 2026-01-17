import { IApiService } from './IApiService';
import { HttpApiService } from './HttpApiService';

// Singleton instance for production use
export const apiService: IApiService = new HttpApiService(import.meta.env.VITE_API_URL || 'http://localhost:3001');
