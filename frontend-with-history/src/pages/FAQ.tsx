import React from 'react';
import styles from './FAQ.module.css';

const FAQ: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <p className={styles.subtitle}>
          Find answers to common questions about our genomic analysis platform
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.notice}>
          <h2>📋 Comprehensive FAQ Available</h2>
          <p>
            We've prepared a detailed FAQ document that addresses all stakeholder questions 
            including technical specifications, business model, competitive analysis, and future roadmap.
          </p>
          <div className={styles.actions}>
            <a 
              href="/docs/FAQ.md" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.viewButton}
            >
              View Complete FAQ Document
            </a>
            <a 
              href="https://github.com/rotji/genomic-platform-frontend/blob/main/docs/FAQ.md" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.githubButton}
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className={styles.quickFaq}>
          <h2>Quick Answers</h2>
          
          <div className={styles.faqItem}>
            <h3>What is the Genomic Platform?</h3>
            <p>
              Our platform democratizes genomic analysis by providing AI-powered tools for 
              researchers, clinicians, and institutions. We integrate NVIDIA BioNeMo EVO2 
              for genetic code generation and offer intuitive interfaces for complex genomic workflows.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>What file formats do you support?</h3>
            <p>
              We support all major genomic file formats including FASTA/FASTQ, SAM/BAM/CRAM, 
              VCF/BCF, BED/GFF/GTF, and specialized formats for expression data and medical imaging.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>How secure is my genomic data?</h3>
            <p>
              We implement end-to-end encryption, HIPAA compliance, blockchain provenance tracking, 
              and role-based access controls. Your data remains under your complete ownership and control.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>What makes you different from competitors?</h3>
            <p>
              Our unique combination of AI-first approach with NVIDIA BioNeMo EVO2, blockchain innovation, 
              radical simplicity for non-experts, and transparent pay-per-analysis pricing sets us apart 
              from traditional expensive enterprise solutions.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>How much does it cost?</h3>
            <p>
              We offer flexible pricing: $10-1000 per analysis based on data size, plus subscription 
              tiers starting at $99/month for researchers. This represents a 90% cost reduction 
              compared to building in-house infrastructure.
            </p>
          </div>

          <div className={styles.faqItem}>
            <h3>Can I try the platform?</h3>
            <p>
              Yes! Sign up for a free account to explore our dashboard, upload sample files, 
              and experience our AI-powered genomic analysis capabilities. Beta testing is 
              currently available for qualified research institutions.
            </p>
          </div>
        </div>

        <div className={styles.contact}>
          <h3>Still have questions?</h3>
          <p>
            Contact our support team for personalized assistance with your genomic analysis needs.
          </p>
          <div className={styles.contactButtons}>
            <button className={styles.primaryButton}>Contact Support</button>
            <button className={styles.secondaryButton}>Schedule Demo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;