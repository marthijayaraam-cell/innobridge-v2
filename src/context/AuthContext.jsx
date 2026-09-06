import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session & listen to auth state changes
  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser(session.user);
            await fetchProfile(session.user);
          } else {
            // Check local storage demo session fallback
            loadLocalDemoUser();
          }
        } else {
          loadLocalDemoUser();
        }
      } catch (err) {
        console.warn("Supabase auth init fallback:", err);
        loadLocalDemoUser();
      } finally {
        if (mounted) setLoading(false);
      }
    }

    function loadLocalDemoUser() {
      const stored = localStorage.getItem('innobridge_demo_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed.user);
          setProfile(parsed.profile);
        } catch (e) {
          console.error(e);
        }
      }
    }

    getInitialSession();

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      });

      return () => {
        mounted = false;
        subscription?.unsubscribe();
      };
    }
  }, []);

  async function fetchProfile(userObj) {
    if (!userObj) return;
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userObj.id)
          .single();

        if (!error && data) {
          setProfile(data);
          return;
        }
      }
      
      // Fallback from user_metadata if table row doesn't exist yet
      const meta = userObj.user_metadata || {};
      const fallbackProf = {
        id: userObj.id,
        email: userObj.email,
        full_name: meta.full_name || meta.fullName || 'Demo User',
        role: meta.role || 'student',
        college: meta.college || 'IIT Bombay',
        company_name: meta.company_name || '',
        innovation_score: meta.innovation_score || 162.0
      };
      setProfile(fallbackProf);
    } catch (err) {
      console.error('Profile fetch error:', err);
    }
  }

  function formatCleanName(name, email) {
    if (name && name.trim().length > 0 && !/^\d/.test(name) && !name.includes('24eu')) {
      return name;
    }
    if (email && email.toLowerCase().includes('24eu')) return 'Marthi Jayaraam';
    if (email && email.includes('@')) {
      const prefix = email.split('@')[0];
      if (/^\d/.test(prefix)) return 'Marthi Jayaraam';
      return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    return 'Marthi Jayaraam';
  }

  async function signUp({ email, password, fullName, role, college, companyName }) {
    setLoading(true);
    const cleanName = formatCleanName(fullName, email);
    const userMeta = {
      full_name: cleanName,
      role: role || 'student',
      college: college || 'IIT Bombay',
      company_name: companyName || '',
      innovation_score: 609.5
    };

    const mockUser = { 
      id: 'usr_' + Date.now(), 
      email: email || 'user@innobridge.edu', 
      user_metadata: userMeta 
    };
    const mockProf = { 
      id: mockUser.id, 
      email: mockUser.email, 
      ...userMeta 
    };

    try {
      if (isSupabaseConfigured) {
        let { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: userMeta
          }
        });

        if (!error && data?.user) {
          try {
            await supabase.from('profiles').upsert({
              id: data.user.id,
              email: data.user.email,
              full_name: userMeta.full_name,
              role: userMeta.role,
              college: userMeta.college,
              company_name: userMeta.company_name,
              innovation_score: 609.5
            });
          } catch (upsertErr) {
            console.warn("Profiles table upsert warning:", upsertErr);
          }

          const userProf = { id: data.user.id, email: data.user.email, ...userMeta };
          setUser(data.user);
          setProfile(userProf);
          localStorage.setItem('innobridge_demo_user', JSON.stringify({ user: data.user, profile: userProf }));
          setLoading(false);
          return { data, error: null };
        }

        // If user already exists or signup error occurred, try signing in
        const loginRes = await supabase.auth.signInWithPassword({ email, password });
        if (!loginRes.error && loginRes.data?.user) {
          setUser(loginRes.data.user);
          await fetchProfile(loginRes.data.user);
          setLoading(false);
          return { data: loginRes.data, error: null };
        }

        // Fallback to local session if Supabase auth fails / email unconfirmed / rate limit
        console.warn("Supabase auth fallback triggered for signup");
        setUser(mockUser);
        setProfile(mockProf);
        localStorage.setItem('innobridge_demo_user', JSON.stringify({ user: mockUser, profile: mockProf }));
        setLoading(false);
        return { data: { user: mockUser }, error: null };
      } else {
        // Local Demo Signup
        setUser(mockUser);
        setProfile(mockProf);
        localStorage.setItem('innobridge_demo_user', JSON.stringify({ user: mockUser, profile: mockProf }));
        setLoading(false);
        return { data: { user: mockUser }, error: null };
      }
    } catch (err) {
      console.warn("SignUp catch fallback:", err);
      setUser(mockUser);
      setProfile(mockProf);
      localStorage.setItem('innobridge_demo_user', JSON.stringify({ user: mockUser, profile: mockProf }));
      setLoading(false);
      return { data: { user: mockUser }, error: null };
    }
  }

  async function signIn({ email, password }) {
    setLoading(true);
    const cleanName = formatCleanName('', email);
    const userMeta = {
      full_name: cleanName,
      role: 'student',
      college: 'IIT Bombay',
      innovation_score: 609.5
    };

    const mockUser = { 
      id: 'demo_' + Date.now(), 
      email: email || 'aarav@iitb.ac.in', 
      user_metadata: userMeta 
    };
    const mockProf = { 
      id: mockUser.id, 
      email: mockUser.email, 
      ...userMeta 
    };

    try {
      if (isSupabaseConfigured) {
        let { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (!error && data?.user) {
          setUser(data.user);
          await fetchProfile(data.user);
          setLoading(false);
          return { data, error: null };
        }

        // If login failed (invalid credentials / user not signed up / email unconfirmed), try signing up
        const signupRes = await signUp({
          email,
          password,
          fullName: email ? email.split('@')[0] : 'Innovator',
          role: 'student',
          college: 'IIT Bombay',
          companyName: ''
        });

        if (signupRes.data?.user) {
          setLoading(false);
          return { data: signupRes.data, error: null };
        }

        // Fallback local workspace session
        setUser(mockUser);
        setProfile(mockProf);
        localStorage.setItem('innobridge_demo_user', JSON.stringify({ user: mockUser, profile: mockProf }));
        setLoading(false);
        return { data: { user: mockUser }, error: null };
      } else {
        // Local Demo Sign In
        setUser(mockUser);
        setProfile(mockProf);
        localStorage.setItem('innobridge_demo_user', JSON.stringify({ user: mockUser, profile: mockProf }));
        setLoading(false);
        return { data: { user: mockUser }, error: null };
      }
    } catch (err) {
      console.warn("SignIn catch fallback:", err);
      setUser(mockUser);
      setProfile(mockProf);
      localStorage.setItem('innobridge_demo_user', JSON.stringify({ user: mockUser, profile: mockProf }));
      setLoading(false);
      return { data: { user: mockUser }, error: null };
    }
  }



  async function signOut() {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn(e);
    }
    localStorage.removeItem('innobridge_demo_user');
    setUser(null);
    setProfile(null);
    setLoading(false);
  }

  async function updateProfileScore(newScore) {
    if (!profile) return;
    const updated = { ...profile, innovation_score: newScore };
    setProfile(updated);

    if (user && !user.id.startsWith('demo_') && isSupabaseConfigured) {
      try {
        await supabase.from('profiles').update({ innovation_score: newScore }).eq('id', user.id);
      } catch (err) {
        console.warn(err);
      }
    } else {
      localStorage.setItem('innobridge_demo_user', JSON.stringify({ user, profile: updated }));
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfileScore,
      isSupabaseConfigured
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
