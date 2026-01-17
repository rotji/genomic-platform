// Interface for Stacks wallet and contract interaction abstraction
export interface IWalletService {
  isConnected(): boolean;
  getUserAddress(): string | null;
  getNetwork(): string;
  connect(): Promise<void>;
  disconnect(): void;
  storeAnalysisResult(
    analysisId: string,
    fileHash: string,
    resultsHash: string,
    analysisType: string,
    metadata: string
  ): Promise<string | null>; // returns txid or null
}
