import type { 
  MedicalAnalysisResult, 
  ResearchAnalysisResult, 
  AIGenerationResult, 
  BlockchainResult,
  ComprehensiveAnalysisReport
} from '../types/analysisResults';

// Generate realistic sample data for all analysis types

export const generateMedicalAnalysisResult = (): MedicalAnalysisResult => ({
  metadata: {
    id: 'med_' + Math.random().toString(36).substr(2, 9),
    userId: 'user_' + Math.random().toString(36).substr(2, 6),
    fileName: 'patient_wes_sample.vcf',
    fileType: 'VCF',
    fileSize: 45678901,
    uploadDate: '2025-09-25T10:30:00Z',
    analysisDate: '2025-09-25T11:45:00Z',
    processingTime: 4500,
    status: 'completed',
    platform: 'Web3 Genomic Platform',
    blockchainTxId: '0x742d35cc6e...',
    nftTokenId: 'GENOME-001234'
  },
  type: 'medical_report',
  patient: {
    id: 'patient_789',
    age: 34,
    gender: 'F',
    ethnicity: 'European'
  },
  findings: {
    pathogenic: [
      {
        chromosome: 'chr17',
        position: 43094692,
        referenceAllele: 'G',
        alternateAllele: 'A',
        gene: 'BRCA1',
        transcript: 'NM_007294.3',
        consequence: 'missense_variant',
        clinicalSignificance: 'Pathogenic',
        dbSNP: 'rs80357382',
        clinVar: 'RCV000077659',
        frequency: {
          gnomAD: 0.000012,
          exAC: 0.000008,
          esp: 0.000005
        },
        predictions: {
          sift: 0.01,
          polyphen: 0.99,
          cadd: 34.2
        }
      }
    ],
    likelyPathogenic: [
      {
        chromosome: 'chr13',
        position: 32914437,
        referenceAllele: 'T',
        alternateAllele: 'C',
        gene: 'BRCA2',
        transcript: 'NM_000059.3',
        consequence: 'missense_variant',
        clinicalSignificance: 'Likely Pathogenic',
        dbSNP: 'rs56387033',
        clinVar: 'RCV000077660',
        frequency: {
          gnomAD: 0.000023,
          exAC: 0.000019,
          esp: 0.000015
        },
        predictions: {
          sift: 0.02,
          polyphen: 0.95,
          cadd: 28.7
        }
      }
    ],
    variantOfUncertainSignificance: [],
    benign: [],
    likelyBenign: []
  },
  drugInteractions: [
    {
      drug: 'Warfarin',
      gene: 'CYP2C9',
      variant: 'CYP2C9*3',
      effect: 'poor_metabolizer',
      recommendation: 'Reduce initial dose by 50%. Monitor INR closely.',
      evidence: 'PharmGKB Level 1A',
      source: 'CPIC Guidelines'
    },
    {
      drug: 'Clopidogrel',
      gene: 'CYP2C19',
      variant: 'CYP2C19*2',
      effect: 'poor_metabolizer',
      recommendation: 'Consider alternative antiplatelet therapy.',
      evidence: 'FDA Black Box Warning',
      source: 'FDA Label'
    }
  ],
  diseaseRisks: [
    {
      disease: 'Breast Cancer',
      riskScore: 8.7,
      populationAverage: 2.1,
      riskLevel: 'very_high',
      confidence: 0.92,
      associatedVariants: ['BRCA1:c.181T>G', 'BRCA2:c.7436T>C'],
      description: 'Significantly elevated risk due to pathogenic BRCA1/2 variants'
    },
    {
      disease: 'Ovarian Cancer',
      riskScore: 6.3,
      populationAverage: 1.3,
      riskLevel: 'high',
      confidence: 0.88,
      associatedVariants: ['BRCA1:c.181T>G'],
      description: 'Elevated risk associated with BRCA1 pathogenic variant'
    }
  ],
  recommendations: [
    {
      category: 'monitoring',
      priority: 'high',
      recommendation: 'Annual MRI screening starting at age 25',
      rationale: 'Pathogenic BRCA1 variant confers high breast cancer risk',
      evidence: 'NCCN Guidelines v3.2024'
    },
    {
      category: 'genetic_counseling',
      priority: 'high',
      recommendation: 'Genetic counseling for patient and family members',
      rationale: 'Hereditary cancer syndrome with autosomal dominant inheritance',
      evidence: 'ACMG/AMP Guidelines'
    }
  ],
  qualityMetrics: {
    overall: 'excellent',
    sequencingDepth: 127.3,
    coverage: {
      mean: 98.7,
      median: 99.2,
      uniformity: 94.5
    },
    qualityScores: {
      q20: 97.8,
      q30: 94.2,
      meanQuality: 38.4
    },
    contamination: {
      level: 0.012,
      sources: []
    },
    completeness: 99.1,
    accuracy: 99.8
  }
});

