"use client";

import axios from "axios";
import { createContext, useEffect, useState, ReactNode, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";

export interface PressReleaseType {
    id: string;
    user_id: string;
    method: string;
    title: string;
    summary: string;
    upload_file_press_release: string;
    featured_image: string;
    company_logo: string;
    status: 'draft' | 'pending' | 'scheduled' | 'published' | 'rejected';
    content: string;
    tone: string;
    package: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    company_name: string;
    scheduled_date: string;
    created_at: string;
    timezone: string;
}

interface PressContextType {
    pressReleases: PressReleaseType[];
    setPressReleases: React.Dispatch<React.SetStateAction<PressReleaseType[]>>;
    pressError: string;
    setPressError: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
}

const AdminPressContext = createContext<PressContextType | null>(null);

export const AdminPressProvider = ({ children }: { children: ReactNode }) => {
    const [pressReleases, setPressReleases] = useState<PressReleaseType[]>([]);
    const [pressError, setPressError] = useState("");
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.id) {
            setPressReleases([]);
            setPressError("");
            setLoading(false);
            return;
        }

        const getPressReleases = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/admin/press-release");
                
                if (response.status === 200) {
                    setPressReleases(response.data?.data ?? []);
                } else {
                    setPressError(response.statusText || "Failed to load press releases");
                }
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : "Failed to fetch press releases";
                setPressError(message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getPressReleases();
    }, [user?.id]);

    const value = useMemo(() => ({
        pressReleases,
        setPressReleases,
        pressError,
        setPressError,
        loading
    }), [pressReleases, pressError, loading]);

    return (
        <AdminPressContext.Provider value={value}>
            {children}
        </AdminPressContext.Provider>
    );
};

export const useAdminPressRelease = () => {
    const context = useContext(AdminPressContext);
    if (!context) {
        throw new Error("useAdminPressRelease must be used within an AdminPressProvider");
    }
    return context;
};