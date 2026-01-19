"""
Genomic Platform - Analysis Engine
FastAPI microservice for genomic data analysis with BioPython integration
"""
import os
from datetime import datetime
from typing import Dict, Any


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from dotenv import load_dotenv
# Import analyzers
from analyzers.fasta_analyzer import FastaAnalyzer
from analyzers.fastq_analyzer import FastqAnalyzer


# Load environment variables
print("[LOG] Loading environment variables from .env...")
load_dotenv()
print(f"[LOG] Environment variable PORT: {os.getenv('PORT')}")


# Initialize FastAPI app
print("[LOG] Creating FastAPI app instance...")
app = FastAPI(
    title="Genomic Analysis Engine",
    description="FastAPI microservice for genomic data analysis with oracle integration",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)
print("[LOG] FastAPI app created.")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class HealthResponse(BaseModel):
    status: str
    message: str
    timestamp: str
    service: str
    version: str

class AnalysisRequest(BaseModel):
    file_path: str
    analysis_type: str
    options: Dict[str, Any] = {}

# Health check endpoint
@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint for the analysis engine."""
    return HealthResponse(
        status="OK",
        message="Genomic Analysis Engine is running",
        timestamp=datetime.now().isoformat(),
        service="analysis-engine",
        version="1.0.0"
    )

# API info endpoint
@app.get("/")
async def api_info():
    """API information endpoint."""
    return {
        "name": "Genomic Analysis Engine",
        "description": "FastAPI microservice for genomic data analysis",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "docs": "/docs",
            "redoc": "/redoc",
            "analyze": "/analyze"
        },
        "supported_formats": ["FASTA", "FASTQ"],
        "analysis_types": ["basic", "mutation_detection", "gc_content"]
    }


# Real analysis endpoint
@app.post("/analyze")
async def analyze_genomic_data(request: AnalysisRequest):
    """
    Analyze genomic data from uploaded files.
    """
    try:
        file_path = request.file_path
        # Determine file type by extension
        ext = os.path.splitext(file_path)[1].lower()
        if ext in [".fasta", ".fa", ".fas"]:
            analyzer = FastaAnalyzer()
            result = analyzer.analyze_file(file_path)
        elif ext in [".fastq", ".fq"]:
            analyzer = FastqAnalyzer()
            result = analyzer.analyze_file(file_path)
        else:
            return {"error": f"Unsupported file extension: {ext}"}
        return {
            "status": "success" if "error" not in result else "error",
            "analysis_type": request.analysis_type,
            "timestamp": datetime.now().isoformat(),
            "analysis": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

# Oracle integration endpoint (placeholder)
@app.get("/oracle/status")
async def oracle_status():
    """Check oracle service connectivity."""
    return {
        "oracle_service": "connected",
        "external_databases": {
            "ncbi": "available",
            "clinvar": "available",
            "ensembl": "available"
        },
        "last_check": datetime.now().isoformat()
    }

if __name__ == "__main__":
    print("[LOG] __main__ block entered.")
    port = int(os.getenv("PORT", 8000))
    print(f"[LOG] Starting uvicorn on port {port}...")
    print(f"[LOG] Python executable: {os.sys.executable}")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )