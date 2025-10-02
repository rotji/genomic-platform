"""
FASTA file analyzer using BioPython
Provides basic genomic sequence analysis functionality
"""
from typing import Dict, List, Any
from Bio import SeqIO
from Bio.Seq import Seq
from Bio.SeqUtils import GC
import io

class FastaAnalyzer:
    """Analyzer for FASTA format genomic files."""
    
    def __init__(self):
        self.supported_formats = ["fasta", "fa", "fas"]
    
    def analyze_file(self, file_path: str) -> Dict[str, Any]:
        """
        Analyze a FASTA file and return basic statistics.
        
        Args:
            file_path (str): Path to the FASTA file
            
        Returns:
            Dict[str, Any]: Analysis results including sequence stats
        """
        try:
            sequences = list(SeqIO.parse(file_path, "fasta"))
            
            if not sequences:
                return {"error": "No sequences found in file"}
            
            results = {
                "file_type": "FASTA",
                "sequence_count": len(sequences),
                "sequences": []
            }
            
            total_length = 0
            gc_contents = []
            
            for i, record in enumerate(sequences):
                seq_info = {
                    "id": record.id,
                    "description": record.description,
                    "length": len(record.seq),
                    "gc_content": round(GC(record.seq), 2),
                    "composition": self._get_nucleotide_composition(record.seq)
                }
                
                results["sequences"].append(seq_info)
                total_length += len(record.seq)
                gc_contents.append(GC(record.seq))
            
            # Overall statistics
            results["statistics"] = {
                "total_length": total_length,
                "average_length": round(total_length / len(sequences), 2),
                "average_gc_content": round(sum(gc_contents) / len(gc_contents), 2),
                "longest_sequence": max(len(seq.seq) for seq in sequences),
                "shortest_sequence": min(len(seq.seq) for seq in sequences)
            }
            
            return results
            
        except Exception as e:
            return {"error": f"Failed to analyze FASTA file: {str(e)}"}
    
    def _get_nucleotide_composition(self, sequence: Seq) -> Dict[str, int]:
        """Calculate nucleotide composition of a sequence."""
        composition = {
            "A": sequence.count("A"),
            "T": sequence.count("T"),
            "G": sequence.count("G"),
            "C": sequence.count("C"),
            "N": sequence.count("N"),
            "other": 0
        }
        
        # Count other nucleotides
        total_known = sum(composition.values())
        composition["other"] = len(sequence) - total_known
        
        return composition
    
    def detect_mutations(self, sequence: Seq, reference: Seq) -> List[Dict[str, Any]]:
        """
        Basic mutation detection by comparing with reference sequence.
        
        Args:
            sequence (Seq): Query sequence
            reference (Seq): Reference sequence
            
        Returns:
            List[Dict[str, Any]]: List of detected mutations
        """
        mutations = []
        
        # Simple position-by-position comparison
        min_length = min(len(sequence), len(reference))
        
        for i in range(min_length):
            if sequence[i] != reference[i]:
                mutation = {
                    "position": i + 1,  # 1-based position
                    "reference": reference[i],
                    "variant": sequence[i],
                    "type": "substitution"
                }
                mutations.append(mutation)
        
        # Check for length differences
        if len(sequence) != len(reference):
            if len(sequence) > len(reference):
                mutations.append({
                    "position": len(reference) + 1,
                    "type": "insertion",
                    "length": len(sequence) - len(reference)
                })
            else:
                mutations.append({
                    "position": len(sequence) + 1,
                    "type": "deletion",
                    "length": len(reference) - len(sequence)
                })
        
        return mutations