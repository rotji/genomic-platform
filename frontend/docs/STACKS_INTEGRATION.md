# 🔗 Stacks Integration Documentation

## Overview
This document details the extensive integration of Stacks.js throughout the genomic platform, covering authentication, smart contract interactions, oracle communication, and blockchain-based workflows.

## 🎯 Stacks.js Integration Philosophy

Our platform is **blockchain-first**, meaning every critical operation leverages Stacks blockchain capabilities:
- **User Identity**: Stacks wallet-based authentication
- **Data Provenance**: Immutable file and analysis tracking
- **Oracle Verification**: Blockchain-verified external data
- **Payment Processing**: STX token-based transactions
- **Proof Generation**: Cryptographic analysis certificates

## 🏗️ Frontend Integration Architecture

### Core Stacks.js Setup
```typescript
// src/lib/stacks.ts
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';
import { 
  makeContractCall, 
  callReadOnlyFunction,
  makeSTXTokenTransfer,
  broadcastTransaction 
} from '@stacks/transactions';

export const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });
export const network = new StacksTestnet(); // Switch to StacksMainnet for production

// Contract deployment addresses
export const CONTRACTS = {
  USER_REGISTRY: 'ST1...ABC.user-registry',
  FILE_REGISTRY: 'ST1...DEF.file-registry', 
  ANALYSIS_PROOF: 'ST1...GHI.analysis-proof',
  GENOMIC_ORACLE: 'ST1...JKL.genomic-oracle',
  PAYMENT_PROCESSOR: 'ST1...MNO.payment-processor'
};
```

## 🔐 Authentication & User Management

### Stacks Connect Integration
```typescript
// src/hooks/useStacksAuth.tsx
import { useCallback, useEffect, useState } from 'react';
import { showConnect } from '@stacks/connect';
import { userSession, appConfig } from '../lib/stacks';

export const useStacksAuth = () => {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const connectWallet = useCallback(() => {
    showConnect({
      appDetails: {
        name: 'Genomic Platform',
        icon: window.location.origin + '/logo.svg',
      },
      redirectTo: '/',
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  }, []);

  const signOut = useCallback(() => {
    userSession.signUserOut('/');
  }, []);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
        setIsAuthenticated(true);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
      setIsAuthenticated(true);
    }
  }, []);

  return {
    userData,
    isAuthenticated,
    connectWallet,
    signOut,
    userSession
  };
};
```

### User Registry Smart Contract Integration
```typescript
// src/services/userService.ts
import { callReadOnlyFunction, makeContractCall } from '@stacks/transactions';
import { network, CONTRACTS } from '../lib/stacks';

export class UserService {
  async registerUser(userData: UserData): Promise<string> {
    const txOptions = {
      contractAddress: CONTRACTS.USER_REGISTRY.split('.')[0],
      contractName: CONTRACTS.USER_REGISTRY.split('.')[1],
      functionName: 'register-user',
      functionArgs: [
        stringAsciiCV(userData.profile.stxAddress.testnet),
        stringAsciiCV(userData.profile.name || ''),
        stringAsciiCV(userData.profile.description || '')
      ],
      senderKey: userData.appPrivateKey,
      network,
      postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractCall(txOptions);
    return await broadcastTransaction(transaction, network);
  }

  async getUserProfile(address: string): Promise<UserProfile | null> {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACTS.USER_REGISTRY.split('.')[0],
      contractName: CONTRACTS.USER_REGISTRY.split('.')[1],
      functionName: 'get-user',
      functionArgs: [principalCV(address)],
      network,
      senderAddress: address,
    });

    return result ? this.parseUserProfile(result) : null;
  }
}
```

## 📁 File Management & Blockchain Registration

