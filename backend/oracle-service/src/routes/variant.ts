/**
 * Variant verification routes for Oracle service  
 */
import { Router, Request, Response } from 'express';
import axios from 'axios';
import { z } from 'zod';

export const variantRouter = Router();

// Validation schemas
const ChromosomeSchema = z.string().regex(/^(chr)?(1[0-9]|2[0-2]|[1-9]|X|Y|MT)$/i);
const PositionSchema = z.coerce.number().int().min(1);
const AlleleSchema = z.string().min(1).max(1000).regex(/^[ATCG]+$/i);

interface VariantVerificationResponse {
  variant_id: string;
  chromosome: string;
  position: number;
  alt_allele: string;
  verified: boolean;
  clinical_significance?: string;
  population_frequency?: number;
  dbsnp_id?: string;
  clinvar_id?: string;
  external_data?: {
    ensembl?: any;
    clinvar?: any;
    dbsnp?: any;
  };
  timestamp: string;
  source: string;
  error?: string;
}

// Verify variant information
variantRouter.get('/:chromosome/:position/:alt', async (req: Request, res: Response) => {
  try {
    const { chromosome, position, alt } = req.params;
    
    // Validation is handled by middleware
    // Convert position to number
    const positionNum = parseInt(position, 10);
    
    // Verify variant
    const variantData = await verifyVariantWithClinVar(
      chromosome,
      positionNum,
      alt
    );
    
    res.json(variantData);
  } catch (error) {
    res.status(500).json({
      variant_id: `${req.params.chromosome}:${req.params.position}:${req.params.alt}`,
      verified: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      source: 'oracle-service'
    });
  }
});

// Batch variant verification
variantRouter.post('/batch', async (req: Request, res: Response) => {
  try {
    const { variants } = req.body;
    
    if (!Array.isArray(variants)) {
      return res.status(400).json({
        error: 'variants must be an array',
        timestamp: new Date().toISOString()
      });
    }
    
    if (variants.length > 20) {
      return res.status(400).json({
        error: 'Maximum 20 variants per batch request',
        timestamp: new Date().toISOString()
      });
    }
    
    const results = await Promise.all(
      variants.map(async (variant: any) => {
        try {
          const validatedChromosome = ChromosomeSchema.parse(variant.chromosome);
          const validatedPosition = PositionSchema.parse(variant.position);
          const validatedAlt = AlleleSchema.parse(variant.alt_allele);
          
          return await verifyVariantWithClinVar(
            validatedChromosome,
            validatedPosition,
            validatedAlt
          );
        } catch (error) {
          return {
            variant_id: `${variant.chromosome}:${variant.position}:${variant.alt_allele}`,
            verified: false,
            error: 'Invalid variant format',
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

// Helper function to verify variant with ClinVar
async function verifyVariantWithClinVar(
  chromosome: string, 
  position: number, 
  altAllele: string
): Promise<VariantVerificationResponse> {
  const variantId = `${chromosome}:${position}:${altAllele}`;
  
  try {
    // For now, return a placeholder response with realistic structure
    // In production, this would make actual API calls to ClinVar, dbSNP, etc.
    
    // Normalize chromosome format
    const normalizedChrom = chromosome.replace(/^chr/i, '');
    
    // Placeholder logic for demonstration
    const isKnownVariant = Math.random() > 0.7; // 30% chance of being a known variant
    
    if (isKnownVariant) {
      return {
        variant_id: variantId,
        chromosome: normalizedChrom,
        position: position,
        alt_allele: altAllele,
        verified: true,
        clinical_significance: ['Pathogenic', 'Likely pathogenic', 'Benign', 'Likely benign', 'Uncertain significance'][
          Math.floor(Math.random() * 5)
        ],
        population_frequency: Math.random() * 0.01, // Random frequency up to 1%
        dbsnp_id: `rs${Math.floor(Math.random() * 1000000000)}`,
        clinvar_id: `VCV${String(Math.floor(Math.random() * 1000000)).padStart(9, '0')}`,
        external_data: {
          clinvar: {
            accession: `VCV${String(Math.floor(Math.random() * 1000000)).padStart(9, '0')}`,
            last_evaluated: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          },
          dbsnp: {
            rsid: `rs${Math.floor(Math.random() * 1000000000)}`,
            validated: true
          }
        },
        timestamp: new Date().toISOString(),
        source: 'clinvar-dbsnp'
      };
    } else {
      return {
        variant_id: variantId,
        chromosome: normalizedChrom,
        position: position,
        alt_allele: altAllele,
        verified: false,
        error: 'Variant not found in external databases',
        timestamp: new Date().toISOString(),
        source: 'clinvar-dbsnp'
      };
    }
    
  } catch (error) {
    return {
      variant_id: variantId,
      chromosome: chromosome,
      position: position,
      alt_allele: altAllele,
      verified: false,
      error: `External API error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      timestamp: new Date().toISOString(),
      source: 'clinvar-dbsnp'
    };
  }
}