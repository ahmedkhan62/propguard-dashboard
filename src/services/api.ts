import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle 401s
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // Force reload to trigger AuthContext logout
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export interface DashboardData {
    account: {
        balance: number;
        equity: number;
        profit: number;
        currency: string;
        login: number;
        platform: string;
    };
    risk: {
        status: string;
        violations: string[];
        metrics: {
            daily_limit: number;
            overall_limit: number;
            overall_drawdown: number;
            buffer: number;
            buffer_pct: number;
            trades_to_breach: number;
        };
    };
    daily_stats: {
        daily_profit: number;
        daily_volume: number;
        trades_count: number;
    };
    connection_status: string;
    sync_status: {
        status: 'LIVE' | 'DEGRADED' | 'STALE' | 'PAUSED';
        last_sync: string | null;
        latency_ms: number;
    };
    intelligence: {
        flags: Array<{
            type: string;
            severity: 'warning' | 'critical';
            message: string;
        }>;
        session_performance: Record<string, {
            count: number;
            profit: number;
        }>;
        score: number | string;
    };
    onboarding: {
        has_account: boolean;
        has_preset: boolean;
        has_alerts: boolean;
        has_report: boolean;
    };
}

export const ApiService = {
    // Auth
    login: async (formData: FormData | URLSearchParams): Promise<{ access_token: string }> => {
        const response = await api.post('/auth/token', formData);
        return response.data;
    },
    register: async (data: any) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    // Brokers
    getBrokers: async (): Promise<any[]> => {
        const response = await api.get('/brokers/');
        return response.data;
    },
    getPresets: async (): Promise<any> => {
        const response = await api.get('/brokers/presets');
        return response.data;
    },
    connectBroker: async (data: any) => {
        const response = await api.post('/brokers/connect', data);
        return response.data;
    },
    updateBrokerRiskSettings: async (id: number, data: any) => {
        const response = await api.patch(`/brokers/${id}/risk-settings`, data);
        return response.data;
    },

    // Dashboard
    getOverview: async (): Promise<DashboardData> => {
        const response = await api.get('/dashboard/overview');
        return response.data;
    },
    getPortfolio: async (): Promise<any> => {
        const response = await api.get('/dashboard/portfolio');
        return response.data;
    },
    getTrades: async (): Promise<any[]> => {
        const response = await api.get('/dashboard/trades');
        return response.data;
    },
    getAuditLogs: async (): Promise<any[]> => {
        const response = await api.get('/audit/');
        return response.data;
    },
    toggleDemoMode: async (enabled: boolean) => {
        const response = await api.post(`/dashboard/toggle-demo?enabled=${enabled}`);
        return response.data;
    },
    downloadReport: async (accountId: number, format: 'pdf' | 'csv') => {
        localStorage.setItem('has_downloaded_report', 'true');
        return api.get(`/reports/generate?account_id=${accountId}&format=${format}`, {
            responseType: 'blob'
        });
    },

    // Feedback
    createFeedback: async (data: { type: string, title: string, description: string, category?: string, severity?: string }) => {
        const response = await api.post('/feedback/', data);
        return response.data;
    },
    getUserFeedback: async (): Promise<any[]> => {
        const response = await api.get('/feedback/');
        return response.data;
    },
    getAllFeedback: async (): Promise<any[]> => {
        const response = await api.get('/feedback/admin/all');
        return response.data;
    },
    updateFeedbackStatus: async (id: number, data: { status?: string, admin_notes?: string }) => {
        const response = await api.patch(`/feedback/admin/${id}`, data);
        return response.data;
    },

    // Team Management
    getTeamEmployees: async (): Promise<any[]> => {
        const response = await api.get('/admin/team/employees');
        return response.data;
    },
    createTeamEmployee: async (data: any) => {
        const response = await api.post('/admin/team/employees', data);
        return response.data;
    },
    updateTeamEmployee: async (id: number, data: any) => {
        const response = await api.patch(`/admin/team/employees/${id}`, data);
        return response.data;
    },
    deleteTeamEmployee: async (id: number) => {
        const response = await api.delete(`/admin/team/employees/${id}`);
        return response.data;
    },
    getTeamActivity: async (): Promise<any[]> => {
        const response = await api.get('/admin/team/activity');
        return response.data;
    },
    getEmployeeInsights: async (id: number): Promise<any> => {
        const response = await api.get(`/admin/team/insights/${id}`);
        return response.data;
    },
    forceLogoutEmployee: async (id: number): Promise<any> => {
        const response = await api.post(`/admin/team/employees/${id}/force-logout`);
        return response.data;
    },
    resetEmployeePassword: async (id: number, password: string): Promise<any> => {
        const response = await api.post(`/admin/team/employees/${id}/reset-password`, { password });
        return response.data;
    },

    // Growth & Onboarding
    submitOnboarding: async (data: any): Promise<any> => {
        const response = await api.post("/growth/onboarding", data);
        return response.data;
    },

    logVisit: async (data: any): Promise<any> => {
        // Can be fire-and-forget
        api.post("/growth/visit", data).catch(() => { });
    },

    getReferralStats: async (): Promise<any> => {
        const response = await api.get("/growth/referral");
        return response.data;
    },

    getGrowthAnalytics: async (): Promise<any> => {
        const response = await api.get("/growth/admin/analytics");
        return response.data;
    },

    submitVisitorSurvey: async (data: any): Promise<any> => {
        const response = await api.post("/growth/survey", data);
        return response.data;
    },

    // Generic HTTP methods for flexibility
    get: async (url: string): Promise<any> => {
        const response = await api.get(url);
        return response.data;
    },

    post: async (url: string, data?: any): Promise<any> => {
        const response = await api.post(url, data);
        return response.data;
    },

    delete: async (url: string): Promise<any> => {
        const response = await api.delete(url);
        return response.data;
    },

    // Insights & Goals System  
    getTradingGoals: async (): Promise<any> => {
        const response = await api.get("/insights/goals");
        return response.data;
    },

    createTradingGoal: async (goal: any): Promise<any> => {
        const response = await api.post("/insights/goals", goal);
        return response.data;
    },

    deleteTradingGoal: async (goalId: number): Promise<any> => {
        const response = await api.delete(`/insights/goals/${goalId}`);
        return response.data;
    },

    getRiskProximity: async (): Promise<any> => {
        const response = await api.get("/insights/risk-proximity");
        return response.data;
    },

    getRiskAlerts: async (unacknowledgedOnly: boolean = false): Promise<any> => {
        const response = await api.get(`/insights/alerts?unacknowledged_only=${unacknowledgedOnly}`);
        return response.data;
    },

    acknowledgeAlert: async (alertId: number): Promise<any> => {
        const response = await api.post(`/insights/alerts/${alertId}/acknowledge`);
        return response.data;
    },

    getBehaviorPatterns: async (): Promise<any> => {
        const response = await api.get("/insights/patterns");
        return response.data;
    },

    getPerformanceInsights: async (): Promise<any> => {
        const response = await api.get("/insights/performance-insights");
        return response.data;
    },
};

export default api;
