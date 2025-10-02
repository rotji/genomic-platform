// Analysis Result Types for Comprehensive Platform Output

export interface AnalysisMetadata {
  id: string;
  userId: string;
  fileName: string;
  fileType: 'FASTA' | 'VCF' | 'BAM' | 'FASTQ' | 'GFF' | 'BED';
  fileSize: number;
  uploadDate: string;
  analysisDate: string;
  processingTime: number; // in seconds
  status: 'completed' | 'processing' | 'failed' | 'queued';
  platform: 'Web3 Genomic Platform';
  blockchainTxId?: string;
  nftTokenId?: string;
}

// Medical/Clinical Analysis Results
export interface MedicalAnalysisResult {
  metadata: AnalysisMetadata;
  type: 'medical_report' | 'pharmacogenomics' | 'disease_risk' | 'carrier_screening';
  patient: {
    id: string;
    age?: number;
    gender?: 'M' | 'F' | 'Other';
    ethnicity?: string;
  };
  findings: {
    pathogenic: VariantFinding[];
    likelyPathogenic: VariantFinding[];
    variantOfUncertainSignificance: VariantFinding[];
    benign: VariantFinding[];
    likelyBenign: VariantFinding[];
  };
  drugInteractions: DrugInteraction[];
  diseaseRisks: DiseaseRisk[];
  recommendations: ClinicalRecommendation[];
  qualityMetrics: QualityMetrics;
}

export interface VariantFinding {
  chromosome: string;
  position: number;
  referenceAllele: string;
  alternateAllele: string;
  gene: string;
  transcript: string;
  consequence: string;
  clinicalSignificance: string;
  dbSNP?: string;
  clinVar?: string;
  frequency: {
    gnomAD: number;
    exAC: number;
    esp: number;
  };
  predictions: {
    sift: number;
    polyphen: number;
    cadd: number;
  };
}

export interface DrugInteraction {
  drug: string;
  gene: string;
  variant: string;
  effect: 'poor_metabolizer' | 'intermediate_metabolizer' | 'normal_metabolizer' | 'rapid_metabolizer' | 'ultra_rapid_metabolizer';
  recommendation: string;
  evidence: string;
  source: string;
}

export interface DiseaseRisk {
  disease: string;
  riskScore: number;
  populationAverage: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'very_high';
  confidence: number;
  associatedVariants: string[];
  description: string;
}

export interface ClinicalRecommendation {
  category: 'monitoring' | 'treatment' | 'lifestyle' | 'genetic_counseling' | 'family_screening';
  priority: 'high' | 'medium' | 'low';
  recommendation: string;
  rationale: string;
  evidence: string;
}

// Research Analysis Results
export interface ResearchAnalysisResult {
  metadata: AnalysisMetadata;
  type: 'variant_calling' | 'rna_seq' | 'chip_seq' | 'methylation' | 'structural_variants';
  statistics: {
    totalReads: number;
    mappedReads: number;
    mappingRate: number;
    meanCoverage: number;
    variants: {
      snvs: number;
      indels: number;
      structural: number;
    };
  };
  qualityControl: {
    passedFilters: boolean;
    warnings: string[];
    errors: string[];
  };
  annotations: GeneAnnotation[];
  pathways: PathwayAnalysis[];
  comparativeAnalysis?: ComparativeAnalysis;
}

export interface GeneAnnotation {
  gene: string;
  chromosome: string;
  start: number;
  end: number;
  strand: '+' | '-';
  biotype: string;
  description: string;
  variants: number;
  expression?: {
    tpm: number;
    fpkm: number;
    rawCounts: number;
  };
}

export interface PathwayAnalysis {
  pathway: string;
  database: 'KEGG' | 'GO' | 'Reactome' | 'WikiPathways';
  pValue: number;
  adjustedPValue: number;
  geneCount: number;
  enrichmentScore: number;
  genes: string[];
}

export interface ComparativeAnalysis {
  controlGroup: string;
  testGroup: string;
  differentiallyExpressed: {
    upregulated: number;
    downregulated: number;
    significant: number;
  };
  topUpregulated: DifferentialGene[];
  topDownregulated: DifferentialGene[];
}

export interface DifferentialGene {
  gene: string;
  logFoldChange: number;
  pValue: number;
  adjustedPValue: number;
  baseMean: number;
}

