# 🧬 Genomic Platform Backend

Blockchain-first genomic analysis platform with microservices architecture, extensive Stacks.js integration, and oracle-verified data processing.

## 🏗️ Architecture Overview

Our backend consists of multiple specialized services:

- **🖥️ Node.js API Server** - Express + TypeScript + Stacks.js integration
- **🐍 Python Analysis Engine** - FastAPI + BioPython for genomic processing  
- **🔮 Oracle Service** - TypeScript service for external data verification
- **📜 Clarity Smart Contracts** - Blockchain proof storage and verification

## 🚀 Quick Start

### API Server (Node.js)
```bash
cd api-server
npm install
npm run dev
# Server runs on http://localhost:3001
```

### Analysis Engine (Python) ✅ Ready
```bash
cd analysis-engine
# Install dependencies
C:\Users\PC\AppData\Local\Programs\Python\Python313\python.exe -m pip install -r requirements.txt

# Start FastAPI server
C:\Users\PC\AppData\Local\Programs\Python\Python313\python.exe src/main.py
# Server runs on http://localhost:8000

# Note: Using full Python path due to Windows alias issue
```

### Oracle Service (TypeScript) - Coming Soon
```bash
cd oracle-service
npm install
npm run dev
```

## 📊 Service Status

| Service | Status | Port | Endpoints |
|---------|--------|------|-----------|
| API Server | ✅ Running | 3001 | `/health`, `/api` |
| Analysis Engine | ✅ Running | 8000 | `/health`, `/docs`, `/analyze` |
| Oracle Service | 🟡 Planned | 3002 | TBD |
| Smart Contracts | 🟡 Planned | - | TBD |

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- Python 3.9+ (Note: Windows users may need to use full Python path due to Windows Store alias issue)
- PostgreSQL
- Git

### ⚠️ Known Issues

**Windows Python Alias Issue**: Windows 10/11 may redirect `python` commands to Microsoft Store. If you encounter this:
- Use full Python path: `C:\Users\PC\AppData\Local\Programs\Python\Python313\python.exe`
- Or disable Python app execution aliases in Windows Settings > Apps > App execution aliases

### Environment Configuration
Each service has its own `.env.example` file. Copy to `.env` and configure:

```bash
# API Server
cd api-server
cp .env.example .env
# Edit .env with your configuration
```

## 📋 Development Workflow

### Option 1: Individual Services (Recommended for Development)
```bash
# Terminal 1: API Server
cd api-server && npm run dev

# Terminal 2: Analysis Engine (when ready)
cd analysis-engine && python main.py

# Terminal 3: Oracle Service (when ready)
cd oracle-service && npm run dev
```

### Option 2: Docker Compose (Coming Soon)
```bash
docker-compose up
```

## 🛡️ Security Features

- **Environment Variables**: Sensitive data in `.env` files (not tracked by git)
- **CORS Configuration**: Proper cross-origin resource sharing
- **Helmet Security**: HTTP headers protection
- **Request Logging**: Morgan middleware for request tracking
- **Stacks.js Integration**: Blockchain-native authentication ready

## 🔗 Blockchain Integration

- **Stacks Network**: Testnet/Mainnet configuration
- **Smart Contracts**: Clarity contracts for data integrity
- **Oracle Verification**: External data validation
- **Transaction Tracking**: Immutable proof storage

## 📁 Project Structure

```
backend/
├── api-server/           # Node.js Express + TypeScript
│   ├── src/
│   │   ├── controllers/  # API endpoint handlers
│   │   ├── middleware/   # Auth, CORS, validation
│   │   ├── models/       # Data models
│   │   ├── routes/       # Express routes
│   │   ├── services/     # Business logic
│   │   └── utils/        # Helper functions
│   ├── package.json      # Dependencies & scripts
│   └── tsconfig.json     # TypeScript config
├── analysis-engine/      # Python FastAPI (In Progress)
├── oracle-service/       # TypeScript Oracle (Planned)
├── contracts/           # Clarity Smart Contracts (Planned)
└── shared/              # Common utilities
```

## 🤝 Contributing

1. Work on feature branches
2. Follow TypeScript/Python best practices
3. Update documentation for changes
4. Test endpoints before committing

## 📚 Documentation

- **API Documentation**: Available at `/api` endpoint
- **Health Checks**: Available at `/health` endpoint
- **Environment Setup**: See `.env.example` files
- **Architecture Details**: See `/docs` folder

---

**Status**: 🚀 **Node.js + Python Foundations Ready** | Next: Oracle Service Setup