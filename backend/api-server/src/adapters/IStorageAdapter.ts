// Interface for file storage operations
export interface IStorageAdapter {
  uploadFile(file: Buffer, filename: string): Promise<string>; // returns URL or path
  deleteFile(filename: string): Promise<void>;
  getFileUrl(filename: string): Promise<string>;
  // Add more methods as needed
}
