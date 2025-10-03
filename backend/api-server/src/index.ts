import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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

// File upload endpoint
app.post('/api/files/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    // Basic file metadata
    const fileMetadata = {
      id: Date.now().toString(),
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadedAt: new Date().toISOString(),
      path: req.file.path
    };

    // TODO: In future iterations, we'll add:
    // - Database storage of file metadata
    // - Blockchain registration
    // - File content analysis
    
    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        id: fileMetadata.id,
        name: fileMetadata.originalName,
        size: fileMetadata.size,
        type: fileMetadata.mimetype,
        uploadedAt: fileMetadata.uploadedAt,
        status: 'completed'
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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 API info: http://localhost:${PORT}/api`);
});