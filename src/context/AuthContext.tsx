"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isSupabaseConfigured: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (email: string, password: string, displayName: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  loginAsDemo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    if (!supabase) {
      setIsSupabaseConfigured(false);
      // Check for saved demo session
      const savedDemo = localStorage.getItem("skillforge_demo_user");
      if (savedDemo) {
        try {
          setUser(JSON.parse(savedDemo));
        } catch (e) {
          localStorage.removeItem("skillforge_demo_user");
        }
      }
      setLoading(false);
      return;
    }

    setIsSupabaseConfigured(true);

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          display_name:
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.display_name ||
            session.user.email?.split("@")[0] ||
            "Engineer",
        });
      } else {
        // Fallback demo user check if any
        const savedDemo = localStorage.getItem("skillforge_demo_user");
        if (savedDemo) {
          try {
            setUser(JSON.parse(savedDemo));
          } catch (e) {
            localStorage.removeItem("skillforge_demo_user");
          }
        }
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          display_name:
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.display_name ||
            session.user.email?.split("@")[0] ||
            "Engineer",
        });
      } else {
        const savedDemo = localStorage.getItem("skillforge_demo_user");
        if (!savedDemo) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    const supabase = createClient();
    if (!supabase) {
      // Offline/Demo login
      const demoUser: UserProfile = {
        id: "demo-user-id-" + Math.random().toString(36).substring(2, 8),
        email,
        display_name: email.split("@")[0],
        isDemo: true,
      };
      setUser(demoUser);
      localStorage.setItem("skillforge_demo_user", JSON.stringify(demoUser));
      return {};
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || "",
        display_name:
          data.user.user_metadata?.full_name ||
          data.user.email?.split("@")[0] ||
          "Engineer",
      });
    }

    return {};
  };

  const register = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<{ error?: string }> => {
    const supabase = createClient();
    if (!supabase) {
      const demoUser: UserProfile = {
        id: "demo-user-id-" + Math.random().toString(36).substring(2, 8),
        email,
        display_name: displayName,
        isDemo: true,
      };
      setUser(demoUser);
      localStorage.setItem("skillforge_demo_user", JSON.stringify(demoUser));
      return {};
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          full_name: displayName,
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || "",
        display_name: displayName,
      });
    }

    return {};
  };

  const logout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem("skillforge_demo_user");
    setUser(null);
  };

  const loginAsDemo = () => {
    const demoUser: UserProfile = {
      id: "demo-engineer-001",
      email: "alex.mercer@skillforge.dev",
      display_name: "Alex Mercer",
      isDemo: true,
    };
    setUser(demoUser);
    localStorage.setItem("skillforge_demo_user", JSON.stringify(demoUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSupabaseConfigured,
        login,
        register,
        logout,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