### File Upload with Blockchain Proof
```typescript
// src/services/fileService.ts
import { sha256 } from '@stacks/encryption';
import { makeContractCall } from '@stacks/transactions';

export class FileService {
  async uploadFile(file: File, userSession: UserSession): Promise<UploadResult> {
    // 1. Generate file hash
    const arrayBuffer = await file.arrayBuffer();
    const fileHash = sha256(new Uint8Array(arrayBuffer));
    
    // 2. Upload to backend
    const uploadResponse = await this.uploadToBackend(file, fileHash);
    
    // 3. Register on blockchain
    const txId = await this.registerFileOnChain(file, fileHash, userSession);
    
    return {
      fileId: uploadResponse.fileId,
      fileHash,
      transactionId: txId,
      blockchainProof: true
    };
  }

  private async registerFileOnChain(
    file: File, 
    fileHash: string, 
    userSession: UserSession
  ): Promise<string> {
    const userData = userSession.loadUserData();
    
    const txOptions = {
      contractAddress: CONTRACTS.FILE_REGISTRY.split('.')[0],
      contractName: CONTRACTS.FILE_REGISTRY.split('.')[1],
      functionName: 'register-file',
      functionArgs: [
        bufferCV(Buffer.from(fileHash, 'hex')),
        stringAsciiCV(file.name),
        uintCV(file.size),
        stringAsciiCV(this.getFileType(file.name)),
        uintCV(Date.now())
      ],
      senderKey: userData.appPrivateKey,
      network,
      postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractCall(txOptions);
    return await broadcastTransaction(transaction, network);
  }

  async getFileProof(fileHash: string): Promise<FileProof | null> {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACTS.FILE_REGISTRY.split('.')[0],
      contractName: CONTRACTS.FILE_REGISTRY.split('.')[1],
      functionName: 'get-file-proof',
      functionArgs: [bufferCV(Buffer.from(fileHash, 'hex'))],
      network,
    });

    return result ? this.parseFileProof(result) : null;
  }
}
```

## 🔬 Analysis & Oracle Integration

### Oracle-Verified Analysis Workflow
```typescript
// src/services/analysisService.ts
export class AnalysisService {
  async startAnalysis(fileId: string, analysisType: AnalysisType): Promise<AnalysisJob> {
    // 1. Verify file exists on blockchain
    const fileProof = await this.fileService.getFileProof(fileId);
    if (!fileProof) throw new Error('File not found on blockchain');

    // 2. Request oracle verification for analysis parameters
    const oracleVerification = await this.requestOracleVerification(analysisType);
    
    // 3. Start analysis with oracle-verified parameters
    const analysisJob = await this.submitAnalysisJob(fileId, analysisType, oracleVerification);
    
    // 4. Register analysis on blockchain
    await this.registerAnalysisOnChain(analysisJob);
    
    return analysisJob;
  }

  private async requestOracleVerification(analysisType: AnalysisType): Promise<OracleData> {
    // Call oracle smart contract for verified analysis parameters
    const oracleResult = await callReadOnlyFunction({
      contractAddress: CONTRACTS.GENOMIC_ORACLE.split('.')[0],
      contractName: CONTRACTS.GENOMIC_ORACLE.split('.')[1],
      functionName: 'get-analysis-parameters',
      functionArgs: [stringAsciiCV(analysisType)],
      network,
    });

    return this.parseOracleResult(oracleResult);
  }

  private async registerAnalysisOnChain(analysisJob: AnalysisJob): Promise<string> {
    const userData = userSession.loadUserData();
    
    const txOptions = {
      contractAddress: CONTRACTS.ANALYSIS_PROOF.split('.')[0],
      contractName: CONTRACTS.ANALYSIS_PROOF.split('.')[1],
      functionName: 'register-analysis',
      functionArgs: [
        stringAsciiCV(analysisJob.id),
        bufferCV(Buffer.from(analysisJob.fileHash, 'hex')),
        stringAsciiCV(analysisJob.type),
        bufferCV(Buffer.from(analysisJob.oracleVerificationHash, 'hex')),
        uintCV(Date.now())
      ],
      senderKey: userData.appPrivateKey,
      network,
      postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractCall(txOptions);
    return await broadcastTransaction(transaction, network);
  }
}
```

