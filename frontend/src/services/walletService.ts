import { StacksWalletService } from './StacksWalletService';
import type { IWalletService } from './IWalletService';

export const walletService: IWalletService = new StacksWalletService();
