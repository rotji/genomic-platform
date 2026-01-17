import { StorageService } from './services/storageService';
import { LocalStorageAdapter } from './adapters/LocalStorageAdapter';
import path from 'path';
import fs from 'fs';
// Set up uploads directory before using it
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
// Set up storage service with local adapter
const storageAdapter = new LocalStorageAdapter(uploadsDir);
const storageService = new StorageService(storageAdapter);
import { authenticateMiddleware } from './middleware/auth';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import multer from 'multer';
// ...existing code...
import crypto from 'crypto';
import { testDatabaseConnection, FileMetadata } from './database';
import { DatabaseService } from './services/databaseService';
import { MongoDatabaseAdapter } from './adapters/MongoDatabaseAdapter';
// TODO: Replace with real MongoDB connection
const mongoDb = { collection: () => ({ findOne: async () => ({}), insertOne: async () => ({}) }) };
const dbAdapter = new MongoDatabaseAdapter(mongoDb);
const databaseService = new DatabaseService(dbAdapter);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ...existing code...

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024 * 1024, // 200GB
  },
  fileFilter: (req, file, cb) => {
    // Allowed extensions
    const allowedExtensions = ['.txt', '.fasta', '.fastq', '.fa', '.fq', '.bam', '.sam', '.csv', '.vcf'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed. Supported formats: ${allowedExtensions.join(', ')}`));
    }
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Genomic Platform API Server is running',
    timestamp: new Date().toISOString(),
    service: 'api-server',
    version: '1.0.0'
  });
});

// File upload endpoint with authentication middleware (now using DatabaseService)
app.post('/api/files/upload', authenticateMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    // Save file to storage using StorageService
    const fileBuffer = fs.readFileSync(req.file.path);
    const savedPath = await storageService.uploadFile(fileBuffer, req.file.filename);

    // Generate file hash for integrity checking
    const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    // Extract file extension
    const fileExtension = path.extname(req.file.originalname).toLowerCase();

    // Prepare file metadata for database
    const fileMetadata: FileMetadata = {
      original_name: req.file.originalname,
      stored_filename: req.file.filename,
      file_path: savedPath,
      file_size: req.file.size,
      mime_type: req.file.mimetype,
      file_extension: fileExtension,
      file_hash: fileHash,
      upload_status: 'completed'
    };

    // Save file metadata to database (replace with real method as you refactor)
    await databaseService.saveUser(fileMetadata); // Example usage, adjust as needed

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype,
        hash: fileHash,
        uploadedAt: new Date().toISOString(),
        status: 'completed',
        databaseSaved: true
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'File upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Basic API info endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Genomic Platform API',
    description: 'Blockchain-first genomic analysis API with Stacks.js integration',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      upload: 'POST /api/files/upload'
    }
  });
});

// Start server with database connection test
app.listen(PORT, async () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 API info: http://localhost:${PORT}/api`);
  
  // Test database connection
  console.log('🔍 Testing database connection...');
  const dbConnected = await testDatabaseConnection();
  if (dbConnected) {
    console.log('✅ Database ready for operations');
  } else {
    console.log('❌ Database connection failed - check your Supabase configuration');
  }
});