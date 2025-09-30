import React from 'react';
import { FileText, Download, Search, Filter } from 'lucide-react';
import styles from './Results.module.css';

const Results: React.FC = () => {
  return (
    <div className={styles.results}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Analysis Results</h1>
          <p className={styles.description}>
            View and download your genomic analysis results. 
            All results are verified and stored on the blockchain for transparency.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search by filename, mutation, or gene..."
              className={styles.searchInput}
            />
          </div>
          <button className={styles.filterButton}>
            <Filter size={20} />
            Filter
          </button>
        </div>

        {/* Results Content */}
        <div className={styles.content}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FileText size={64} />
            </div>
            <h3 className={styles.emptyTitle}>No Analysis Results Yet</h3>
            <p className={styles.emptyDescription}>
              Upload your DNA/RNA sequences to start your first genomic analysis. 
              Results will appear here once processing is complete.
            </p>
            <button className={styles.uploadButton}>
              <FileText size={20} />
              Upload Your First File
            </button>
          </div>

          {/* Example Results Table (hidden by default) */}
          <div className={styles.resultsTable} style={{ display: 'none' }}>
            <div className={styles.tableHeader}>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>File Name</div>
                <div className={styles.tableCell}>Analysis Type</div>
                <div className={styles.tableCell}>Status</div>
                <div className={styles.tableCell}>Date</div>
                <div className={styles.tableCell}>Actions</div>
              </div>
            </div>
            <div className={styles.tableBody}>
              <div className={styles.tableRow}>
                <div className={styles.tableCell}>sample_dna.fasta</div>
                <div className={styles.tableCell}>Mutation Detection</div>
                <div className={styles.tableCell}>
                  <span className={styles.statusComplete}>Completed</span>
                </div>
                <div className={styles.tableCell}>2025-09-29</div>
                <div className={styles.tableCell}>
                  <button className={styles.actionButton}>
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Panel */}
        <div className={styles.statsPanel}>
          <h3 className={styles.statsTitle}>Your Statistics</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>0</div>
              <div className={styles.statLabel}>Total Analyses</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>0</div>
              <div className={styles.statLabel}>Files Uploaded</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>0</div>
              <div className={styles.statLabel}>Mutations Found</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>0</div>
              <div className={styles.statLabel}>Reports Generated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;