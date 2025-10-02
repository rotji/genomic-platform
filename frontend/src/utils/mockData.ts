import { subDays, format } from 'date-fns';
import type { Analysis, UserStats, AdminStats, DashboardUser, ChartData } from '../types/dashboard';

// Mock data generator for dashboard analytics
export const generateMockAnalyses = (count: number = 10): Analysis[] => {
  const analysisTypes: Analysis['type'][] = [
    'dna-sequencing',
    'rna-analysis', 
    'variant-calling',
    'ai-generation',
    'comparative-genomics'
  ];
  
  const statuses: Analysis['status'][] = ['completed', 'processing', 'failed', 'queued'];
  
  return Array.from({ length: count }, (_, i) => {
    const createdAt = subDays(new Date(), Math.floor(Math.random() * 30));
    const type = analysisTypes[Math.floor(Math.random() * analysisTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: `analysis_${i + 1}`,
      name: `${type.replace('-', ' ')} Analysis ${i + 1}`,
      type,
      status,
      createdAt,
      completedAt: status === 'completed' ? new Date(createdAt.getTime() + Math.random() * 3600000) : undefined,
      fileSize: Math.floor(Math.random() * 500) + 10, // 10-510 MB
      fileName: `sample_${i + 1}.${type === 'dna-sequencing' ? 'fasta' : type === 'variant-calling' ? 'vcf' : 'bam'}`,
      results: status === 'completed' ? {
        mutations: Math.floor(Math.random() * 100),
        variants: Math.floor(Math.random() * 50),
        quality_score: Math.floor(Math.random() * 40) + 60, // 60-100
        coverage: Math.floor(Math.random() * 50) + 50 // 50-100
      } : undefined
    };
  });
};

export const generateUserStats = (): UserStats => {
  const analyses = generateMockAnalyses();
  const completed = analyses.filter(a => a.status === 'completed').length;
  const failed = analyses.filter(a => a.status === 'failed').length;
  
  return {
    totalAnalyses: analyses.length,
    completedAnalyses: completed,
    failedAnalyses: failed,
    totalDataProcessed: analyses.reduce((sum, a) => sum + a.fileSize, 0),
    averageProcessingTime: Math.floor(Math.random() * 60) + 15, // 15-75 minutes
    lastActivity: subDays(new Date(), Math.floor(Math.random() * 7)),
    joinedDate: subDays(new Date(), Math.floor(Math.random() * 365) + 30)
  };
};

export const generateAdminStats = (): AdminStats => {
  // Generate user growth data for last 30 days
  const userGrowth: ChartData[] = [];
  for (let i = 29; i >= 0; i--) {
    userGrowth.push({
      date: format(subDays(new Date(), i), 'MMM dd'),
      value: Math.floor(Math.random() * 50) + 100 + i * 2 // Growing trend
    });
  }
  
  // Generate analysis activity for last 30 days
  const analysisActivity: ChartData[] = [];
  for (let i = 29; i >= 0; i--) {
    analysisActivity.push({
      date: format(subDays(new Date(), i), 'MMM dd'),
      value: Math.floor(Math.random() * 200) + 50
    });
  }
  
  return {
    totalUsers: 1247,
    activeUsers: 892,
    totalAnalyses: 15643,
    totalDataProcessed: 2.3, // TB
    systemUptime: 99.7,
    averageResponseTime: 245,
    popularAnalysisTypes: [
      { type: 'DNA Sequencing', count: 6234 },
      { type: 'Variant Calling', count: 4156 },
      { type: 'RNA Analysis', count: 3245 },
      { type: 'AI Generation', count: 1567 },
      { type: 'Comparative Genomics', count: 441 }
    ],
    userGrowth: userGrowth.map(item => ({ date: item.date, users: item.value })),
    analysisActivity: analysisActivity.map(item => ({ date: item.date, analyses: item.value }))
  };
};

export const generateMockUsers = (count: number = 20): DashboardUser[] => {
  const roles: DashboardUser['role'][] = ['user', 'researcher', 'admin'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `user_${i + 1}`,
    email: `user${i + 1}@genomics.com`,
    name: `User ${i + 1}`,
    role: roles[Math.floor(Math.random() * roles.length)],
    lastActive: subDays(new Date(), Math.floor(Math.random() * 30)),
    analysesCount: Math.floor(Math.random() * 50),
    dataUsage: Math.floor(Math.random() * 1000) + 100, // 100-1100 MB
    joinedDate: subDays(new Date(), Math.floor(Math.random() * 365) + 30),
    isActive: Math.random() > 0.2 // 80% active users
  }));
};

// Utility functions for dashboard data
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getStatusColor = (status: Analysis['status']): string => {
  switch (status) {
    case 'completed': return '#10b981'; // green
    case 'processing': return '#f59e0b'; // yellow
    case 'failed': return '#ef4444'; // red
    case 'queued': return '#6b7280'; // gray
    default: return '#6b7280';
  }
};

export const getAnalysisTypeIcon = (type: Analysis['type']): string => {
  switch (type) {
    case 'dna-sequencing': return '🧬';
    case 'rna-analysis': return '🔬';
    case 'variant-calling': return '🎯';
    case 'ai-generation': return '🤖';
    case 'comparative-genomics': return '📊';
    default: return '📄';
  }
};