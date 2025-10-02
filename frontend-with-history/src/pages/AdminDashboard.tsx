import { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Users, Activity, Database, TrendingUp, Server, Clock,
  AlertTriangle, CheckCircle, UserCheck, FileText
} from 'lucide-react';
import { generateAdminStats, generateMockUsers, formatBytes } from '../utils/mockData';
import type { AdminStats, DashboardUser } from '../types/dashboard';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAdminStats(generateAdminStats());
      setUsers(generateMockUsers(25));
      setIsLoading(false);
    };

    loadAdminData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Activity className={styles.loadingSpinner} />
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  if (!adminStats) return null;

  const systemHealthData = [
    { name: 'CPU Usage', value: 65, color: '#667eea' },
    { name: 'Memory', value: 78, color: '#10b981' },
    { name: 'Storage', value: 45, color: '#f59e0b' },
    { name: 'Network', value: 23, color: '#ef4444' }
  ];

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>Platform analytics and management overview</p>
        </div>
        <div className={styles.systemStatus}>
          <div className={styles.statusIndicator}>
            <div className={styles.statusDot}></div>
            <span>System Operational</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Users size={24} />
          </div>
          <div className={styles.metricContent}>
            <h3 className={styles.metricValue}>{adminStats.totalUsers.toLocaleString()}</h3>
            <p className={styles.metricLabel}>Total Users</p>
            <span className={styles.metricChange}>+{adminStats.activeUsers} active (30d)</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <FileText size={24} />
          </div>
          <div className={styles.metricContent}>
            <h3 className={styles.metricValue}>{adminStats.totalAnalyses.toLocaleString()}</h3>
            <p className={styles.metricLabel}>Total Analyses</p>
            <span className={styles.metricChange}>+12% vs last month</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Database size={24} />
          </div>
          <div className={styles.metricContent}>
            <h3 className={styles.metricValue}>{adminStats.totalDataProcessed} TB</h3>
            <p className={styles.metricLabel}>Data Processed</p>
            <span className={styles.metricChange}>+8% vs last month</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <Clock size={24} />
          </div>
          <div className={styles.metricContent}>
            <h3 className={styles.metricValue}>{adminStats.averageResponseTime}ms</h3>
            <p className={styles.metricLabel}>Avg Response Time</p>
            <span className={styles.metricChange}>-5% vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>User Growth (30 days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={adminStats.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#667eea" fill="#667eea" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Analysis Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adminStats.analysisActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="analyses" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Popular Analysis Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adminStats.popularAnalysisTypes} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="type" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>System Health</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={systemHealthData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {systemHealthData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Status Cards */}
      <div className={styles.statusGrid}>
        <div className={styles.statusCard}>
          <div className={styles.statusHeader}>
            <Server size={20} />
            <span>System Uptime</span>
          </div>
          <div className={styles.statusValue}>{adminStats.systemUptime}%</div>
          <div className={styles.statusIndicator}>
            <CheckCircle size={16} className={styles.statusSuccess} />
            <span>Operational</span>
          </div>
        </div>

        <div className={styles.statusCard}>
          <div className={styles.statusHeader}>
            <UserCheck size={20} />
            <span>Active Users</span>
          </div>
          <div className={styles.statusValue}>{adminStats.activeUsers}</div>
          <div className={styles.statusIndicator}>
            <TrendingUp size={16} className={styles.statusSuccess} />
            <span>+15% this week</span>
          </div>
        </div>

        <div className={styles.statusCard}>
          <div className={styles.statusHeader}>
            <AlertTriangle size={20} />
            <span>System Alerts</span>
          </div>
          <div className={styles.statusValue}>3</div>
          <div className={styles.statusIndicator}>
            <AlertTriangle size={16} className={styles.statusWarning} />
            <span>Minor issues</span>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h3 className={styles.tableTitle}>Recent Users</h3>
          <button className={styles.manageButton}>Manage Users</button>
        </div>
        
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Analyses</th>
                <th>Data Usage</th>
                <th>Last Active</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 10).map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.userAvatar}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className={styles.userName}>{user.name}</div>
                        <div className={styles.userEmail}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.roleTag} ${styles[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.analysesCount}</td>
                  <td>{formatBytes(user.dataUsage * 1024 * 1024)}</td>
                  <td>{user.lastActive.toLocaleDateString()}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${user.isActive ? styles.active : styles.inactive}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
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

export default AdminDashboard;