export const generateResearchAnalysisResult = (): ResearchAnalysisResult => ({
  metadata: {
    id: 'res_' + Math.random().toString(36).substr(2, 9),
    userId: 'researcher_' + Math.random().toString(36).substr(2, 6),
    fileName: 'tumor_rnaseq_samples.fastq',
    fileType: 'FASTQ',
    fileSize: 12345678901,
    uploadDate: '2025-09-24T14:15:00Z',
    analysisDate: '2025-09-24T16:30:00Z',
    processingTime: 8100,
    status: 'completed',
    platform: 'Web3 Genomic Platform',
    blockchainTxId: '0x8a3f2c9e...',
    nftTokenId: 'RESEARCH-005678'
  },
  type: 'rna_seq',
  statistics: {
    totalReads: 45678912,
    mappedReads: 43256789,
    mappingRate: 94.7,
    meanCoverage: 67.8,
    variants: {
      snvs: 3456,
      indels: 234,
      structural: 12
    }
  },
  qualityControl: {
    passedFilters: true,
    warnings: ['Low coverage in 2% of target regions'],
    errors: []
  },
  annotations: [
    {
      gene: 'TP53',
      chromosome: 'chr17',
      start: 7571720,
      end: 7590868,
      strand: '-',
      biotype: 'protein_coding',
      description: 'Tumor protein p53',
      variants: 3,
      expression: {
        tpm: 156.7,
        fpkm: 134.2,
        rawCounts: 2834
      }
    },
    {
      gene: 'BRCA1',
      chromosome: 'chr17',
      start: 43044295,
      end: 43125364,
      strand: '-',
      biotype: 'protein_coding',
      description: 'BRCA1 DNA repair associated',
      variants: 1,
      expression: {
        tpm: 78.3,
        fpkm: 67.1,
        rawCounts: 1456
      }
    }
  ],
  pathways: [
    {
      pathway: 'p53 signaling pathway',
      database: 'KEGG',
      pValue: 2.3e-8,
      adjustedPValue: 1.2e-6,
      geneCount: 23,
      enrichmentScore: 4.7,
      genes: ['TP53', 'MDM2', 'CDKN1A', 'BAX', 'PUMA']
    },
    {
      pathway: 'DNA damage response',
      database: 'Reactome',
      pValue: 1.8e-7,
      adjustedPValue: 4.5e-6,
      geneCount: 31,
      enrichmentScore: 3.9,
      genes: ['BRCA1', 'BRCA2', 'ATM', 'CHEK2', 'RAD51']
    }
  ],
  comparativeAnalysis: {
    controlGroup: 'Normal Tissue',
    testGroup: 'Tumor Tissue',
    differentiallyExpressed: {
      upregulated: 1234,
      downregulated: 987,
      significant: 2221
    },
    topUpregulated: [
      {
        gene: 'MYC',
        logFoldChange: 3.7,
        pValue: 1.2e-15,
        adjustedPValue: 3.4e-13,
        baseMean: 1567.8
      },
      {
        gene: 'VEGFA',
        logFoldChange: 2.9,
        pValue: 4.5e-12,
        adjustedPValue: 7.8e-11,
        baseMean: 987.3
      }
    ],
    topDownregulated: [
      {
        gene: 'CDKN2A',
        logFoldChange: -4.2,
        pValue: 2.1e-18,
        adjustedPValue: 1.2e-16,
        baseMean: 234.7
      },
      {
        gene: 'RB1',
        logFoldChange: -3.1,
        pValue: 8.9e-14,
        adjustedPValue: 2.3e-12,
        baseMean: 456.2
      }
    ]
  }
});

