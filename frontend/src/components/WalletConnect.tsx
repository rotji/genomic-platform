import React, { useState } from 'react';
import { showConnect, type FinishedAuthData } from '@stacks/connect';
import { StacksTestnet } from '@stacks/network';
import { 
  stringAsciiCV, 
  makeContractCall,
  broadcastTransaction,
  AnchorMode
} from '@stacks/transactions';
import styles from './WalletConnect.module.css';

interface WalletState {
  isConnected: boolean;
  userAddress: string | null;
  network: string;
}

const WalletConnect: React.FC = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    userAddress: null,
    network: 'testnet'
  });

  const [isConnecting, setIsConnecting] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<string | null>(null);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      showConnect({
        appDetails: {
          name: 'Genomic Platform',
          icon: '/vite.svg',
        },
        redirectTo: '/',
        onFinish: (data: FinishedAuthData) => {
          console.log('Wallet connected:', data);
          setWalletState({
            isConnected: true,
            userAddress: data.userSession.loadUserData().profile.stxAddress.testnet,
            network: 'testnet'
          });
          setIsConnecting(false);
        },
        onCancel: () => {
          console.log('Wallet connection cancelled');
          setIsConnecting(false);
        }
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      userAddress: null,
      network: 'testnet'
    });
    // Clear any stored session data
    localStorage.removeItem('blockstack-session');
  };

  // Example function to interact with our genomic data storage contract
  const storeAnalysisResult = async (
    analysisId: string,
    fileHash: string,
    resultsHash: string,
    analysisType: string,
    metadata: string
  ) => {
    if (!walletState.isConnected || !walletState.userAddress) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const network = new StacksTestnet();
      
      // This would be the actual contract address once deployed
      const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
      const contractName = 'genomic-data-storage';
      
      const txOptions = {
        contractAddress,
        contractName,
        functionName: 'store-analysis',
        functionArgs: [
          stringAsciiCV(analysisId),
          stringAsciiCV(fileHash),
          stringAsciiCV(resultsHash),
          stringAsciiCV(analysisType),
          stringAsciiCV(metadata)
        ],
        senderKey: walletState.userAddress,
        network,
        anchorMode: AnchorMode.Any,
      };

      const transaction = await makeContractCall(txOptions);
      const broadcastResponse = await broadcastTransaction(transaction, network);
      
      setLastTransaction(broadcastResponse.txid);
      console.log('Transaction broadcasted:', broadcastResponse);
      
    } catch (error) {
      console.error('Failed to store analysis result:', error);
      alert('Failed to store analysis result on blockchain');
    }
  };

  return (
    <div className={styles.walletConnectContainer}>
      <div className={styles.walletStatus}>
        <h3>🦄 Stacks Wallet Connection</h3>
        
        {!walletState.isConnected ? (
          <div className={styles.connectSection}>
            <p>Connect your Stacks wallet to interact with the blockchain</p>
            <button 
              onClick={connectWallet}
              disabled={isConnecting}
              className={styles.connectButton}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        ) : (
          <div className={styles.connectedSection}>
            <div className={styles.walletInfo}>
              <p><strong>Status:</strong> ✅ Connected</p>
              <p><strong>Network:</strong> {walletState.network}</p>
              <p><strong>Address:</strong> {walletState.userAddress}</p>
            </div>
            
            <div className={styles.actions}>
              <button 
                onClick={disconnectWallet}
                className={styles.disconnectButton}
              >
                Disconnect Wallet
              </button>
            </div>
            
            {lastTransaction && (
              <div className={styles.lastTransaction}>
                <p><strong>Last Transaction:</strong></p>
                <code>{lastTransaction}</code>
                <a 
                  href={`https://explorer.stacks.co/txid/${lastTransaction}?chain=testnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Explorer
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Demo section for testing contract interaction */}
      {walletState.isConnected && (
        <div className={styles.demoSection}>
          <h4>🧬 Test Contract Interaction</h4>
          <p>Once contracts are deployed, you can test storing analysis results on the blockchain.</p>
          <button 
            onClick={() => storeAnalysisResult(
              'test-analysis-001',
              'sha256-hash-of-file',
              'sha256-hash-of-results',
              'genome-sequencing',
              'Sample genomic analysis metadata'
            )}
            className={styles.testContractButton}
          >
            Test Store Analysis (Demo)
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;