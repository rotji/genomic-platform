import React from 'react';
import { Upload as UploadIcon, FileText, Info } from 'lucide-react';
import styles from './Upload.module.css';

const Upload: React.FC = () => {
  return (
    <div className={styles.upload}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Upload DNA/RNA Sequences</h1>
          <p className={styles.description}>
            Upload your genomic data files for classical analysis. 
            Supported formats: FASTA, FASTQ, VCF, BAM, and plain text sequences.
          </p>
        </div>

        <div className={styles.content}>
          {/* Upload Area */}
          <div className={styles.uploadSection}>
            <div className={styles.uploadArea}>
              <div className={styles.uploadIcon}>
                <UploadIcon size={48} />
              </div>
              <h3 className={styles.uploadTitle}>Drop files here or click to browse</h3>
              <p className={styles.uploadText}>
                Maximum file size: 200GB • Supported formats: FASTA, FASTQ, VCF, BAM, TXT
              </p>
              <button className={styles.browseButton}>
                <FileText size={20} />
                Choose Files
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div className={styles.infoPanel}>
            <div className={styles.infoHeader}>
              <Info size={24} />
              <h3>What happens next?</h3>
            </div>
            <div className={styles.infoContent}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h4>File Upload</h4>
                  <p>Your files are uploaded securely and stored with encryption</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h4>Analysis Queue</h4>
                  <p>Classical genomic analysis pipeline processes your data</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h4>Results Ready</h4>
                  <p>Get mutation detection, annotations, and downloadable reports</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h4>Blockchain Record</h4>
                  <p>Analysis proof stored immutably on Stacks blockchain</p>
                </div>
              </div>
            </div>

            <div className={styles.supportedFormats}>
              <h4>Supported File Formats</h4>
              <div className={styles.formatList}>
                <span className={styles.format}>FASTA</span>
                <span className={styles.format}>FASTQ</span>
                <span className={styles.format}>VCF</span>
                <span className={styles.format}>BAM</span>
                <span className={styles.format}>TXT</span>
                <span className={styles.format}>CSV</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className={styles.recentSection}>
          <h3 className={styles.recentTitle}>Recent Uploads</h3>
          <div className={styles.emptyState}>
            <p>No uploads yet. Upload your first genomic file to get started!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;