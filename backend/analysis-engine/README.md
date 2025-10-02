# Genomic Analysis Engine - Python FastAPI

FastAPI microservice for genomic data analysis with BioPython integration and oracle verification.

## 🐍 Prerequisites

### Python Installation (Required)
```bash
# Windows: Download from https://python.org/downloads/
# Install Python 3.9+ with pip

# Verify installation:
python --version  # Should show Python 3.9+
pip --version     # Should show pip version
```

### Alternative Python Commands
```bash
# Try these if 'python' doesn't work:
py --version      # Windows Python Launcher
python3 --version # Linux/Mac style
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Create virtual environment (recommended)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install requirements
pip install -r requirements.txt
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
```

### 3. Run the Server
```bash
# Start FastAPI development server
python src/main.py

# Alternative using uvicorn directly
uvicorn src.main:app --reload --port 8000
```

### 4. Test the API
- **Health Check**: http://localhost:8000/health
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📋 Available Endpoints

- `GET /health` - Health check
- `GET /` - API information
- `POST /analyze` - Analyze genomic data (placeholder)
- `GET /oracle/status` - Oracle service status

## 🧬 Supported Analysis

- **FASTA Files**: Basic sequence analysis, GC content, composition
- **FASTQ Files**: Quality analysis (coming soon)
- **Mutation Detection**: Variant calling (coming soon)
- **Oracle Verification**: External database validation

## 🔗 Integration

This service integrates with:
- **Node.js API Server** (port 3001)
- **Oracle Service** (port 3002)
- **External Databases**: NCBI, ClinVar, Ensembl

## 📦 Dependencies

Key Python packages:
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `biopython` - Genomic data analysis
- `httpx` - HTTP client for oracle integration
- `pydantic` - Data validation

## 🐳 Docker Support

```bash
# Build image
docker build -t genomic-analysis-engine .

# Run container
docker run -p 8000:8000 genomic-analysis-engine
```