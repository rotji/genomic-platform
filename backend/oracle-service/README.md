# 🔮 Oracle Service

TypeScript microservice for external genomic data verification and blockchain integration.

## 🎯 Purpose

The Oracle Service acts as a bridge between external genomic databases (NCBI, ClinVar, Ensembl) and our blockchain-first genomic platform. It provides verified, tamper-proof data that can be trusted for clinical and research applications.

## 🏗️ Architecture

- **External API Integration**: NCBI Gene, ClinVar, dbSNP, Ensembl
- **Blockchain Integration**: Stacks network for immutable storage
- **Data Verification**: Multi-source verification with confidence scoring
- **RESTful API**: Express.js with TypeScript and comprehensive validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Environment configuration (see `.env.example`)

### Installation
```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Or build and run production
npm run build
npm start
```

## 📡 API Endpoints

### Health Check
```bash
GET /health              # Basic health check
GET /health/detailed     # Detailed health with external services
```

### Gene Verification
```bash
GET /gene/:symbol        # Verify single gene symbol
POST /gene/batch         # Batch gene verification (max 50)
```

### Variant Verification
```bash
GET /variant/:chromosome/:position/:alt  # Verify variant
POST /variant/batch                      # Batch variant verification (max 20)
```

### Blockchain Integration
```bash
GET /blockchain/health                   # Blockchain connectivity
POST /blockchain/store-analysis          # Store analysis on blockchain
GET /blockchain/verify-analysis/:id      # Verify stored analysis
GET /blockchain/oracle-proof/:hash       # Get oracle verification proof
POST /blockchain/store-verification      # Store oracle verification
```

## 🔧 Configuration

### Environment Variables
See `.env.example` for all configuration options.

Key variables:
- `PORT`: Service port (default: 3002)
- `NCBI_API_KEY`: NCBI E-utilities API key
- `STACKS_PRIVATE_KEY`: Stacks blockchain private key
- `ORACLE_CONFIDENCE_THRESHOLD`: Minimum confidence for verification

### External APIs
- **NCBI E-utilities**: Gene and variant information
- **ClinVar**: Clinical variant significance
- **Ensembl**: Reference genome data
- **dbSNP**: Variant population data

## 🛡️ Security

- **Input Validation**: Zod schemas for all inputs
- **Rate Limiting**: Configurable rate limits
- **CORS**: Configurable cross-origin policies
- **Helmet**: Security headers
- **Environment Isolation**: Sensitive data in environment variables

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Lint code
npm run lint
```

## 📊 Monitoring

The service provides comprehensive health checks and logging:
- External service connectivity monitoring
- Blockchain network status
- Request/response logging with Winston
- Error tracking and reporting

## 🔗 Integration

### With Analysis Engine
The Python Analysis Engine calls Oracle Service endpoints:
```python
# Example from analysis-engine
oracle_client = OracleClient("http://localhost:3002")
gene_data = await oracle_client.verify_gene_annotation("BRCA1")
```

### With API Server
The Node.js API Server can proxy Oracle requests:
```typescript
// Example integration
const oracleResponse = await axios.get('http://localhost:3002/gene/BRCA1');
```

## 🚀 Production Deployment

### Docker
```bash
# Build image
docker build -t genomic-oracle .

# Run container
docker run -p 3002:3002 --env-file .env genomic-oracle
```

### Environment Setup
- Set production environment variables
- Configure external API keys and credentials
- Set up Stacks mainnet configuration
- Configure monitoring and logging

## 📈 Performance

- **Response Times**: < 2s for single requests, < 10s for batch
- **Rate Limits**: 100 requests per 15-minute window (configurable)
- **Caching**: Optional Redis integration for frequently accessed data
- **Batch Processing**: Optimized for multiple concurrent verifications

## 🔮 Oracle Verification Process

1. **Data Collection**: Fetch from multiple external sources
2. **Cross-Validation**: Compare results across databases
3. **Confidence Scoring**: Calculate verification confidence
4. **Blockchain Storage**: Store verified data immutably
5. **Proof Generation**: Create cryptographic verification proofs

## 🎯 Roadmap

- [ ] Real-time external API integration
- [ ] Redis caching implementation
- [ ] Smart contract deployment
- [ ] Advanced confidence algorithms
- [ ] Webhook notifications
- [ ] GraphQL API support