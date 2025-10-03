import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Supabase client for API operations
export const supabase: SupabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Admin client for server-side operations (with service key)
export const supabaseAdmin: SupabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY!
);

// Database connection test
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Database connection error:', error);
      return false;
    }
    
    console.log('✅ Supabase database connected successfully');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// File metadata interface
export interface FileMetadata {
  id?: string;
  user_id?: string;
  original_name: string;
  stored_filename: string;
  file_path: string;
  file_size: number;
  mime_type?: string;
  file_extension?: string;
  file_hash?: string;
  upload_status?: string;
}

// Database operations for files
export class FileDatabase {
  
  // Save file metadata to database
  static async saveFileMetadata(metadata: FileMetadata): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      console.log('🔄 Saving file metadata to database:', metadata.original_name);
      
      const { data, error } = await supabase
        .from('files')
        .insert([{
          user_id: null, // Allow null for now (will add user system later)
          original_name: metadata.original_name,
          stored_filename: metadata.stored_filename,
          file_path: metadata.file_path,
          file_size: metadata.file_size,
          mime_type: metadata.mime_type,
          file_extension: metadata.file_extension,
          file_hash: metadata.file_hash,
          upload_status: metadata.upload_status || 'completed'
        }])
        .select()
        .single();

      if (error) {
        console.error('❌ Error saving file metadata:', error);
        return { success: false, error: error.message };
      }

      console.log('✅ File metadata saved successfully:', data.id);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Database error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown database error' 
      };
    }
  }

  // Get file metadata by ID
  static async getFileById(fileId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('id', fileId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Get all files for a user
  static async getUserFiles(userId: string): Promise<{ success: boolean; data?: any[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  // Update file status
  static async updateFileStatus(fileId: string, status: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('files')
        .update({ upload_status: status, updated_at: new Date().toISOString() })
        .eq('id', fileId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

export default { supabase, supabaseAdmin, testDatabaseConnection, FileDatabase };