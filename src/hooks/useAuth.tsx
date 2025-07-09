
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName?: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signInWithInstagram: () => Promise<any>;
  signOut: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('Getting session:', session, error);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in with:', email);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        setLoading(false);
        
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          return { data: null, error: { message: 'Invalid email or password. Please check your credentials.' } };
        }
        if (error.message.includes('Email not confirmed')) {
          return { data: null, error: { message: 'Please check your email and click the confirmation link.' } };
        }
        if (error.message.includes('Load failed') || error.message.includes('fetch')) {
          return { data: null, error: { message: 'Connection error. Please check your internet connection and try again.' } };
        }
        return { data: null, error: { message: error.message } };
      }
      
      console.log('Sign in successful:', data);
      setLoading(false);
      return { data, error: null };
    } catch (err) {
      console.error('Unexpected sign in error:', err);
      setLoading(false);
      return { data: null, error: { message: 'Connection error. Please check your internet connection and try again.' } };
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    console.log('Attempting sign up with:', email, fullName);
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName?.trim(),
          },
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
        setLoading(false);
        
        // Handle specific error cases
        if (error.message.includes('User already registered')) {
          return { data: null, error: { message: 'An account with this email already exists. Please sign in instead.' } };
        }
        if (error.message.includes('Password should be at least')) {
          return { data: null, error: { message: 'Password must be at least 6 characters long.' } };
        }
        if (error.message.includes('Load failed') || error.message.includes('fetch')) {
          return { data: null, error: { message: 'Connection error. Please check your internet connection and try again.' } };
        }
        return { data: null, error: { message: error.message } };
      }
      
      console.log('Sign up successful:', data);
      setLoading(false);
      return { data, error: null };
    } catch (err) {
      console.error('Unexpected sign up error:', err);
      setLoading(false);
      return { data: null, error: { message: 'Connection error. Please check your internet connection and try again.' } };
    }
  };

  const signInWithGoogle = async () => {
    console.log('Attempting Google sign in');
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) {
        console.error('Google sign in error:', error);
        setLoading(false);
        return { data: null, error: { message: 'Failed to sign in with Google. Please try again.' } };
      }
      
      console.log('Google sign in initiated:', data);
      setLoading(false);
      return { data, error: null };
    } catch (err) {
      console.error('Google auth error:', err);
      setLoading(false);
      return { 
        data: null, 
        error: { 
          message: 'Google authentication failed. Please try again.' 
        } 
      };
    }
  };

  const signInWithInstagram = async () => {
    console.log('Attempting Instagram sign in');
    setLoading(true);
    
    try {
      const { data, error } = await (supabase.auth.signInWithOAuth as any)({
        provider: 'instagram',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) {
        console.error('Instagram sign in error:', error);
        setLoading(false);
        return { data: null, error: { message: 'Instagram authentication is not configured. Please contact support.' } };
      }
      
      console.log('Instagram sign in initiated:', data);
      setLoading(false);
      return { data, error: null };
    } catch (err) {
      console.error('Instagram auth error:', err);
      setLoading(false);
      return { 
        data: null, 
        error: { 
          message: 'Instagram authentication is not available. Please use email or Google sign-in.' 
        } 
      };
    }
  };

  const signOut = async () => {
    console.log('Attempting sign out');
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        setLoading(false);
        return { error: { message: 'Failed to sign out. Please try again.' } };
      }
      console.log('Sign out successful');
      setLoading(false);
      return { error: null };
    } catch (err) {
      console.error('Unexpected sign out error:', err);
      setLoading(false);
      return { error: { message: 'An unexpected error occurred during sign out.' } };
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithInstagram,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
