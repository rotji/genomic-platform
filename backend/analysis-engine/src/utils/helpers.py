"""
Helper utilities for genomic analysis
Common functions and data processing utilities
"""
import os
import hashlib
from typing import List, Dict, Any, Optional
from pathlib import Path

def validate_file_format(file_path: str, supported_formats: List[str]) -> bool:
    """
    Validate if file format is supported.
    
    Args:
        file_path (str): Path to the file
        supported_formats (List[str]): List of supported file extensions
        
    Returns:
        bool: True if format is supported
    """
    file_extension = Path(file_path).suffix.lower().lstrip('.')
    return file_extension in [fmt.lower() for fmt in supported_formats]

def calculate_file_hash(file_path: str) -> str:
    """
    Calculate SHA-256 hash of a file for integrity verification.
    
    Args:
        file_path (str): Path to the file
        
    Returns:
        str: SHA-256 hash of the file
    """
    sha256_hash = hashlib.sha256()
    
    with open(file_path, "rb") as f:
        # Read file in chunks to handle large files
        for chunk in iter(lambda: f.read(4096), b""):
            sha256_hash.update(chunk)
    
    return sha256_hash.hexdigest()

def get_file_info(file_path: str) -> Dict[str, Any]:
    """
    Get basic file information.
    
    Args:
        file_path (str): Path to the file
        
    Returns:
        Dict[str, Any]: File information including size, hash, etc.
    """
    if not os.path.exists(file_path):
        return {"error": "File not found"}
    
    stat = os.stat(file_path)
    
    return {
        "path": file_path,
        "name": os.path.basename(file_path),
        "size": stat.st_size,
        "size_mb": round(stat.st_size / (1024 * 1024), 2),
        "extension": Path(file_path).suffix.lower(),
        "hash": calculate_file_hash(file_path),
        "created": stat.st_ctime,
        "modified": stat.st_mtime
    }

def format_analysis_results(results: Dict[str, Any]) -> Dict[str, Any]:
    """
    Format analysis results for API response.
    
    Args:
        results (Dict[str, Any]): Raw analysis results
        
    Returns:
        Dict[str, Any]: Formatted results
    """
    return {
        "analysis_id": results.get("analysis_id", "unknown"),
        "status": results.get("status", "completed"),
        "file_info": results.get("file_info", {}),
        "results": results.get("results", {}),
        "oracle_verified": results.get("oracle_verified", False),
        "timestamp": results.get("timestamp"),
        "processing_time": results.get("processing_time", 0)
    }

def validate_genomic_sequence(sequence: str) -> Dict[str, Any]:
    """
    Basic validation of genomic sequence data.
    
    Args:
        sequence (str): Genomic sequence string
        
    Returns:
        Dict[str, Any]: Validation results
    """
    valid_nucleotides = set("ATCGN")
    sequence_upper = sequence.upper()
    
    invalid_chars = set(sequence_upper) - valid_nucleotides
    valid_nucleotide_count = sum(1 for char in sequence_upper if char in valid_nucleotides)
    
    return {
        "is_valid": len(invalid_chars) == 0,
        "length": len(sequence),
        "valid_nucleotides": valid_nucleotide_count,
        "invalid_characters": list(invalid_chars) if invalid_chars else [],
        "validity_percentage": round((valid_nucleotide_count / len(sequence)) * 100, 2) if sequence else 0
    }

def create_analysis_summary(analysis_data: Dict[str, Any]) -> str:
    """
    Create a human-readable summary of analysis results.
    
    Args:
        analysis_data (Dict[str, Any]): Analysis results data
        
    Returns:
        str: Human-readable summary
    """
    summary_lines = []
    
    if "file_type" in analysis_data:
        summary_lines.append(f"File Type: {analysis_data['file_type']}")
    
    if "sequence_count" in analysis_data:
        summary_lines.append(f"Sequences Analyzed: {analysis_data['sequence_count']}")
    
    if "statistics" in analysis_data:
        stats = analysis_data["statistics"]
        if "total_length" in stats:
            summary_lines.append(f"Total Sequence Length: {stats['total_length']:,} bp")
        if "average_gc_content" in stats:
            summary_lines.append(f"Average GC Content: {stats['average_gc_content']:.2f}%")
    
    return "\n".join(summary_lines) if summary_lines else "Analysis completed successfully"