// Interface for API service
export interface IApiService {
  uploadFile(file: File): Promise<any>;
  getFiles(): Promise<any[]>;
  // Add more API methods as needed
}
