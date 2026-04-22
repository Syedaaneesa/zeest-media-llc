"use client";

import axios from "axios";
import { createContext, useEffect, useState, ReactNode, useContext } from "react";
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
    setpressError: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
}

const PressContext = createContext<PressContextType | null>(null);

export const PressProvider = ({ children }: { children: ReactNode }) => {
    const [pressReleases, setPressReleases] = useState<PressReleaseType[]>([]);
    const [pressError, setpressError] = useState("");
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const getPressReleases = async () => {
            try {
                const response = await axios.get(`/api/press-release?user_id=${user?.id}`)
                if (response.status === 200) {
                    setPressReleases(response.data.data)
                } else {
                    setpressError(response.statusText);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setpressError(error.message);
                }
            } finally {
                setLoading(false);
            }
        }
        if (user?.id) {
            getPressReleases();
        }

    }, [user])
    return <PressContext.Provider value={{ pressReleases, setPressReleases, pressError, setpressError, loading }}>
        {children}
    </PressContext.Provider>

}


export const usePressRelease = () => {
    const context = useContext(PressContext);

    if (!context) {
        throw new Error("usePressRelease must be used within a PressProvider");
    }

    return context;
};
