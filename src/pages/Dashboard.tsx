import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  Activity, FileText, TrendingUp, Clock, Database, 
  CheckCircle, AlertCircle, Loader, Calendar
} from 'lucide-react';
import { generateMockAnalyses, generateUserStats, formatBytes, getStatusColor, getAnalysisTypeIcon } from '../utils/mockData';
import type { Analysis, UserStats } from '../types/dashboard';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadDashboardData = async () => {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalyses(generateMockAnalyses(15));
      setUserStats(generateUserStats());
      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader className={styles.loadingSpinner} />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!userStats) return null;

  // Prepare chart data
  const recentAnalyses = analyses.slice(0, 7).map(analysis => ({
    date: analysis.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    count: 1
  }));

  const analysisTypeData = analyses.reduce((acc, analysis) => {
    const existing = acc.find(item => item.type === analysis.type);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ type: analysis.type.replace('-', ' '), count: 1 });
    }
    return acc;
  }, [] as { type: string; count: number }[]);

  const statusData = [
    { name: 'Completed', value: userStats.completedAnalyses, color: '#10b981' },
    { name: 'Failed', value: userStats.failedAnalyses, color: '#ef4444' },
    { name: 'Processing', value: analyses.filter(a => a.status === 'processing').length, color: '#f59e0b' },
    { name: 'Queued', value: analyses.filter(a => a.status === 'queued').length, color: '#6b7280' }
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, {user?.name || 'User'}!</h1>
          <p className={styles.subtitle}>Here's your genomic analysis overview</p>
        </div>
        <div className={styles.lastActivity}>
          <Calendar size={16} />
          <span>Last active: {userStats.lastActivity.toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FileText size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{userStats.totalAnalyses}</h3>
            <p className={styles.statLabel}>Total Analyses</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <CheckCircle size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{userStats.completedAnalyses}</h3>
            <p className={styles.statLabel}>Completed</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Database size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{formatBytes(userStats.totalDataProcessed * 1024 * 1024)}</h3>
            <p className={styles.statLabel}>Data Processed</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Clock size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{userStats.averageProcessingTime}m</h3>
            <p className={styles.statLabel}>Avg Processing Time</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Analysis Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={recentAnalyses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#667eea" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Analysis Types</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analysisTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Status Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Analyses Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 className={styles.tableTitle}>Recent Analyses</h3>
          <button className={styles.viewAllButton}>View All</button>
        </div>
        
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Analysis</th>
                <th>Type</th>
                <th>Status</th>
                <th>Created</th>
                <th>File Size</th>
                <th>Results</th>
              </tr>
            </thead>
            <tbody>
              {analyses.slice(0, 8).map((analysis) => (
                <tr key={analysis.id}>
                  <td>
                    <div className={styles.analysisCell}>
                      <span className={styles.analysisIcon}>
                        {getAnalysisTypeIcon(analysis.type)}
                      </span>
                      <div>
                        <div className={styles.analysisName}>{analysis.name}</div>
                        <div className={styles.fileName}>{analysis.fileName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.typeTag}>
                      {analysis.type.replace('-', ' ')}
                    </span>
                  </td>
                  <td>
                    <span 
                      className={styles.statusBadge}
                      style={{ backgroundColor: getStatusColor(analysis.status) }}
                    >
                      {analysis.status}
                    </span>
                  </td>
                  <td>{analysis.createdAt.toLocaleDateString()}</td>
                  <td>{formatBytes(analysis.fileSize * 1024 * 1024)}</td>
                  <td>
                    {analysis.results ? (
                      <div className={styles.results}>
                        {analysis.results.mutations && (
                          <span className={styles.resultItem}>
                            {analysis.results.mutations} mutations
                          </span>
                        )}
                        {analysis.results.quality_score && (
                          <span className={styles.resultItem}>
                            Q{analysis.results.quality_score}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className={styles.noResults}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;