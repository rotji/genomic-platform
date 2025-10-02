import React from 'react';
import { Link } from 'react-router-dom';
import { Dna, Upload, FileText, Shield, Zap, Globe } from 'lucide-react';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Upload Your <span className={styles.highlight}>DNA/RNA Data Files</span> 
              <br />For Analysis
            </h1>
            <p className={styles.heroDescription}>
              A comprehensive Web3 native genomic analysis platform that democratizes DNA/RNA analysis. 
              Built for hospitals, labs, researchers, students, companies, and communities - 
              making advanced genetic analysis accessible to everyone, everywhere.
            </p>
            <div className={styles.heroActions}>
              <Link to="/upload" className={styles.primaryButton}>
                <Upload size={20} />
                Start Analysis
              </Link>
              <Link to="/docs" className={styles.secondaryButton}>
                <FileText size={20} />
                Learn More
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.dnaIcon}>
              <Dna size={120} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Platform Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Dna size={32} />
              </div>
              <h3 className={styles.featureTitle}>AI Genetic Code Generation</h3>
              <p className={styles.featureDescription}>
                Revolutionary AI-powered genetic design using NVIDIA BioNeMo EVO2 and 
                alternatives. Generate new proteins, optimize DNA sequences, and design synthetic biology systems.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Dna size={32} />
              </div>
              <h3 className={styles.featureTitle}>Classical Genomic Analysis</h3>
              <p className={styles.featureDescription}>
                Mutation detection, sequence alignment, drug resistance screening, 
                and comprehensive genomic annotations using proven bioinformatics methods.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Shield size={32} />
              </div>
              <h3 className={styles.featureTitle}>Blockchain Security</h3>
              <p className={styles.featureDescription}>
                Immutable data provenance and secure access control powered by 
                Stacks blockchain and Clarity smart contracts.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Zap size={32} />
              </div>
              <h3 className={styles.featureTitle}>Fast & Accessible</h3>
              <p className={styles.featureDescription}>
                No bioinformatics expertise required. Upload sequences and get 
                clinical-grade reports in minutes, not days.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Globe size={32} />
              </div>
              <h3 className={styles.featureTitle}>Global Impact</h3>
              <p className={styles.featureDescription}>
                Serving healthcare, research, education, agriculture, and forensics 
                sectors with specialized genomic tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className={styles.useCases}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Real-World Applications</h2>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCaseCard}>
              <h3>🏥 Healthcare & Clinical</h3>
              <p>Drug resistance detection, clinical reporting, personalized medicine</p>
            </div>
            <div className={styles.useCaseCard}>
              <h3>🔬 Research & Academia</h3>
              <p>Bioinformatics tools, mutation analysis, collaborative research</p>
            </div>
            <div className={styles.useCaseCard}>
              <h3>🎓 Education & Training</h3>
              <p>Interactive genomics learning, student projects, certification</p>
            </div>
            <div className={styles.useCaseCard}>
              <h3>🌱 Agriculture & Veterinary</h3>
              <p>Crop pathogen detection, livestock genomics, food authentication</p>
            </div>
            <div className={styles.useCaseCard}>
              <h3>🔍 Forensics & Legal</h3>
              <p>DNA identification, wildlife protection, food traceability</p>
            </div>
            <div className={styles.useCaseCard}>
              <h3>🌍 Global Surveillance</h3>
              <p>Outbreak tracking, resistance monitoring, public health alerts</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Start Your Genomic Analysis?</h2>
            <p className={styles.ctaDescription}>
              Upload your DNA/RNA sequences and experience the future of accessible genomics.
            </p>
            <Link to="/upload" className={styles.ctaButton}>
              <Upload size={20} />
              Upload Your Data
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;