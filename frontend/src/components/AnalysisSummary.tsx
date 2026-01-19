import React from "react";
import styles from "./AnalysisSummary.module.css";

interface Sequence {
  id: string;
  description: string;
  length: number;
  gc_content: number;
  composition: Record<string, number>;
  average_quality?: number;
}

interface AnalysisStatistics {
  total_length: number;
  average_length: number;
  average_gc_content: number;
  longest_sequence: number;
  shortest_sequence: number;
  average_quality?: number;
}

interface AnalysisResult {
  file_type: string;
  sequence_count: number;
  sequences: Sequence[];
  statistics: AnalysisStatistics;
}

interface Props {
  analysis: AnalysisResult;
}

const getGCColor = (gc: number) => {
  if (gc < 35) return "#fbbf24"; // yellow
  if (gc > 60) return "#f87171"; // red
  return "#34d399"; // green
};

const AnalysisSummary: React.FC<Props> = ({ analysis }) => {
  if (!analysis || (analysis as any).error) {
    return <div style={{ color: "red" }}>{(analysis as any)?.error || "No analysis available."}</div>;
  }
  const stats = analysis.statistics;
  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryHeader}>
        <h2>DNA ANALYSIS RESULT</h2>
        <h3>File Summary</h3>
        <ul>
          <li>
            <b>File type:</b> {analysis.file_type}
          </li>
          <li>
            <b>Number of sequences:</b> {analysis.sequence_count}
          </li>
          <li>
            <b>Total length:</b> {stats.total_length} bases
          </li>
          <li>
            <b>Average sequence length:</b> {stats.average_length} bases
          </li>
          <li>
            <b>Average GC content:</b> <span style={{ color: getGCColor(stats.average_gc_content) }}>{stats.average_gc_content}%</span>
          </li>
          {typeof stats.average_quality === "number" && (
            <li>
              <b>Average quality score:</b> {stats.average_quality}
            </li>
          )}
          <li>
            <b>Longest sequence:</b> {stats.longest_sequence} bases
          </li>
          <li>
            <b>Shortest sequence:</b> {stats.shortest_sequence} bases
          </li>
        </ul>
      </div>
      <div className={styles.sequenceTableSection}>
        <h4>Sequences</h4>
        <div className={styles.sequenceTableWrapper}>
          <table className={styles.sequenceTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Length</th>
                <th>GC %</th>
                {analysis.file_type === "FASTQ" && <th>Avg. Quality</th>}
                <th>Nucleotide Composition</th>
              </tr>
            </thead>
            <tbody>
              {analysis.sequences.map((seq, idx) => (
                <tr key={seq.id || idx}>
                  <td>{seq.id}</td>
                  <td>{seq.description}</td>
                  <td>{seq.length}</td>
                  <td>
                    <span style={{ color: getGCColor(seq.gc_content) }}>{seq.gc_content}%</span>
                    <div className={styles.gcBarBg}>
                      <div
                        className={styles.gcBar}
                        style={{ width: `${seq.gc_content}%`, background: getGCColor(seq.gc_content) }}
                      />
                    </div>
                  </td>
                  {analysis.file_type === "FASTQ" && (
                    <td>
                      {typeof seq.average_quality === "number" ? (
                        <span>{seq.average_quality}</span>
                      ) : (
                        <span style={{ color: "#f87171" }}>N/A</span>
                      )}
                    </td>
                  )}
                  <td>
                    {Object.entries(seq.composition)
                      .filter(([nt, count]) => count > 0)
                      .map(([nt, count]) => (
                        <span key={nt} className={styles.ntComp}>
                          {nt}: {count}
                        </span>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.plainEnglishSection}>
        <h4>Plain English Summary</h4>
        <p>
          This file contains <b>{analysis.sequence_count}</b> {analysis.file_type === "FASTQ" ? "RNA/DNA reads" : "DNA sequences"}. The average sequence length is <b>{stats.average_length}</b> bases, and the average GC content is <b>{stats.average_gc_content}%</b>.
          {typeof stats.average_quality === "number" && (
            <> The average quality score is <b>{stats.average_quality}</b>.</>
          )}
          The longest sequence is <b>{stats.longest_sequence}</b> bases, and the shortest is <b>{stats.shortest_sequence}</b> bases.
        </p>
        {analysis.sequences.some(seq => seq.gc_content < 35 || seq.gc_content > 60) && (
          <p style={{ color: "#f87171" }}>
            <b>Note:</b> Some sequences have unusual GC content (outside the typical 35-60% range).
          </p>
        )}
      </div>
    </div>
  );
};

export default AnalysisSummary;
