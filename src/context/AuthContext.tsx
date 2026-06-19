/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import type { User, Session } from "@supabase/supabase-js";

type Profile = {
  id: string;
  role: "user" | "admin";
  full_name: string | null;
};

type SignInResult = { error?: string; role?: "user" | "admin" };

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<SignInResult>;
  signUp: (email: string, password: string, fullName: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile(userId: string) {
    const { data } = await supabase
      .from("profiles")
      .select("id, role, full_name")
      .eq("id", userId)
      .single();
    setProfile(data as Profile | null);
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email: string, password: string): Promise<SignInResult> {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };

    const currentUser = (await supabase.auth.getUser()).data.user;
    if (currentUser) {
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", currentUser.id)
        .single();
      await fetchProfile(currentUser.id);
      return { role: (data as { role: "user" | "admin" } | null)?.role ?? "user" };
    }

    return { role: "user" };
  }

  async function signUp(email: string, password: string, fullName: string): Promise<string | null> {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    return error?.message ?? null;
  }

  async function signOut() {
    await supabase.auth.signOut();
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
