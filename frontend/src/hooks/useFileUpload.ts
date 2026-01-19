import { useState, useCallback } from 'react';
import type { UploadedFileResponse } from '../types/api';
import type { IApiService } from '../services/IApiService';
import { apiService } from '../services/apiService';
import toast from 'react-hot-toast';

export interface UploadFileState {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error' | 'validating';
  progress: number;
  error?: string;
  uploadedData?: UploadedFileResponse;
}

interface UseFileUploadReturn {
  uploadedFiles: UploadFileState[];
  isUploading: boolean;
  uploadFile: (file: File) => Promise<void>;
  removeFile: (fileId: string) => void;
  clearAllFiles: () => void;
}

export const useFileUpload = (api: IApiService = apiService): UseFileUploadReturn => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadFileState[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const generateFileId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  const uploadFile = useCallback(async (file: File): Promise<void> => {
    const fileId = generateFileId();
    
    // Create initial file state
    const uploadFileState: UploadFileState = {
      id: fileId,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading',
      progress: 0,
    };

    // Add file to state
    setUploadedFiles(prev => [...prev, uploadFileState]);
    setIsUploading(true);

    try {
      // Start upload with progress tracking
      const result = await api.uploadFile(file);
      console.log('[UPLOAD DEBUG] uploadFile result:', JSON.stringify(result, null, 2));
      // If you want progress tracking, extend IApiService and HttpApiService accordingly

      if (result.success && result.data) {
        // Update file state with successful upload
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'completed', 
                progress: 100,
                uploadedData: result.data
              }
            : f
        ));
        
        toast.success(`${file.name} uploaded successfully!`);
      } else {
        // Handle upload error
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'error', 
                error: result.error || 'Upload failed'
              }
            : f
        ));
        
        toast.error(`Failed to upload ${file.name}: ${result.error}`);
      }
    } catch (error) {
      // Handle unexpected errors
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { 
              ...f, 
              status: 'error', 
              error: error instanceof Error ? error.message : 'Unknown error'
            }
          : f
      ));
      
      toast.error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
    toast.success('File removed');
  }, []);

  const clearAllFiles = useCallback(() => {
    setUploadedFiles([]);
    toast.success('All files cleared');
  }, []);

  return {
    uploadedFiles,
    isUploading,
    uploadFile,
    removeFile,
    clearAllFiles,
  };
};