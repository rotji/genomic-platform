// Dashboard types for user and admin analytics
export interface Analysis {
  id: string;
  name: string;
  type: 'dna-sequencing' | 'rna-analysis' | 'variant-calling' | 'ai-generation' | 'comparative-genomics';
  status: 'completed' | 'processing' | 'failed' | 'queued';
  createdAt: Date;
  completedAt?: Date;
  fileSize: number;
  fileName: string;
  results?: {
    mutations?: number;
    variants?: number;
    quality_score?: number;
    coverage?: number;
  };
}

export interface UserStats {
  totalAnalyses: number;
  completedAnalyses: number;
  failedAnalyses: number;
  totalDataProcessed: number; // in MB
  averageProcessingTime: number; // in minutes
  lastActivity: Date;
  joinedDate: Date;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number; // last 30 days
  totalAnalyses: number;
  totalDataProcessed: number; // in GB
  systemUptime: number; // percentage
  averageResponseTime: number; // in ms
  popularAnalysisTypes: { type: string; count: number }[];
  userGrowth: { date: string; users: number }[];
  analysisActivity: { date: string; analyses: number }[];
}

export interface ChartData {
  date: string;
  value: number;
  label?: string;
}

export interface DashboardUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'researcher';
  lastActive: Date;
  analysesCount: number;
  dataUsage: number; // in MB
  joinedDate: Date;
  isActive: boolean;
}