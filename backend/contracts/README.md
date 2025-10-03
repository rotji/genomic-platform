# 📜 Genomic Platform Smart Contracts

Blockchain-first smart contracts for immutable genomic data storage and oracle verification on the Stacks network.

## 🎯 Overview

Our smart contracts provide:
- **Immutable Data Storage**: Genomic analysis results stored permanently on blockchain
- **Oracle Verification**: Multi-source consensus for external genomic database verification  
- **Access Control**: Granular permissions for sensitive genomic data
- **Audit Trail**: Complete history of all data access and modifications
- **Integrity Verification**: Cryptographic proof of data authenticity

## 📋 Contracts

### 1. `genomic-data-storage.clar`
**Purpose**: Core data storage and access control for genomic analyses

**Key Functions**:
- `store-analysis`: Store genomic analysis results with metadata
- `get-analysis`: Retrieve analysis data (with permission check)
- `grant-access`: Share analysis results with other users
- `verify-analysis-integrity`: Cryptographic integrity verification
- `store-oracle-verification`: Store external database verification results

### 2. `oracle-verification.clar`
**Purpose**: Consensus mechanism for external genomic database verification

**Key Functions**:
- `add-oracle`: Authorize new oracle nodes (owner only)
- `submit-gene-verification`: Oracle submits gene validation
- `submit-variant-verification`: Oracle submits variant validation
- `get-consensus`: Check if consensus has been reached
- `get-oracle-info`: View oracle reputation and statistics

## 🚀 Quick Start

### Prerequisites
1. **Install Clarinet**: See [INSTALL_CLARINET.md](./INSTALL_CLARINET.md)
2. **Oracle Service**: Ensure running on port 3002

### Development Setup
```bash
# Check contract syntax
clarinet check contracts/genomic-data-storage.clar
clarinet check contracts/oracle-verification.clar

# Run tests
clarinet test

# Start local devnet
clarinet devnet start
```

## 🧪 Testing
```bash
# Run all tests
clarinet test

# Deploy and test locally
powershell -ExecutionPolicy Bypass -File deploy.ps1
```

## 🔐 Security Features
- **Access Control**: Granular permissions system
- **Data Integrity**: Cryptographic hashing and verification
- **Oracle Consensus**: 75% threshold with 3+ oracle minimum
- **Immutable Storage**: Blockchain-backed permanence

## 📊 Integration with Oracle Service
- Gene verification: `/gene/{symbol}` → blockchain storage
- Variant verification: `/variant/{chr}/{pos}/{alt}` → consensus
- Real-time verification and consensus tracking