### Real-time Oracle Data Integration
```typescript
// src/services/oracleService.ts
export class OracleService {
  async getGeneAnnotation(geneSymbol: string): Promise<GeneAnnotation> {
    // 1. Check if data exists on blockchain
    const cachedResult = await this.getOracleCachedData('gene-annotation', geneSymbol);
    
    if (cachedResult && !this.isDataStale(cachedResult.timestamp)) {
      return cachedResult.data;
    }

    // 2. Request fresh data from oracle
    const freshData = await this.requestFreshOracleData('gene-annotation', geneSymbol);
    
    // 3. Verify oracle signature
    const isValid = await this.verifyOracleSignature(freshData);
    if (!isValid) throw new Error('Invalid oracle signature');

    return freshData.data;
  }

  async getVariantInfo(variant: Variant): Promise<VariantInfo> {
    const result = await callReadOnlyFunction({
      contractAddress: CONTRACTS.GENOMIC_ORACLE.split('.')[0],
      contractName: CONTRACTS.GENOMIC_ORACLE.split('.')[1],
      functionName: 'get-variant-info',
      functionArgs: [
        stringAsciiCV(variant.chromosome),
        uintCV(variant.position),
        stringAsciiCV(variant.reference),
        stringAsciiCV(variant.alternate)
      ],
      network,
    });

    return this.parseVariantInfo(result);
  }

  private async verifyOracleSignature(oracleData: OracleData): Promise<boolean> {
    // Verify oracle's cryptographic signature on-chain
    const verificationResult = await callReadOnlyFunction({
      contractAddress: CONTRACTS.GENOMIC_ORACLE.split('.')[0],
      contractName: CONTRACTS.GENOMIC_ORACLE.split('.')[1],
      functionName: 'verify-oracle-signature',
      functionArgs: [
        bufferCV(Buffer.from(oracleData.dataHash, 'hex')),
        bufferCV(Buffer.from(oracleData.signature, 'hex'))
      ],
      network,
    });

    return cvToValue(verificationResult);
  }
}
```

## 💰 Payment & Subscription Management

### STX Token Integration
```typescript
// src/services/paymentService.ts
export class PaymentService {
  async processPayment(amount: number, recipient: string, memo?: string): Promise<PaymentResult> {
    const userData = userSession.loadUserData();
    
    const txOptions = {
      recipient,
      amount: uintCV(amount * 1000000), // Convert to microSTX
      memo: memo ? stringAsciiCV(memo) : undefined,
      senderKey: userData.appPrivateKey,
      network,
      postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeSTXTokenTransfer(txOptions);
    const txId = await broadcastTransaction(transaction, network);
    
    // Register payment on smart contract
    await this.registerPaymentOnChain(txId, amount, recipient);
    
    return {
      transactionId: txId,
      amount,
      recipient,
      timestamp: Date.now()
    };
  }

  async subscribeToPremium(plan: SubscriptionPlan): Promise<SubscriptionResult> {
    // 1. Process STX payment
    const payment = await this.processPayment(
      plan.priceSTX, 
      CONTRACTS.PAYMENT_PROCESSOR.split('.')[0],
      `Premium subscription: ${plan.name}`
    );

    // 2. Activate subscription on-chain
    const subscriptionTx = await this.activateSubscription(plan, payment.transactionId);
    
    return {
      paymentTransaction: payment.transactionId,
      subscriptionTransaction: subscriptionTx,
      plan,
      expiresAt: new Date(Date.now() + plan.durationMs)
    };
  }

  private async activateSubscription(plan: SubscriptionPlan, paymentTxId: string): Promise<string> {
    const userData = userSession.loadUserData();
    
    const txOptions = {
      contractAddress: CONTRACTS.PAYMENT_PROCESSOR.split('.')[0],
      contractName: CONTRACTS.PAYMENT_PROCESSOR.split('.')[1],
      functionName: 'activate-subscription',
      functionArgs: [
        stringAsciiCV(plan.id),
        stringAsciiCV(paymentTxId),
        uintCV(plan.durationMs),
        uintCV(Date.now())
      ],
      senderKey: userData.appPrivateKey,
      network,
      postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractCall(txOptions);
    return await broadcastTransaction(transaction, network);
  }
}
```

## 📊 Dashboard & Analytics Integration

### Blockchain Data Visualization
```typescript
// src/components/Dashboard/BlockchainStats.tsx
export const BlockchainStats: React.FC = () => {
  const { userData } = useStacksAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    if (userData) {
      loadBlockchainStats();
    }
  }, [userData]);

  const loadBlockchainStats = async () => {
    const userAddress = userData.profile.stxAddress.testnet;
    
    // Get user's files from blockchain
    const filesResult = await callReadOnlyFunction({
      contractAddress: CONTRACTS.FILE_REGISTRY.split('.')[0],
      contractName: CONTRACTS.FILE_REGISTRY.split('.')[1],
      functionName: 'get-user-files',
      functionArgs: [principalCV(userAddress)],
      network,
      senderAddress: userAddress,
    });

    // Get user's analyses from blockchain  
    const analysesResult = await callReadOnlyFunction({
      contractAddress: CONTRACTS.ANALYSIS_PROOF.split('.')[0],
      contractName: CONTRACTS.ANALYSIS_PROOF.split('.')[1],
      functionName: 'get-user-analyses',
      functionArgs: [principalCV(userAddress)],
      network,
      senderAddress: userAddress,
    });

    setStats({
      totalFiles: cvToValue(filesResult).length,
      totalAnalyses: cvToValue(analysesResult).length,
      blockchainProofs: cvToValue(analysesResult).filter(a => a.verified).length,
      oracleVerifications: cvToValue(analysesResult).filter(a => a.oracleVerified).length
    });
  };

  return (
    <div className="blockchain-stats">
      <h3>Blockchain Activity</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats?.totalFiles || 0}</span>
          <span className="stat-label">Files on Chain</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats?.totalAnalyses || 0}</span>
          <span className="stat-label">Verified Analyses</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats?.oracleVerifications || 0}</span>
          <span className="stat-label">Oracle Verified</span>
        </div>
      </div>
    </div>
  );
};
```

