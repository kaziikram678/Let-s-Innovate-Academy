"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { User, Session } from "@supabase/supabase-js"
import { supabaseClient } from "@/lib/supabase"

interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  role: "user" | "admin"
  avatar_url: string | null
  created_at: string
  updated_at: string
}

interface ProfileInsert {
  phone?: string
  full_name?: string
  role?: string
}

interface ProfileUpdate {
  phone?: string
  full_name?: string
  role?: string
  avatar_url?: string | null
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async (userId: string) => {
    if (!supabaseClient) return

    const { data, error } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (error) {
      console.error("Error fetching profile:", error)
      return
    }

    setProfile(data as Profile)
  }, [])

  useEffect(() => {
    if (!supabaseClient) {
      setLoading(false)
      return
    }

    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [fetchProfile])

  const signIn = async (email: string, password: string) => {
    if (!supabaseClient) return { error: new Error("Supabase not configured") }

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    return { error }
  }

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    if (!supabaseClient) return { error: new Error("Supabase not configured") }

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "user",
        },
      },
    })

    if (error) return { error }

    if (phone) {
      const { data: { user: newUser } } = await supabaseClient.auth.getUser()
      if (newUser) {
        await supabaseClient
          .from("profiles")
          .update({ phone } as unknown as ProfileUpdate)
          .eq("id", newUser.id)
      }
    }

    return { error: null }
  }

  const signOut = async () => {
    if (!supabaseClient) return
    await supabaseClient.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    if (!supabaseClient) return { error: new Error("Supabase not configured") }

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    return { error }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!supabaseClient || !user) return { error: new Error("Not authenticated") }

    const { error } = await supabaseClient
      .from("profiles")
      .update(updates as unknown as ProfileUpdate)
      .eq("id", user.id)

    if (!error) {
      setProfile((prev) => (prev ? { ...prev, ...updates } : null))
    }

    return { error }
  }

  const isAdmin = profile?.role === "admin"

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
