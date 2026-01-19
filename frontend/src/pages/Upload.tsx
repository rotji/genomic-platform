import AnalysisSummary from '../components/AnalysisSummary';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, FileText, Info, X, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useFileUpload } from '../hooks/useFileUpload';
import type { UploadFileState } from '../hooks/useFileUpload';
import styles from './Upload.module.css';

const ACCEPTED_FORMATS = {
  'text/plain': ['.txt', '.fasta', '.fastq', '.fa', '.fq'],
  'application/octet-stream': ['.bam', '.sam'],
  'text/csv': ['.csv'],
  'application/json': ['.vcf'],
};

const MAX_FILE_SIZE = 200 * 1024 * 1024 * 1024; // 200GB

const Upload: React.FC = () => {
  const { uploadedFiles, uploadFile, removeFile } = useFileUpload();

  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return { isValid: false, error: 'File size exceeds 200GB limit' };
    }

    // Check file extension
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    const supportedExtensions = Object.values(ACCEPTED_FORMATS).flat();
    
    if (!supportedExtensions.includes(extension)) {
      return { 
        isValid: false, 
        error: `Unsupported file format. Supported: ${supportedExtensions.join(', ')}` 
      };
    }

    return { isValid: true };
  };

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((error: any) => {
        toast.error(`${file.name}: ${error.message}`);
      });
    });

    // Process accepted files
    acceptedFiles.forEach(file => {
      const validation = validateFile(file);
      
      if (!validation.isValid) {
        toast.error(`${file.name}: ${validation.error}`);
        return;
      }

      // Use the real upload function from our hook
      uploadFile(file);
    });
  }, [uploadFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FORMATS,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadFileState['status']) => {
    switch (status) {
      case 'uploading':
        return <Clock className={styles.statusIcon} />;
      case 'completed':
        return <CheckCircle className={styles.statusIcon} />;
      case 'error':
        return <AlertCircle className={styles.statusIcon} />;
      default:
        return <Clock className={styles.statusIcon} />;
    }
  };
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
          {/* Enhanced Upload Area with Drag & Drop */}
          <div className={styles.uploadSection}>
            <div 
              {...getRootProps()} 
              className={`${styles.uploadArea} ${isDragActive ? styles.dragActive : ''}`}
            >
              <input {...getInputProps()} />
              <div className={styles.uploadIcon}>
                <UploadIcon size={48} />
              </div>
              <h3 className={styles.uploadTitle}>
                {isDragActive ? 'Drop files here...' : 'Drop files here or click to browse'}
              </h3>
              <p className={styles.uploadText}>
                Maximum file size: 200GB • Supported formats: FASTA, FASTQ, VCF, BAM, TXT
              </p>
              <button className={styles.browseButton} type="button">
                <FileText size={20} />
                Choose Files
              </button>
            </div>

            {/* File Upload List */}
            {uploadedFiles.length > 0 && (
              <div className={styles.fileList}>
                <h4 className={styles.fileListTitle}>Uploaded Files</h4>
                {uploadedFiles.map(file => (
                  <div key={file.id} className={styles.fileItem}>
                    <div className={styles.fileInfo}>
                      <div className={styles.fileName}>
                        {getStatusIcon(file.status)}
                        <span>{file.name}</span>
                      </div>
                      <div className={styles.fileDetails}>
                        <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
                        {file.status === 'completed' && file.uploadedData && (
                          <>
                            <span className={styles.fileFormat}>
                              {file.type} • Uploaded at {new Date(file.uploadedData.uploadedAt).toLocaleTimeString()}
                            </span>
                            {file.uploadedData.analysis && (
                              <div className={styles.analysisResult}>
                                <strong>DNA Analysis Result:</strong>
                                <AnalysisSummary analysis={file.uploadedData.analysis.analysis} />
                              </div>
                            )}


                          </>
                        )}
                        {file.status === 'error' && file.error && (
                          <span className={styles.fileError}>
                            Error: {file.error}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {file.status === 'uploading' && (
                      <div className={styles.progressSection}>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill}
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <span className={styles.progressText}>{Math.round(file.progress)}%</span>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => removeFile(file.id)}
                      className={styles.removeButton}
                      type="button"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
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

        {/* Recent Uploads Section */}
        <div className={styles.recentSection}>
          <h3 className={styles.recentTitle}>Upload Summary</h3>
          {uploadedFiles.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No uploads yet. Upload your first genomic file to get started!</p>
            </div>
          ) : (
            <div className={styles.uploadStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{uploadedFiles.length}</span>
                <span className={styles.statLabel}>Files Uploaded</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  {uploadedFiles.filter(f => f.status === 'completed').length}
                </span>
                <span className={styles.statLabel}>Completed</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  {uploadedFiles.filter(f => f.status === 'uploading').length}
                </span>
                <span className={styles.statLabel}>In Progress</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;