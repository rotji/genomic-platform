import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Dna } from 'lucide-react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Logo and Description */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Dna className={styles.logoIcon} />
              <span className={styles.logoText}>Genomic Platform</span>
            </div>
            <p className={styles.description}>
              Democratizing genomic analysis with Web3 technology. 
              Making DNA/RNA insights accessible to hospitals, researchers, and communities worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.links}>
            <h3 className={styles.linkTitle}>Quick Links</h3>
            <div className={styles.linkList}>
              <Link to="/" className={styles.link}>Home</Link>
              <Link to="/upload" className={styles.link}>Upload DNA/RNA</Link>
              <Link to="/results" className={styles.link}>Results</Link>
              <Link to="/docs" className={styles.link}>Documentation</Link>
            </div>
          </div>

          {/* Resources */}
          <div className={styles.links}>
            <h3 className={styles.linkTitle}>Resources</h3>
            <div className={styles.linkList}>
              <a href="/docs/to%20do%20lists.md" className={styles.link}>Roadmap</a>
              <a href="/docs/pitch%20deck.md" className={styles.link}>About</a>
              <a href="https://docs.stacks.co/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                Stacks Docs
              </a>
              <a href="https://github.com/rotji/genomic-platform-frontend" target="_blank" rel="noopener noreferrer" className={styles.link}>
                GitHub
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className={styles.social}>
            <h3 className={styles.linkTitle}>Connect</h3>
            <div className={styles.socialLinks}>
              <a 
                href="https://github.com/rotji/genomic-platform-frontend" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="mailto:contact@genomicplatform.com"
                className={styles.socialLink}
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2025 Genomic Platform Team. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Privacy Policy</a>
            <a href="#" className={styles.bottomLink}>Terms of Service</a>
            <a href="#" className={styles.bottomLink}>License</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;