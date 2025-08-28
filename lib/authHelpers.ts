import { useAuth, useUser } from '@clerk/nextjs';
import { supabase } from './supabaseClient';
import { useEffect } from 'react';

/**
 * Hook that provides Clerk user ID and ensures user exists in Supabase
 */
export function useAuthUser() {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();

  // Ensure user exists in Supabase when authenticated
  useEffect(() => {
    async function ensureUserExists() {
      if (!isSignedIn || !userId || !user) return;

      try {
        // First check if user already exists
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('id')
          .eq('id', userId)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          // PGRST116 is "not found" - any other error is concerning
          console.error('Error checking user existence:', fetchError);
          return;
        }

        // If user doesn't exist, create them
        if (!existingUser) {
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: userId,
              email: user.primaryEmailAddress?.emailAddress || null,
            });

          if (insertError) {
            console.error('Error creating user in Supabase:', insertError);
          } else {
            console.log('✅ User created in Supabase:', userId);
          }
        }
      } catch (error) {
        console.error('Unexpected error in ensureUserExists:', error);
      }
    }

    ensureUserExists();
  }, [isSignedIn, userId, user]);

  return {
    isSignedIn,
    clerkUserId: userId,
    user,
  };
}

/**
 * Simple function to get current Clerk user ID
 */
export function getCurrentClerkUserId(): string | null {
  // This is a client-side only helper
  // For server-side, use auth() from @clerk/nextjs/server
  if (typeof window === 'undefined') return null;
  
  // In practice, this should be called from within components that already use useAuth()
  // This is more of a utility function for type safety
  return null;
}

/**
 * Sets the Supabase auth token from Clerk for RLS
 * This ensures RLS policies work correctly with Clerk authentication
 */
export async function setSupabaseAuthFromClerk(clerkToken: string | null) {
  if (!clerkToken) {
    await supabase.auth.signOut();
    return;
  }

  try {
    // Set the JWT token for Supabase RLS
    await supabase.auth.setSession({
      access_token: clerkToken,
      refresh_token: '', // Not needed for our use case
    });
  } catch (error) {
    console.error('Error setting Supabase auth token:', error);
  }
}
