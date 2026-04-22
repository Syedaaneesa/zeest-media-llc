"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { createContext, useEffect, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const getUserFromSupabase = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        setAuthError(error.message);
        return;
      }

      setUser(data.user);
      
    };

    getUserFromSupabase();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, setUser, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
