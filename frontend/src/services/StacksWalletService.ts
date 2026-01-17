import { showConnect, type FinishedAuthData } from '@stacks/connect';
import { StacksTestnet } from '@stacks/network';
import {
  stringAsciiCV,
  makeContractCall,
  broadcastTransaction,
  AnchorMode
} from '@stacks/transactions';
import type { IWalletService } from './IWalletService';

// Simple in-memory wallet state (replace with context or state management as needed)
let connected = false;
let userAddress: string | null = null;
const network = 'testnet';

export class StacksWalletService implements IWalletService {
  isConnected(): boolean {
    return connected;
  }
  getUserAddress(): string | null {
    return userAddress;
  }
  getNetwork(): string {
    return network;
  }
  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      showConnect({
        appDetails: {
          name: 'Genomic Platform',
          icon: '/vite.svg',
        },
        redirectTo: '/',
        onFinish: (data: FinishedAuthData) => {
          connected = true;
          userAddress = data.userSession.loadUserData().profile.stxAddress.testnet;
          resolve();
        },
        onCancel: () => {
          reject(new Error('Wallet connection cancelled'));
        }
      });
    });
  }
  disconnect(): void {
    connected = false;
    userAddress = null;
    localStorage.removeItem('blockstack-session');
  }
  async storeAnalysisResult(
    analysisId: string,
    fileHash: string,
    resultsHash: string,
    analysisType: string,
    metadata: string
  ): Promise<string | null> {
    if (!connected || !userAddress) throw new Error('Wallet not connected');
    try {
      const stacksNetwork = new StacksTestnet();
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
        senderKey: userAddress,
        network: stacksNetwork,
        anchorMode: AnchorMode.Any,
      };
      const transaction = await makeContractCall(txOptions);
      const broadcastResponse = await broadcastTransaction(transaction, stacksNetwork);
      return broadcastResponse.txid || null;
    } catch (error) {
      throw error;
    }
  }
}