// AI Generation Results (NVIDIA BioNeMo EVO2)
export interface AIGenerationResult {
  metadata: AnalysisMetadata;
  type: 'protein_design' | 'dna_synthesis' | 'drug_optimization' | 'enzyme_engineering';
  input: {
    prompt: string;
    constraints: string[];
    targetProperties: Record<string, any>;
  };
  generated: {
    sequence: string;
    confidence: number;
    novelty: number;
    stability: number;
    functionality: number;
  };
  predictions: {
    structure: {
      alpha: number;
      beta: number;
      coil: number;
    };
    properties: {
      molecularWeight: number;
      isoelectricPoint: number;
      hydrophobicity: number;
      solubility: number;
    };
    interactions: {
      bindingSites: BindingSite[];
      drugTargets: DrugTarget[];
    };
  };
  validation: {
    homologySearch: HomologyResult[];
    functionalPrediction: FunctionalPrediction;
    toxicityAssessment: ToxicityAssessment;
  };
  optimization: {
    iterations: number;
    improvements: OptimizationStep[];
    finalScore: number;
  };
}

export interface BindingSite {
  position: number;
  residue: string;
  confidence: number;
  type: 'active_site' | 'allosteric' | 'cofactor' | 'metal';
}

export interface DrugTarget {
  target: string;
  affinity: number;
  selectivity: number;
  druglikeness: number;
}

export interface HomologyResult {
  sequence: string;
  identity: number;
  coverage: number;
  eValue: number;
  species: string;
  function: string;
}

export interface FunctionalPrediction {
  primaryFunction: string;
  confidence: number;
  alternativeFunctions: string[];
  enzymeCommission?: string;
  pathway?: string;
}

export interface ToxicityAssessment {
  overall: 'low' | 'moderate' | 'high';
  hepatotoxicity: number;
  cardiotoxicity: number;
  nephrotoxicity: number;
  mutagenicity: number;
  carcinogenicity: number;
}

export interface OptimizationStep {
  iteration: number;
  modification: string;
  score: number;
  improvement: number;
}

// Web3/Blockchain Results
export interface BlockchainResult {
  metadata: AnalysisMetadata;
  ownership: {
    nftCollection: string;
    tokenId: string;
    owner: string;
    creator: string;
    mintDate: string;
    transferHistory: TransferEvent[];
  };
  smartContract: {
    address: string;
    network: 'stacks' | 'ethereum' | 'polygon';
    abi: string;
    functions: ContractFunction[];
  };
  dataProvenance: {
    originalHash: string;
    analysisHash: string;
    blockHeight: number;
    timestamp: string;
    validators: string[];
  };
  accessControl: {
    permissions: Permission[];
    sharing: SharingAgreement[];
    royalties: RoyaltyStructure;
  };
}

export interface TransferEvent {
  from: string;
  to: string;
  timestamp: string;
  transactionHash: string;
  gasUsed: number;
}

export interface ContractFunction {
  name: string;
  type: 'read' | 'write';
  parameters: Parameter[];
  description: string;
}

export interface Parameter {
  name: string;
  type: string;
  description: string;
}

export interface Permission {
  address: string;
  role: 'owner' | 'viewer' | 'analyst' | 'collaborator';
  granted: string;
  expires?: string;
}

export interface SharingAgreement {
  counterparty: string;
  type: 'commercial' | 'research' | 'clinical';
  duration: string;
  restrictions: string[];
  compensation?: number;
}

export interface RoyaltyStructure {
  creator: number;
  platform: number;
  referrer?: number;
  total: number;
}

// Quality Metrics
export interface QualityMetrics {
  overall: 'excellent' | 'good' | 'fair' | 'poor';
  sequencingDepth: number;
  coverage: {
    mean: number;
    median: number;
    uniformity: number;
  };
  qualityScores: {
    q20: number;
    q30: number;
    meanQuality: number;
  };
  contamination: {
    level: number;
    sources: string[];
  };
  completeness: number;
  accuracy: number;
}

// Aggregated Result Types
export type AnalysisResult = 
  | MedicalAnalysisResult 
  | ResearchAnalysisResult 
  | AIGenerationResult 
  | BlockchainResult;

export interface ComprehensiveAnalysisReport {
  metadata: AnalysisMetadata;
  results: AnalysisResult[];
  summary: {
    keyFindings: string[];
    recommendations: string[];
    nextSteps: string[];
  };
  attachments: {
    reports: string[];
    visualizations: string[];
    rawData: string[];
  };
  collaboration: {
    sharedWith: string[];
    comments: Comment[];
    approvals: Approval[];
  };
}

export interface Comment {
  author: string;
  timestamp: string;
  content: string;
  section: string;
}

export interface Approval {
  approver: string;
  timestamp: string;
  status: 'approved' | 'rejected' | 'pending';
  comments?: string;
}