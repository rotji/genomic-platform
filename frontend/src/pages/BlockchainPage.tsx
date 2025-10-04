import React from 'react';
import WalletConnect from '../components/WalletConnect';
import styles from './BlockchainPage.module.css';

const BlockchainPage: React.FC = () => {
  return (
    <div className={styles.blockchainPage}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>🔗 Blockchain Integration</h1>
          <p>Connect your Stacks wallet and interact with our genomic data contracts</p>
        </header>
        
        <main>
          <WalletConnect />
          
          <section className={styles.infoSection}>
            <h2>About Our Blockchain Integration</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3>🔒 Immutable Storage</h3>
                <p>Store genomic analysis results permanently on the Stacks blockchain with cryptographic proof of integrity.</p>
              </div>
              
              <div className={styles.infoCard}>
                <h3>🔍 Oracle Verification</h3>
                <p>External data sources are verified through our decentralized oracle network for enhanced reliability.</p>
              </div>
              
              <div className={styles.infoCard}>
                <h3>🏥 Privacy First</h3>
                <p>Only file hashes and analysis metadata are stored on-chain, ensuring patient privacy while maintaining verifiability.</p>
              </div>
              
              <div className={styles.infoCard}>
                <h3>💰 Transparent Costs</h3>
                <p>All transaction costs are transparent and paid in STX tokens, with no hidden fees or intermediaries.</p>
              </div>
            </div>
          </section>
          
          <section className={styles.contractsSection}>
            <h2>📄 Smart Contracts</h2>
            <div className={styles.contractsList}>
              <div className={styles.contractItem}>
                <div>
                  <h4>genomic-data-storage.clar</h4>
                  <p>Stores analysis results with Oracle verification status</p>
                </div>
                <span className={`${styles.statusBadge} ${styles.statusReady}`}>✅ Validated</span>
              </div>
              
              <div className={styles.contractItem}>
                <div>
                  <h4>oracle-verification.clar</h4>
                  <p>Manages external data source verification and consensus</p>
                </div>
                <span className={`${styles.statusBadge} ${styles.statusReady}`}>✅ Validated</span>
              </div>
              
              <div className={styles.contractItem}>
                <div>
                  <h4>Testnet Deployment</h4>
                  <p>Deploy contracts to Stacks testnet for live testing</p>
                </div>
                <span className={`${styles.statusBadge} ${styles.statusPending}`}>⏳ Pending</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BlockchainPage;