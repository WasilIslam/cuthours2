'use client';

import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already logged in, redirect to dashboard
        window.location.href = '/dashboard';
      }
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithPopup(auth, googleProvider);
      // Redirect will happen automatically via useEffect
    } catch (error: any) {
      console.error('Sign in failed:', error);
      setError(error.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="relative min-h-screen flex">
        {/* Login Form Section */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 lg:px-12 py-16">
          <div className="w-full max-w-md">

            {/* Header */}
            <div className="mb-12">
              <h1 className="font-highlight text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-6 leading-tight">
                Welcome Back
              </h1>
              <p className="font-simple text-lg md:text-xl text-[var(--color-secondary)]">
                Sign in to your Cuthours account to access your automation dashboard.
              </p>
            </div>

            {/* Login Form */}
            <div className="space-y-8">
              <h2 className="font-highlight text-2xl font-bold text-black">
                Sign In with Google
              </h2>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-simple text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-8 py-4 border border-[var(--color-border)] rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-simple text-lg text-black">
                    {loading ? 'Signing In...' : 'Continue with Google'}
                  </span>
                </button>

                <div className="text-center">
                  <p className="font-simple text-sm text-[var(--color-secondary)]">
                    Sign in with your Google account to access your automation dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Page Background Image */}
        <div className="hidden lg:flex flex-1 relative">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1755587024539-fd578bf24272?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            }}
          />
        </div>
      </section>
    </Layout>
  );
}
