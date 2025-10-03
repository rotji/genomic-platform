/**
 * Genomic Platform - Oracle Service
 * TypeScript microservice for external genomic data verification and blockchain integration
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createLogger, format, transports } from 'winston';

// Import our custom modules
import { healthRouter } from './routes/health';
import { geneRouter } from './routes/gene';
import { variantRouter } from './routes/variant';
import { blockchainRouter } from './blockchain/routes';

// Import security middleware
import { 
  generalLimiter, 
  analysisLimiter, 
  sanitizeInput, 
  detectMaliciousContent,
  validateGenomicInput,
  securityLogger,
  corsOptions
} from './middleware/security';

// Load environment variables
dotenv.config();

// Initialize logger
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
});

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3002;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

app.use(cors(corsOptions));

// Rate limiting
app.use('/gene', analysisLimiter);
app.use('/variant', analysisLimiter);
app.use(generalLimiter);

// Security logging
app.use(securityLogger);

// Input sanitization and malicious content detection
app.use(sanitizeInput);
app.use(detectMaliciousContent);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// Routes with additional validation
app.use('/health', healthRouter);
app.use('/gene/:symbol', validateGenomicInput.geneSymbol);
app.use('/variant/:chromosome/:position/:alt', validateGenomicInput.variant);
app.use('/gene', geneRouter);
app.use('/variant', variantRouter);
app.use('/blockchain', blockchainRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Genomic Platform Oracle Service',
    description: 'External data verification and blockchain integration service',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      gene: '/gene/:symbol',
      variant: '/variant/:chromosome/:position/:alt',
      blockchain: '/blockchain/*'
    },
    supported_databases: [
      'NCBI Entrez',
      'ClinVar', 
      'Ensembl',
      'dbSNP'
    ],
    blockchain: 'Stacks Network'
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Endpoint ${req.method} ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🔮 Oracle Service running on port ${PORT}`);
  logger.info(`📡 External database connections: Ready`);
  logger.info(`⛓️  Stacks blockchain integration: Ready`);
  logger.info(`📚 API documentation: http://localhost:${PORT}/`);
});

export default app;