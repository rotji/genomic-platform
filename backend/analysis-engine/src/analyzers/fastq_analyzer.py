"""
FASTQ file analyzer using BioPython
Provides basic sequence and quality statistics for FASTQ files
"""
from typing import Dict, List, Any
from Bio import SeqIO
from Bio.Seq import Seq

class FastqAnalyzer:
	"""Analyzer for FASTQ format genomic files."""
    
	def __init__(self):
		self.supported_formats = ["fastq", "fq"]
    
	def analyze_file(self, file_path: str) -> Dict[str, Any]:
		"""
		Analyze a FASTQ file and return basic statistics.
		Args:
			file_path (str): Path to the FASTQ file
		Returns:
			Dict[str, Any]: Analysis results including sequence and quality stats
		"""
		try:
			sequences = list(SeqIO.parse(file_path, "fastq"))
			if not sequences:
				return {"error": "No sequences found in file"}
			results = {
				"file_type": "FASTQ",
				"sequence_count": len(sequences),
				"sequences": []
			}
			total_length = 0
			total_qualities = 0
			all_qualities = []
			for record in sequences:
				qualities = record.letter_annotations.get("phred_quality", [])
				avg_quality = round(sum(qualities) / len(qualities), 2) if qualities else None
				seq_info = {
					"id": record.id,
					"description": record.description,
					"length": len(record.seq),
					"average_quality": avg_quality,
					"gc_content": round(self._gc_content(record.seq), 2),
					"composition": self._get_nucleotide_composition(record.seq)
				}
				results["sequences"].append(seq_info)
				total_length += len(record.seq)
				if avg_quality is not None:
					total_qualities += avg_quality
					all_qualities.extend(qualities)
			results["statistics"] = {
				"total_length": total_length,
				"average_length": round(total_length / len(sequences), 2),
				"average_quality": round(sum(all_qualities) / len(all_qualities), 2) if all_qualities else None,
				"average_gc_content": round(sum(seq["gc_content"] for seq in results["sequences"]) / len(results["sequences"]), 2),
				"longest_sequence": max(len(seq.seq) for seq in sequences),
				"shortest_sequence": min(len(seq.seq) for seq in sequences)
			}
			return results
		except Exception as e:
			return {"error": f"Failed to analyze FASTQ file: {str(e)}"}

	def _gc_content(self, sequence: Seq) -> float:
		gc = sequence.count("G") + sequence.count("C")
		return (gc / len(sequence)) * 100 if len(sequence) > 0 else 0.0

	def _get_nucleotide_composition(self, sequence: Seq) -> Dict[str, int]:
		composition = {
			"A": sequence.count("A"),
			"T": sequence.count("T"),
			"G": sequence.count("G"),
			"C": sequence.count("C"),
			"N": sequence.count("N"),
			"other": 0
		}
		total_known = sum(composition.values())
		composition["other"] = len(sequence) - total_known
		return composition