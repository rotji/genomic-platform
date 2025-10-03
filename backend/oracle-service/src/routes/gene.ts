/**
 * Gene verification routes for Oracle service
 */
import { Router, Request, Response } from 'express';
import axios from 'axios';
import { z } from 'zod';

export const geneRouter = Router();

// Validation schemas
const GeneSymbolSchema = z.string().min(1).max(20).regex(/^[A-Z0-9-]+$/i);

interface GeneVerificationResponse {
  gene_symbol: string;
  verified: boolean;
  ncbi_gene_id?: string;
  official_symbol?: string;
  description?: string;
  chromosome?: string;
  map_location?: string;
  gene_type?: string;
  synonyms?: string[];
  external_ids?: {
    ensembl?: string;
    hgnc?: string;
    omim?: string;
  };
  timestamp: string;
  source: string;
  error?: string;
}

// Verify gene annotation through NCBI
geneRouter.get('/:symbol', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params;
    
    // Additional validation is handled by middleware
    // Search NCBI Gene database
    const geneData = await verifyGeneWithNCBI(symbol);
    
    res.json(geneData);
  } catch (error) {
    res.status(500).json({
      gene_symbol: req.params.symbol,
      verified: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      source: 'oracle-service'
    });
  }
});

// Additional route for batch gene verification
geneRouter.post('/batch', async (req: Request, res: Response) => {
  try {
    const { gene_symbols } = req.body;
    
    if (!Array.isArray(gene_symbols)) {
      return res.status(400).json({
        error: 'gene_symbols must be an array',
        timestamp: new Date().toISOString()
      });
    }
    
    if (gene_symbols.length > 50) {
      return res.status(400).json({
        error: 'Maximum 50 genes per batch request',
        timestamp: new Date().toISOString()
      });
    }
    
    const results = await Promise.all(
      gene_symbols.map(async (symbol: string) => {
        try {
          const validatedSymbol = GeneSymbolSchema.parse(symbol);
          return await verifyGeneWithNCBI(validatedSymbol);
        } catch (error) {
          return {
            gene_symbol: symbol,
            verified: false,
            error: 'Invalid gene symbol format',
            timestamp: new Date().toISOString(),
            source: 'oracle-service'
          };
        }
      })
    );
    
    res.json({
      batch_results: results,
      total_processed: results.length,
      verified_count: results.filter(r => r.verified).length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

// Helper function to verify gene with NCBI
async function verifyGeneWithNCBI(geneSymbol: string): Promise<GeneVerificationResponse> {
  try {
    // NCBI E-utilities API for gene search
    const searchUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
    const searchParams = {
      db: 'gene',
      term: `${geneSymbol}[Gene Name] AND Homo sapiens[Organism]`,
      retmode: 'json',
      retmax: 1
    };
    
    const searchResponse = await axios.get(searchUrl, { 
      params: searchParams,
      timeout: 10000
    });
    
    if (searchResponse.data.esearchresult?.idlist?.length > 0) {
      const geneId = searchResponse.data.esearchresult.idlist[0];
      
      // Get detailed gene information
      const summaryUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi';
      const summaryParams = {
        db: 'gene',
        id: geneId,
        retmode: 'json'
      };
      
      const summaryResponse = await axios.get(summaryUrl, { 
        params: summaryParams,
        timeout: 10000
      });
      
      const geneInfo = summaryResponse.data.result?.[geneId];
      
      if (geneInfo) {
        return {
          gene_symbol: geneSymbol,
          verified: true,
          ncbi_gene_id: geneId,
          official_symbol: geneInfo.name || geneSymbol,
          description: geneInfo.description || 'No description available',
          chromosome: geneInfo.chromosome || 'Unknown',
          map_location: geneInfo.maplocation || 'Unknown',
          gene_type: geneInfo.genetypelist || 'Unknown',
          synonyms: geneInfo.otheraliases ? geneInfo.otheraliases.split(', ') : [],
          external_ids: {
            ensembl: geneInfo.genomicinfo?.[0]?.chraccver || undefined,
            hgnc: undefined, // Would need additional API call
            omim: undefined  // Would need additional API call
          },
          timestamp: new Date().toISOString(),
          source: 'ncbi-gene'
        };
      }
    }
    
    // Gene not found
    return {
      gene_symbol: geneSymbol,
      verified: false,
      error: 'Gene not found in NCBI database',
      timestamp: new Date().toISOString(),
      source: 'ncbi-gene'
    };
    
  } catch (error) {
    return {
      gene_symbol: geneSymbol,
      verified: false,
      error: `NCBI API error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      timestamp: new Date().toISOString(),
      source: 'ncbi-gene'
    };
  }
}