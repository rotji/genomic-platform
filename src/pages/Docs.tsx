import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, ExternalLink, Users, Zap, Shield } from 'lucide-react';
import styles from './Docs.module.css';

const Docs: React.FC = () => {
  return (
    <div className={styles.docs}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Documentation</h1>
          <p className={styles.description}>
            Comprehensive guides, technical documentation, and resources 
            for the Genomic Platform ecosystem.
          </p>
        </div>

        <div className={styles.content}>
          {/* Quick Start */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Zap size={24} />
              Quick Start
            </h2>
            <div className={styles.cardGrid}>
              <div className={styles.docCard}>
                <h3>Getting Started</h3>
                <p>Learn the basics of uploading and analyzing genomic data on our platform.</p>
                <Link to="/upload" className={styles.cardLink}>
                  Start Now <ExternalLink size={16} />
                </Link>
              </div>
              <div className={styles.docCard}>
                <h3>Platform Overview</h3>
                <p>Understand the vision, features, and capabilities of the genomic platform.</p>
                <a href="/docs/first%20documentation.md" className={styles.cardLink}>
                  Read More <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </section>

          {/* Technical Documentation */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Book size={24} />
              Technical Documentation
            </h2>
            <div className={styles.cardGrid}>
              <div className={styles.docCard}>
                <h3>Technical Roadmap</h3>
                <p>Detailed technical implementation plan and architecture overview.</p>
                <a href="/docs/third%20documentation.md" className={styles.cardLink}>
                  View Roadmap <ExternalLink size={16} />
                </a>
              </div>
              <div className={styles.docCard}>
                <h3>Complete Todo List</h3>
                <p>Full development roadmap from basic to complex features (55 items).</p>
                <a href="/docs/to%20do%20lists.md" className={styles.cardLink}>
                  View Todo List <ExternalLink size={16} />
                </a>
              </div>
              <div className={styles.docCard}>
                <h3>Smart Contracts Design</h3>
                <p>Clarity contracts blueprint for blockchain integration.</p>
                <a href="/docs/5th%20documentation.md" className={styles.cardLink}>
                  Smart Contracts <ExternalLink size={16} />
                </a>
              </div>
              <div className={styles.docCard}>
                <h3>System Architecture</h3>
                <p>Complete workflow and technical architecture documentation.</p>
                <a href="/docs/6th%20documentation.md" className={styles.cardLink}>
                  Architecture <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </section>

          {/* Business & Applications */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Users size={24} />
              Business & Applications
            </h2>
            <div className={styles.cardGrid}>
              <div className={styles.docCard}>
                <h3>Business Use Cases</h3>
                <p>Real-world stories and applications across different sectors.</p>
                <a href="/docs/10th%20documentation.md" className={styles.cardLink}>
                  Use Cases <ExternalLink size={16} />
                </a>
              </div>
              <div className={styles.docCard}>
                <h3>Pitch Deck</h3>
                <p>Platform vision, market opportunity, and investor presentation.</p>
                <a href="/docs/pitch%20deck.md" className={styles.cardLink}>
                  Pitch Deck <ExternalLink size={16} />
                </a>
              </div>
              <div className={styles.docCard}>
                <h3>UI/UX Design</h3>
                <p>User interface and experience design documentation.</p>
                <a href="/docs/ui%20ux.md" className={styles.cardLink}>
                  UI/UX Guide <ExternalLink size={16} />
                </a>
              </div>
              <div className={styles.docCard}>
                <h3>Why Not ChatGPT?</h3>
                <p>Understanding the limitations of AI tools for genomic analysis.</p>
                <a href="/docs/chatgpt%20limitation.md" className={styles.cardLink}>
                  Learn More <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </section>

          {/* Advanced Features */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Shield size={24} />
              Advanced Features
            </h2>
            <div className={styles.cardGrid}>
              <div className={styles.docCard}>
                <h3>NFT Integration</h3>
                <p>Genomic data ownership and NFT marketplace features.</p>
                <a href="/docs/11th%20documentation.md" className={styles.cardLink}>
                  NFT Features <ExternalLink size={16} />
                </a>
              </div>
              <div className={styles.docCard}>
                <h3>Data Storage Strategy</h3>
                <p>Size-aware DNA/RNA storage and processing architecture.</p>
                <a href="/docs/9th%20documentation.md" className={styles.cardLink}>
                  Storage Design <ExternalLink size={16} />
                </a>
              </div>
              <div className={styles.docCard}>
                <h3>Coding Best Practices</h3>
                <p>Development standards and professional coding guidelines.</p>
                <a href="/docs/8th%20documentation.md" className={styles.cardLink}>
                  Best Practices <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </section>

          {/* External Resources */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <FileText size={24} />
              External Resources
            </h2>
            <div className={styles.linkList}>
              <a href="https://docs.stacks.co/" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                Stacks Blockchain Documentation <ExternalLink size={16} />
              </a>
              <a href="https://docs.hiro.so/clarity/" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                Clarity Smart Contracts Guide <ExternalLink size={16} />
              </a>
              <a href="https://github.com/rotji/genomic-platform-frontend" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                GitHub Repository <ExternalLink size={16} />
              </a>
              <a href="https://vitejs.dev/guide/" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                Vite + React Documentation <ExternalLink size={16} />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Docs;