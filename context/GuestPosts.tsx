"use client";

import axios from "axios";
import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { useAuth } from "./AuthContext";

interface GuestPostContextType {
    orders: Orders[];
    postError: string;
    setPostError: (error: string) => void;
    loading: boolean;
    setOrders: any;

}

export type Orders = {
    id: string;
    user_id: string;
    status: string;
    websites: any[];
    paid: boolean;
    total: number;
    stripe_payment_intent: string;
    created_at: string;
}
const GuestPostContext = createContext<GuestPostContextType | null>(null);

export const GuestPostProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [postError, setPostError] = useState("");
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const getpostReleases = async () => {
            try {
                const response = await axios.get(`/api/guest-posts/user?user_id=${user?.id}`)
                if (response.status === 200) {
                    setOrders(response.data.data)
                } else {
                    setPostError(response.statusText);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setPostError(error.message);
                }
            } finally {
                setLoading(false);
            }
        }
        if (user?.id) {
            getpostReleases();
        }

    }, [user])
    return <GuestPostContext.Provider value={{ orders, setOrders, postError, setPostError, loading }}>
        {children}
    </GuestPostContext.Provider>

}


export const useGuestPost = () => {
    const context = useContext(GuestPostContext);

    if (!context) {
        throw new Error("useGuestPost must be used within a GuestPostProvider");
    }

    return context;
};
