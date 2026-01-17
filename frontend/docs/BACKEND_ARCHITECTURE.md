
> **Note:** This document follows the principles in [system design phylosophy.md](system%20design%20phylosophy.md).

# 🏗️ Backend Architecture Documentation

## Overview
This document outlines the complete backend architecture for the genomic platform, emphasizing extensive Stacks.js integration, oracle services, and Clarity smart contracts for a fully decentralized genomic analysis ecosystem.

## 🎯 Core Architecture Principles

### 1. **Blockchain-First Approach**
- All critical operations recorded on Stacks blockchain
- Extensive use of Stacks.js for frontend-blockchain communication
- Oracle-verified external data integration
- Immutable analysis proofs via Clarity contracts

### 2. **Free-Tier Technology Stack**
- **Node.js/Express**: Main API server (free hosting: Railway, Render)
- **PostgreSQL**: Metadata storage (free: Heroku Postgres, Supabase)
- **Python FastAPI**: Analysis engine (containerized)
- **MinIO**: Self-hosted S3-compatible storage
- **Clarity**: Smart contracts on Stacks testnet (free)
- **Custom Oracle Service**: External data verification

## 🏛️ Service Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend │────│  Node.js API     │────│ Python Analysis │
│   (Stacks.js)    │    │  (Express)       │    │ Engine (FastAPI)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Stacks Blockchain│    │   PostgreSQL     │    │   File Storage  │
│ (Clarity Contracts)   │   (Metadata)     │    │   (MinIO/Local) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌──────────────────┐
                    │  Oracle Service  │
                    │ (External Data)  │
                    └──────────────────┘
```

## 🔗 Stacks.js Integration Points

### Frontend → Blockchain Communication
```typescript
// Extensive Stacks.js usage throughout the platform:

// 1. User Authentication via Stacks Connect
import { AppConfig, UserSession, showConnect } from '@stacks/connect';

// 2. Contract Interactions
import { callReadOnlyFunction, makeContractCall } from '@stacks/transactions';

// 3. Transaction Broadcasting
import { broadcastTransaction } from '@stacks/network';

// 4. STX Token Operations
import { makeSTXTokenTransfer } from '@stacks/transactions';
```

### Key Integration Areas:
1. **User Identity**: Stacks wallet-based authentication
2. **File Registration**: Smart contract registration of uploaded files
3. **Analysis Proof**: Immutable storage of analysis results
4. **Oracle Data**: Blockchain-verified external genomic data
5. **Payment Processing**: STX token payments for premium features

## 🔮 Oracle Integration Architecture

### Oracle Service Components

#### 1. **Genomic Database Oracle**
```
External APIs → Oracle Service → Clarity Contract → Frontend
     │              │                 │              │
  NCBI/EBI     Data Validation    Blockchain      Stacks.js
  ClinVar      Cryptographic      Verification    Integration
  dbSNP        Signatures         & Storage
```

#### 2. **Oracle Responsibilities**
- **Reference Data**: Fetch verified reference genomes from NCBI
- **Mutation Verification**: Cross-check variants against ClinVar database
- **Gene Annotation**: Retrieve gene function data from external sources
- **Quality Control**: Validate analysis results against known standards
- **Compliance Data**: Check regulatory and certification status

#### 3. **Oracle Data Flow**
```typescript
// Oracle integration in frontend via Stacks.js
const fetchOracleData = async (geneId: string) => {
  // 1. Call oracle smart contract
  const oracleResult = await callReadOnlyFunction({
    contractAddress: 'ST1...ORACLE',
    contractName: 'genomic-oracle',
    functionName: 'get-gene-annotation',
    functionArgs: [stringAsciiCV(geneId)]
  });
  
  // 2. Verify oracle signature
  // 3. Use verified data in analysis
};
```

## 🌐 Node.js API Server

### Core Responsibilities
- **File Upload Management**: Multipart upload handling with progress tracking
- **Authentication**: JWT + Stacks wallet integration
- **Job Queue**: Analysis job scheduling and monitoring
- **Oracle Communication**: Bridge between Python analysis and oracle services
- **Blockchain Interface**: Stacks.js transaction management

### API Endpoints Structure
```
/api/v1/
├── auth/
│   ├── POST /connect-wallet     # Stacks wallet authentication
│   ├── POST /verify-signature   # Signature verification
│   └── GET  /profile           # User profile from blockchain
├── files/
│   ├── POST /upload            # File upload with blockchain registration
│   ├── GET  /list             # List user files from contract
│   └── DELETE /:id            # Remove file (update contract)
├── analysis/
│   ├── POST /start            # Start analysis job + oracle verification
│   ├── GET  /status/:id       # Job status with blockchain proof
│   └── GET  /results/:id      # Results with oracle validation
├── oracle/
│   ├── GET  /gene-info/:id    # Oracle-verified gene information
│   ├── GET  /variant/:rsid    # Oracle-verified variant data
│   └── POST /verify-result    # Cross-verify analysis with oracles
└── blockchain/
    ├── POST /register-analysis # Register analysis on blockchain
    ├── GET  /transaction/:id   # Transaction status
    └── GET  /proofs/:userId    # User's blockchain proofs