export const generateAIGenerationResult = (): AIGenerationResult => ({
  metadata: {
    id: 'ai_' + Math.random().toString(36).substr(2, 9),
    userId: 'scientist_' + Math.random().toString(36).substr(2, 6),
    fileName: 'protein_design_input.txt',
    fileType: 'FASTA',
    fileSize: 2048,
    uploadDate: '2025-09-23T09:00:00Z',
    analysisDate: '2025-09-23T09:45:00Z',
    processingTime: 2700,
    status: 'completed',
    platform: 'Web3 Genomic Platform',
    blockchainTxId: '0x1b5e4f7c...',
    nftTokenId: 'AIGENE-009876'
  },
  type: 'protein_design',
  input: {
    prompt: 'Design a novel enzyme for breaking down plastic polymers with high thermostability',
    constraints: ['thermophilic', 'pH 7-9', 'molecular weight <50kDa'],
    targetProperties: {
      optimalTemperature: 85,
      optimalPH: 8.2,
      substrate: 'PET plastic',
      activity: 'hydrolase'
    }
  },
  generated: {
    sequence: 'MKKIAIAGGLMAGLVPHAIANVQDEMKTGGQVVSLPNAKGLEITRGLKQAVEAIASAVGPTDRLEVLDKLGELQVDLSPHGTSVKISAYQALAEQGYHVLIEYSELYQMTGWEDLAKKIERTKSLVPQCFLLVAGGDNHDNQRAFDFGVNKYQHVEKTEMLKPGDKVLEVATDQYRTTTDGRVLEMSLVAAVKEICGKFFTDQDKRVLTQPFDVLGHDLSQYGRKVQSLHGQILDKVMGPTGRLWAHGVPVIGGRNGSLWVDLFKGKTDVAGLAKLVVAAGDVDLDHTLVKPLVGNGSVEAPPPVVAQGKLLR',
    confidence: 0.94,
    novelty: 0.87,
    stability: 0.91,
    functionality: 0.89
  },
  predictions: {
    structure: {
      alpha: 45.2,
      beta: 32.1,
      coil: 22.7
    },
    properties: {
      molecularWeight: 47832.5,
      isoelectricPoint: 6.8,
      hydrophobicity: -0.234,
      solubility: 0.78
    },
    interactions: {
      bindingSites: [
        {
          position: 67,
          residue: 'H',
          confidence: 0.92,
          type: 'active_site'
        },
        {
          position: 134,
          residue: 'S',
          confidence: 0.88,
          type: 'active_site'
        }
      ],
      drugTargets: [
        {
          target: 'PET hydrolase',
          affinity: 8.7,
          selectivity: 0.94,
          druglikeness: 0.76
        }
      ]
    }
  },
  validation: {
    homologySearch: [
      {
        sequence: 'Known PETase from Ideonella sakaiensis',
        identity: 34.2,
        coverage: 78.5,
        eValue: 2.3e-45,
        species: 'Ideonella sakaiensis',
        function: 'PET degradation'
      }
    ],
    functionalPrediction: {
      primaryFunction: 'Polyethylene terephthalate hydrolase',
      confidence: 0.91,
      alternativeFunctions: ['Esterase activity', 'General hydrolase'],
      enzymeCommission: 'EC 3.1.1.-',
      pathway: 'Plastic degradation'
    },
    toxicityAssessment: {
      overall: 'low',
      hepatotoxicity: 0.12,
      cardiotoxicity: 0.08,
      nephrotoxicity: 0.15,
      mutagenicity: 0.06,
      carcinogenicity: 0.04
    }
  },
  optimization: {
    iterations: 15,
    improvements: [
      {
        iteration: 5,
        modification: 'Enhanced thermostability loop',
        score: 0.76,
        improvement: 0.12
      },
      {
        iteration: 10,
        modification: 'Optimized active site geometry',
        score: 0.85,
        improvement: 0.09
      },
      {
        iteration: 15,
        modification: 'Improved substrate binding pocket',
        score: 0.94,
        improvement: 0.09
      }
    ],
    finalScore: 0.94
  }
});

