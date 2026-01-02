import React, { useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" />;

    const adminRoles = ["FOUNDER", "STAFF", "SUPPORT", "ANALYST", "MODERATOR"];
    if (!user || !adminRoles.includes(user.role)) return <Navigate to="/dashboard" />;

    return (
        <div className="min-h-screen bg-[#020202] text-foreground flex">
            <AdminSidebar />
            <main className="flex-1 ml-72 min-h-screen relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/2 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/2 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto p-10 relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
};