## 🔄 Real-time Updates & Event Monitoring

### Contract Event Listening
```typescript
// src/hooks/useContractEvents.tsx
import { useEffect, useState } from 'react';
import { StacksApiWebSocketClient } from '@stacks/blockchain-api-client';

export const useContractEvents = (contractAddress: string) => {
  const [events, setEvents] = useState<ContractEvent[]>([]);
  const [wsClient, setWsClient] = useState<StacksApiWebSocketClient | null>(null);

  useEffect(() => {
    const client = new StacksApiWebSocketClient({
      url: 'wss://stacks-node-api.testnet.stacks.co/',
    });

    client.subscribeAddressTransactions(contractAddress, (event) => {
      setEvents(prev => [parseContractEvent(event), ...prev.slice(0, 99)]);
    });

    setWsClient(client);

    return () => {
      client.unsubscribe();
    };
  }, [contractAddress]);

  return { events, isConnected: wsClient?.socket?.readyState === WebSocket.OPEN };
};
```

### Transaction Status Tracking
```typescript
// src/hooks/useTransactionStatus.tsx
export const useTransactionStatus = (txId: string) => {
  const [status, setStatus] = useState<TransactionStatus>('pending');
  const [receipt, setReceipt] = useState<TransactionReceipt | null>(null);

  useEffect(() => {
    if (!txId) return;

    const pollStatus = async () => {
      try {
        const response = await fetch(
          `https://stacks-node-api.testnet.stacks.co/extended/v1/tx/${txId}`
        );
        const data = await response.json();
        
        setStatus(data.tx_status);
        setReceipt(data);

        if (data.tx_status === 'success' || data.tx_status === 'abort_by_response') {
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Error polling transaction status:', error);
      }
    };

    const interval = setInterval(pollStatus, 2000);
    pollStatus(); // Initial poll

    return () => clearInterval(interval);
  }, [txId]);

  return { status, receipt };
};
```

## 🏭 Production Integration Patterns

### Environment Configuration
```typescript
// src/config/stacks.ts
const getStacksConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    network: isProduction ? new StacksMainnet() : new StacksTestnet(),
    contracts: {
      USER_REGISTRY: process.env.REACT_APP_USER_REGISTRY_CONTRACT,
      FILE_REGISTRY: process.env.REACT_APP_FILE_REGISTRY_CONTRACT,
      ANALYSIS_PROOF: process.env.REACT_APP_ANALYSIS_PROOF_CONTRACT,
      GENOMIC_ORACLE: process.env.REACT_APP_GENOMIC_ORACLE_CONTRACT,
      PAYMENT_PROCESSOR: process.env.REACT_APP_PAYMENT_PROCESSOR_CONTRACT,
    },
    apiUrl: process.env.REACT_APP_STACKS_API_URL,
    explorerUrl: process.env.REACT_APP_STACKS_EXPLORER_URL,
  };
};

export const stacksConfig = getStacksConfig();
```

### Error Handling & Retry Logic
```typescript
// src/utils/stacksHelpers.ts
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
  throw new Error('Max retries exceeded');
};

export const safeContractCall = async (txOptions: any) => {
  return withRetry(async () => {
    const transaction = await makeContractCall(txOptions);
    return await broadcastTransaction(transaction, network);
  });
};
```

This comprehensive Stacks.js integration provides a fully blockchain-native genomic platform where every critical operation is verified, tracked, and proven on the Stacks blockchain with extensive oracle verification.