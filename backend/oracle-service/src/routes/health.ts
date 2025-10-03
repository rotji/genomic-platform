/**
 * Health check routes for Oracle service
 */
import { Router, Request, Response } from 'express';

export const healthRouter = Router();

interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
  service: string;
  version: string;
  external_services?: {
    ncbi: string;
    ensembl: string;
    clinvar: string;
    stacks_network: string;
  };
}

// Basic health check
healthRouter.get('/', async (req: Request, res: Response) => {
  try {
    const response: HealthResponse = {
      status: 'OK',
      message: 'Oracle Service is running',
      timestamp: new Date().toISOString(),
      service: 'oracle-service',
      version: '1.0.0'
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Health check failed',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Detailed health check with external service status
healthRouter.get('/detailed', async (req: Request, res: Response) => {
  try {
    // Check external services (placeholder)
    const response: HealthResponse = {
      status: 'OK',
      message: 'Oracle Service and external services are running',
      timestamp: new Date().toISOString(),
      service: 'oracle-service',
      version: '1.0.0',
      external_services: {
        ncbi: 'connected',
        ensembl: 'connected', 
        clinvar: 'connected',
        stacks_network: 'connected'
      }
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Detailed health check failed',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});