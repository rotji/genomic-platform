/**
 * Security middleware for Oracle service
 * Protects against common attacks including prompt injection, XSS, SQL injection, etc.
 */
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// Initialize DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window as any);

// Dangerous patterns that could indicate prompt injection or malicious content
const DANGEROUS_PATTERNS = [
  // Prompt injection attempts
  /ignore\s+(previous|above|all)\s+(instructions?|commands?|prompts?)/i,
  /forget\s+(everything|all|previous)/i,
  /system\s*:\s*you\s+(are|must|should|will)/i,
  /(?:^|\s)(?:jailbreak|roleplay|pretend|act\s+as)/i,
  
  // Code injection patterns
  /<script[\s\S]*?>[\s\S]*?<\/script>/i,
  /javascript\s*:/i,
  /on\w+\s*=\s*["'][^"']*["']/i,
  /eval\s*\(/i,
  /Function\s*\(/i,
  
  // SQL injection patterns
  /(\bor\b|\band\b)\s+\d+\s*=\s*\d+/i,
  /union\s+select/i,
  /drop\s+table/i,
  /delete\s+from/i,
  /insert\s+into/i,
  
  // Path traversal
  /\.\.\/|\.\.\\|\.\.\%2f|\.\.\%5c/i,
  
  // Command injection
  /[;&|`$(){}]/,
  /\b(cat|ls|dir|type|copy|move|del|rm|mkdir|rmdir)\b/i
];

// Validation schemas
const GeneSymbolSchema = z.string()
  .min(1)
  .max(20)
  .regex(/^[A-Z0-9-]+$/i, 'Invalid gene symbol format');

const ChromosomeSchema = z.string()
  .regex(/^(chr)?(1[0-9]|2[0-2]|[1-9]|X|Y|MT)$/i, 'Invalid chromosome format');

const PositionSchema = z.coerce.number()
  .int()
  .min(1)
  .max(300000000, 'Position exceeds chromosome length');

const AlleleSchema = z.string()
  .min(1)
  .max(1000)
  .regex(/^[ATCGN]+$/i, 'Invalid nucleotide sequence');

// Rate limiting configurations
export const createRateLimiter = (windowMs: number, max: number, message: string) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: 'Rate limit exceeded',
      message,
      timestamp: new Date().toISOString()
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// General rate limiter
export const generalLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // limit each IP to 100 requests per windowMs
  'Too many requests from this IP, please try again later'
);

// Strict limiter for analysis endpoints
export const analysisLimiter = createRateLimiter(
  5 * 60 * 1000, // 5 minutes
  10, // limit each IP to 10 analysis requests per 5 minutes
  'Too many analysis requests, please wait before trying again'
);

// Input sanitization middleware
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Recursively sanitize all string inputs
    const sanitizeObject = (obj: any): any => {
      if (typeof obj === 'string') {
        // Remove dangerous patterns
        let sanitized = obj;
        DANGEROUS_PATTERNS.forEach(pattern => {
          sanitized = sanitized.replace(pattern, '***BLOCKED***');
        });
        
        // HTML sanitization
        sanitized = purify.sanitize(sanitized, { 
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: []
        });
        
        // Additional cleanup
        sanitized = sanitized
          .replace(/[<>'"]/g, '') // Remove common XSS characters
          .trim()
          .substring(0, 10000); // Limit length
        
        return sanitized;
      } else if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
      } else if (obj && typeof obj === 'object') {
        const sanitizedObj: any = {};
        for (const [key, value] of Object.entries(obj)) {
          const sanitizedKey = key.replace(/[^a-zA-Z0-9_-]/g, '');
          sanitizedObj[sanitizedKey] = sanitizeObject(value);
        }
        return sanitizedObj;
      }
      return obj;
    };

    // Sanitize request body, query, and params
    if (req.body) req.body = sanitizeObject(req.body);
    if (req.query) req.query = sanitizeObject(req.query);
    if (req.params) req.params = sanitizeObject(req.params);

    next();
  } catch (error) {
    res.status(400).json({
      error: 'Invalid input detected',
      message: 'Request contains potentially malicious content',
      timestamp: new Date().toISOString()
    });
  }
};

// Malicious content detection middleware
export const detectMaliciousContent = (req: Request, res: Response, next: NextFunction) => {
  try {
    const checkForMaliciousContent = (text: string): boolean => {
      return DANGEROUS_PATTERNS.some(pattern => pattern.test(text));
    };

    const allContent = JSON.stringify({
      body: req.body,
      query: req.query,
      params: req.params
    });

    if (checkForMaliciousContent(allContent)) {
      // Log the attempt
      console.warn(`Malicious content detected from IP ${req.ip}:`, {
        url: req.url,
        method: req.method,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString()
      });

      return res.status(400).json({
        error: 'Malicious content detected',
        message: 'Request blocked due to security policy violation',
        timestamp: new Date().toISOString()
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      error: 'Security validation failed',
      timestamp: new Date().toISOString()
    });
  }
};

// Genomic data validation middleware
export const validateGenomicInput = {
  geneSymbol: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { symbol } = req.params;
      GeneSymbolSchema.parse(symbol);
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Invalid gene symbol',
        message: 'Gene symbol must be 1-20 characters, alphanumeric with hyphens only',
        timestamp: new Date().toISOString()
      });
    }
  },

  variant: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chromosome, position, alt } = req.params;
      ChromosomeSchema.parse(chromosome);
      PositionSchema.parse(position);
      AlleleSchema.parse(alt);
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Invalid variant format',
        message: 'Variant parameters must follow genomic standards',
        timestamp: new Date().toISOString()
      });
    }
  }
};

// Request logging middleware for security monitoring
export const securityLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  // Log the request
  console.log(`Security Log: ${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    contentType: req.get('Content-Type'),
    contentLength: req.get('Content-Length'),
    timestamp: new Date().toISOString()
  });

  // Log the response
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    console.log(`Response: ${res.statusCode} in ${responseTime}ms`, {
      url: req.url,
      ip: req.ip,
      timestamp: new Date().toISOString()
    });
  });

  next();
};

// CORS security configuration
export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:3001'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  maxAge: 86400 // 24 hours
};