export const generateBlockchainResult = (): BlockchainResult => ({
  metadata: {
    id: 'blockchain_' + Math.random().toString(36).substr(2, 9),
    userId: 'researcher_' + Math.random().toString(36).substr(2, 6),
    fileName: 'genomic_data_nft.json',
    fileType: 'FASTA',
    fileSize: 5678901,
    uploadDate: '2025-09-22T13:20:00Z',
    analysisDate: '2025-09-22T13:45:00Z',
    processingTime: 1500,
    status: 'completed',
    platform: 'Web3 Genomic Platform',
    blockchainTxId: '0x9c8d7e6f...',
    nftTokenId: 'GENOME-NFT-012345'
  },
  ownership: {
    nftCollection: 'Genomic Analysis Collection',
    tokenId: 'GENOME-NFT-012345',
    owner: '0x742d35Cc6e398AB21e7f8dC9f5E1a5a5d8e6B9f2',
    creator: '0x123a45Bc6e398AB21e7f8dC9f5E1a5a5d8e6B9f3',
    mintDate: '2025-09-22T13:45:00Z',
    transferHistory: [
      {
        from: '0x123a45Bc6e398AB21e7f8dC9f5E1a5a5d8e6B9f3',
        to: '0x742d35Cc6e398AB21e7f8dC9f5E1a5a5d8e6B9f2',
        timestamp: '2025-09-22T13:45:00Z',
        transactionHash: '0x9c8d7e6f5a4b3c2d1e0f...',
        gasUsed: 150000
      }
    ]
  },
  smartContract: {
    address: '0xGenomicAnalysisContract123...',
    network: 'stacks',
    abi: '{"functions":[{"name":"mint","type":"write"},{"name":"transfer","type":"write"},{"name":"getOwner","type":"read"}]}',
    functions: [
      {
        name: 'mintAnalysisNFT',
        type: 'write',
        parameters: [
          {
            name: 'analysisHash',
            type: 'string',
            description: 'SHA-256 hash of analysis results'
          },
          {
            name: 'metadata',
            type: 'object',
            description: 'Analysis metadata and provenance'
          }
        ],
        description: 'Mint NFT representing genomic analysis ownership'
      },
      {
        name: 'grantAccess',
        type: 'write',
        parameters: [
          {
            name: 'grantee',
            type: 'address',
            description: 'Address to grant access to'
          },
          {
            name: 'permissions',
            type: 'string[]',
            description: 'Array of permission types'
          }
        ],
        description: 'Grant specific access permissions to another user'
      }
    ]
  },
  dataProvenance: {
    originalHash: '0xa1b2c3d4e5f6789...',
    analysisHash: '0x9f8e7d6c5b4a321...',
    blockHeight: 876543,
    timestamp: '2025-09-22T13:45:00Z',
    validators: [
      '0xValidator1...',
      '0xValidator2...',
      '0xValidator3...'
    ]
  },
  accessControl: {
    permissions: [
      {
        address: '0x742d35Cc6e398AB21e7f8dC9f5E1a5a5d8e6B9f2',
        role: 'owner',
        granted: '2025-09-22T13:45:00Z'
      },
      {
        address: '0x456b78Dc6e398AB21e7f8dC9f5E1a5a5d8e6B9f4',
        role: 'collaborator',
        granted: '2025-09-23T10:15:00Z',
        expires: '2026-09-23T10:15:00Z'
      }
    ],
    sharing: [
      {
        counterparty: '0x789c01Ed6e398AB21e7f8dC9f5E1a5a5d8e6B9f5',
        type: 'research',
        duration: '2 years',
        restrictions: ['non-commercial use only', 'attribution required'],
        compensation: 0
      }
    ],
    royalties: {
      creator: 0.05,
      platform: 0.025,
      referrer: 0.01,
      total: 0.085
    }
  }
});

