'use client';

import { useState, useEffect, createContext } from 'react';
import type { Session } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@/util/supabaseClient';

const supabase = createClient();

export const SessionContext = createContext<Session | null>(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};
