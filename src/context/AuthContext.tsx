import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

interface User {
    id: number;
    email: string;
    full_name: string;
    subscription_tier: "standard" | "elite" | "ultra";
    role: "USER" | "FOUNDER" | "STAFF" | "SUPPORT" | "ANALYST" | "MODERATOR";
    permissions: Record<string, boolean>;
    max_accounts_limit: number;
    is_onboarded: boolean;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            // Decode token to get user info (simple version)
            // In a real app, you might hit /api/auth/me
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setUser({
                    id: payload.user_id || payload.sub_id || 0,
                    email: payload.sub,
                    full_name: payload.full_name || "Trader",
                    subscription_tier: payload.subscription_tier || "standard",
                    role: payload.role || "USER",
                    permissions: payload.permissions || {},
                    max_accounts_limit: payload.max_accounts_limit || 1,
                    is_onboarded: payload.is_onboarded ?? false
                });
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            } catch (e) {
                logout();
            }
        } else {
            delete api.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