export const generateComprehensiveReport = (): ComprehensiveAnalysisReport => ({
  metadata: {
    id: 'comprehensive_' + Math.random().toString(36).substr(2, 9),
    userId: 'lead_researcher_' + Math.random().toString(36).substr(2, 6),
    fileName: 'multi_omics_study.zip',
    fileType: 'BAM',
    fileSize: 25678901234,
    uploadDate: '2025-09-20T08:00:00Z',
    analysisDate: '2025-09-21T16:30:00Z',
    processingTime: 86400,
    status: 'completed',
    platform: 'Web3 Genomic Platform',
    blockchainTxId: '0x5d4c3b2a1e0f...',
    nftTokenId: 'COMPREHENSIVE-001'
  },
  results: [
    generateMedicalAnalysisResult(),
    generateResearchAnalysisResult(),
    generateAIGenerationResult(),
    generateBlockchainResult()
  ],
  summary: {
    keyFindings: [
      'Identified 3 pathogenic variants in cancer susceptibility genes',
      'Discovered 2,221 differentially expressed genes in tumor vs normal tissue',
      'Successfully designed novel PET-degrading enzyme with 94% confidence',
      'Established blockchain provenance for all analysis results'
    ],
    recommendations: [
      'Implement enhanced cancer screening protocols',
      'Validate AI-generated enzyme in laboratory conditions',
      'Share findings with research consortium under Web3 licensing',
      'Consider clinical trial enrollment for precision therapy'
    ],
    nextSteps: [
      'Genetic counseling consultation',
      'Protein synthesis and activity testing',
      'Regulatory approval for clinical implementation',
      'Community-driven validation through DAO governance'
    ]
  },
  attachments: {
    reports: [
      'detailed_variant_report.pdf',
      'rnaseq_analysis_full.html',
      'ai_protein_design_validation.pdf',
      'blockchain_provenance_certificate.pdf'
    ],
    visualizations: [
      'manhattan_plot_variants.png',
      'expression_heatmap.svg',
      'protein_structure_prediction.pdb',
      'nft_ownership_graph.json'
    ],
    rawData: [
      'filtered_variants.vcf',
      'normalized_expression_matrix.tsv',
      'optimized_protein_sequence.fasta',
      'blockchain_transaction_log.json'
    ]
  },
  collaboration: {
    sharedWith: [
      'clinical_team@hospital.org',
      'research_consortium@university.edu',
      'biotech_partner@company.com'
    ],
    comments: [
      {
        author: 'Dr. Sarah Chen',
        timestamp: '2025-09-22T09:30:00Z',
        content: 'Excellent work on the variant interpretation. The BRCA findings are clinically actionable.',
        section: 'Medical Analysis'
      },
      {
        author: 'Prof. Michael Roberts',
        timestamp: '2025-09-22T14:15:00Z',
        content: 'The AI-generated enzyme shows promising thermostability. Recommend lab validation.',
        section: 'AI Generation'
      }
    ],
    approvals: [
      {
        approver: 'Dr. Lisa Wang, Clinical Director',
        timestamp: '2025-09-23T11:00:00Z',
        status: 'approved',
        comments: 'Approved for clinical implementation pending IRB review'
      },
      {
        approver: 'Prof. James Miller, Research Ethics',
        timestamp: '2025-09-23T15:30:00Z',
        status: 'approved',
        comments: 'Blockchain implementation ensures proper data governance'
      }
    ]
  }
});

// Generate sample data for different sectors
export const generateHospitalResults = () => ({
  medicalReport: generateMedicalAnalysisResult(),
  pharmacogenomics: {
    ...generateMedicalAnalysisResult(),
    type: 'pharmacogenomics' as const,
    drugInteractions: [
      {
        drug: 'Warfarin',
        gene: 'CYP2C9',
        variant: 'CYP2C9*2/*3',
        effect: 'poor_metabolizer' as const,
        recommendation: 'Start with 25% of standard dose, monitor INR weekly',
        evidence: 'CPIC Level 1A Evidence',
        source: 'PharmGKB'
      }
    ]
  }
});

export const generateLabResults = () => ({
  researchAnalysis: generateResearchAnalysisResult(),
  qualityControl: {
    batchId: 'LAB_BATCH_2025_0923',
    samples: 96,
    passRate: 94.8,
    failedSamples: ['S001', 'S045', 'S078', 'S089', 'S092'],
    averageQuality: 'excellent' as const,
    contamination: 0.008,
    recommendation: 'Reprocess failed samples, investigate contamination source'
  }
});

export const generateUniversityResults = () => ({
  comparativeStudy: generateResearchAnalysisResult(),
  aiGeneration: generateAIGenerationResult(),
  publication: {
    title: 'Novel AI-Designed Enzymes for Plastic Degradation: A Web3-Enabled Discovery Platform',
    authors: ['Dr. Jane Smith', 'Prof. John Doe', 'Research Team'],
    journal: 'Nature Biotechnology',
    impact: 'High impact discovery with environmental applications',
    citationPotential: 'Estimated 500+ citations in first year'
  }
});

export const generateBiotechResults = () => ({
  drugDevelopment: generateAIGenerationResult(),
  ipProtection: generateBlockchainResult(),
  commercialization: {
    marketSize: '$2.3B addressable market',
    competitiveAdvantage: 'AI-designed specificity with blockchain IP protection',
    timeline: '18 months to clinical trials',
    fundingRequired: '$15M Series A',
    projectedRevenue: '$50M by year 3'
  }
});

// Export comprehensive sample data
export const sampleAnalysisResults = {
  medical: generateMedicalAnalysisResult(),
  research: generateResearchAnalysisResult(),
  aiGeneration: generateAIGenerationResult(),
  blockchain: generateBlockchainResult(),
  comprehensive: generateComprehensiveReport(),
  
  // Sector-specific examples
  hospital: generateHospitalResults(),
  laboratory: generateLabResults(),
  university: generateUniversityResults(),
  biotech: generateBiotechResults()
};