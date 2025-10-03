/**
 * API Client for Genomic Platform
 * Handles all communication between frontend and backend services
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: string;
}

export interface UploadedFileResponse {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  status: 'uploading' | 'completed' | 'error';
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to connect to API server',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Upload a single file
   */
  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<UploadedFileResponse>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();

      return new Promise((resolve) => {
        // Set up progress tracking
        if (onProgress) {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const progress = Math.round((event.loaded / event.total) * 100);
              onProgress(progress);
            }
          });
        }

        // Set up response handling
        xhr.addEventListener('load', () => {
          try {
            const response = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve({
                success: true,
                data: response.file,
                message: response.message
              });
            } else {
              resolve({
                success: false,
                error: response.error || 'Upload failed',
                details: response.details
              });
            }
          } catch (error) {
            resolve({
              success: false,
              error: 'Failed to parse server response',
              details: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        });

        xhr.addEventListener('error', () => {
          resolve({
            success: false,
            error: 'Network error during upload',
            details: 'Failed to connect to server'
          });
        });

        xhr.addEventListener('timeout', () => {
          resolve({
            success: false,
            error: 'Upload timeout',
            details: 'Request took too long to complete'
          });
        });

        // Configure and send request
        xhr.open('POST', `${this.baseUrl}/api/files/upload`);
        xhr.timeout = 300000; // 5 minutes timeout
        xhr.send(formData);
      });

    } catch (error) {
      return {
        success: false,
        error: 'Failed to prepare upload',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get API information
   */
  async getApiInfo(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to get API information',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for custom instances
export default ApiClient;