```

### Free-Tier Technology Choices

#### Database: PostgreSQL (Supabase Free Tier)
```sql
-- User blockchain identity
CREATE TABLE users (
  id UUID PRIMARY KEY,
  stacks_address VARCHAR(255) UNIQUE,
  public_key TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- File metadata with blockchain reference
CREATE TABLE files (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  filename VARCHAR(255),
  file_hash VARCHAR(64),
  blockchain_tx_id VARCHAR(64),
  oracle_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Analysis jobs with oracle integration
CREATE TABLE analysis_jobs (
  id UUID PRIMARY KEY,
  file_id UUID REFERENCES files(id),
  status VARCHAR(50),
  oracle_data JSONB,
  blockchain_proof VARCHAR(64),
  results JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### File Storage: MinIO (Self-hosted S3-compatible)
```javascript
// MinIO setup for free file storage
const MinIO = require('minio');

const minioClient = new MinIO.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
});
```

## 🐍 Python Analysis Engine

### FastAPI Microservice
```python
# analysis_engine/main.py
from fastapi import FastAPI, BackgroundTasks
from biopython import SeqIO
import requests
import hashlib

app = FastAPI()

class GenomicAnalyzer:
    def __init__(self):
        self.oracle_service = OracleClient()
    
    async def analyze_fasta(self, file_path: str, job_id: str):
        # 1. Parse genomic file
        sequences = SeqIO.parse(file_path, "fasta")
        
        # 2. Perform analysis
        results = self.run_analysis(sequences)
        
        # 3. Verify with oracle
        oracle_verification = await self.oracle_service.verify_results(results)
        
        # 4. Generate blockchain proof
        proof_hash = self.generate_proof_hash(results, oracle_verification)
        
        # 5. Return to Node.js API
        return {
            "results": results,
            "oracle_verified": oracle_verification,
            "proof_hash": proof_hash
        }
```

### Oracle Client Integration
```python
class OracleClient:
    async def verify_results(self, analysis_results):
        # Cross-check mutations with ClinVar via oracle
        verified_variants = []
        
        for variant in analysis_results['variants']:
            oracle_data = await self.query_oracle({
                'type': 'variant_verification',
                'chromosome': variant['chr'],
                'position': variant['pos'],
                'allele': variant['alt']
            })
            
            verified_variants.append({
                **variant,
                'clinical_significance': oracle_data.get('clinical_significance'),
                'oracle_verified': oracle_data.get('verified', False)
            })
        
        return verified_variants
```

## 📊 Oracle Service Implementation

### Custom Oracle for Genomic Data
```typescript
// oracle-service/src/oracle.ts
export class GenomicOracle {
  private ncbiClient: NCBIClient;
  private clinvarClient: ClinVarClient;
  private stacksNetwork: StacksNetwork;

  async fetchGeneAnnotation(geneSymbol: string): Promise<GeneData> {
    // 1. Fetch from NCBI
    const ncbiData = await this.ncbiClient.getGeneInfo(geneSymbol);
    
    // 2. Cross-verify with multiple sources
    const ensemblData = await this.fetchEnsemblData(geneSymbol);
    
    // 3. Create cryptographic proof
    const dataHash = this.createDataHash([ncbiData, ensemblData]);
    
    // 4. Submit to blockchain
    await this.submitToBlockchain(dataHash, ncbiData);
    
    return ncbiData;
  }

  async verifyVariant(variant: Variant): Promise<VariantVerification> {
    // Multi-source verification
    const clinvarData = await this.clinvarClient.lookup(variant);
    const gnomadData = await this.gnomadClient.lookup(variant);
    
    return {
      variant,
      clinical_significance: clinvarData.significance,
      population_frequency: gnomadData.frequency,
      verified_at: new Date().toISOString(),
      oracle_signature: this.signData(variant)
    };
  }
}
```

### Oracle Smart Contract Interface
```clarity
;; oracle-contract.clar
(define-data-var oracle-operator principal tx-sender)

(define-map verified-data
  { data-hash: (buff 32) }
  { 
    value: (string-ascii 1024),
    timestamp: uint,
    verified: bool,
    oracle-signature: (buff 65)
  }
)

(define-public (submit-verified-data 
  (data-hash (buff 32))
  (value (string-ascii 1024))
  (signature (buff 65)))
  
  (begin
    (asserts! (is-eq tx-sender (var-get oracle-operator)) err-unauthorized)
    (map-set verified-data 
      { data-hash: data-hash }
      { 
        value: value,
        timestamp: block-height,
        verified: true,
        oracle-signature: signature
      })
    (ok true)))

(define-read-only (get-verified-data (data-hash (buff 32)))
  (map-get? verified-data { data-hash: data-hash }))
```

## 🚀 Deployment Strategy (Free Tier)

### Development Environment
```yaml
# docker-compose.yml for local development
version: '3.8'
services:
  api:
    build: ./backend/api-server
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/genomic_db
      - STACKS_NETWORK=testnet
    
  analysis-engine:
    build: ./backend/analysis-engine
    ports:
      - "8000:8000"
    volumes:
      - ./uploads:/app/uploads
    
  oracle-service:
    build: ./backend/oracle-service
    ports:
      - "3002:3002"
    environment:
      - NCBI_API_KEY=${NCBI_API_KEY}
      - STACKS_PRIVATE_KEY=${ORACLE_PRIVATE_KEY}
  
  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=genomic_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    volumes:
      - minio_data:/data

volumes:
  postgres_data:
  minio_data:
```

### Production (Free Hosting)
- **Frontend**: Netlify/Vercel free tier
- **API Server**: Railway/Render free tier
- **Database**: Supabase free tier (500MB)
- **File Storage**: Self-hosted MinIO on Railway
- **Oracle Service**: Railway free tier
- **Smart Contracts**: Stacks testnet (free)

## 🔒 Security Considerations

### Blockchain Security
- All file uploads generate cryptographic hashes stored on-chain
- Oracle data signed with private keys for verification
- User authentication via Stacks wallet signatures
- Analysis results immutably recorded with timestamps

### API Security
```typescript
// JWT + Stacks signature verification
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  const stacksSignature = req.headers['x-stacks-signature'];
  
  // Verify both JWT and Stacks signature
  const jwtValid = verifyJWT(token);
  const stacksValid = await verifyStacksSignature(stacksSignature, req.body);
  
  if (jwtValid && stacksValid) {
    next();
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
```

## 📈 Scaling Strategy

### Phase 1: MVP (Free Resources)
- Single Node.js server
- PostgreSQL database
- Local file storage
- Basic oracle integration

### Phase 2: Growth (Minimal Cost)
- Microservices architecture
- Redis for job queues
- MinIO cluster for file storage
- Advanced oracle network

### Phase 3: Enterprise (Revenue-Funded)
- Kubernetes deployment
- Multi-region oracle nodes
- Enterprise blockchain integration
- Advanced analytics and AI

## 🔄 Data Flow Example

### Complete Analysis Workflow
```
1. User uploads file via frontend (Stacks.js authentication)
   ↓
2. Node.js API validates and stores file (generates blockchain hash)
   ↓
3. File registration transaction sent to Stacks blockchain
   ↓
4. Analysis job queued for Python engine
   ↓
5. Python engine processes file and queries oracle for verification
   ↓
6. Oracle fetches external data (NCBI, ClinVar) and signs response
   ↓
7. Analysis results combined with oracle data
   ↓
8. Results hash stored on blockchain via Clarity contract
   ↓
9. Frontend retrieves results using Stacks.js contract calls
   ↓
10. User views verified, blockchain-proven analysis results
```

This architecture provides a fully decentralized, oracle-verified, blockchain-proven genomic analysis platform using only free-tier resources for initial development.