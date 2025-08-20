'use client';

import Layout from "@/components/Layout";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="relative min-h-screen">
        <div className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="w-full">

            {/* Header */}
            <div className="max-w-2xl mb-16">
              <h1 className="font-highlight text-5xl md:text-6xl font-normal text-black mb-6 leading-tight">
                Welcome Back
              </h1>
              <p className="font-simple text-xl text-[var(--color-secondary)]">
                Sign in to your Cuthours account to access your automation dashboard.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Login Form */}
              <div className="space-y-8">
                <h2 className="font-highlight text-2xl font-bold text-black">
                  Sign In
                </h2>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="font-simple text-sm text-red-600">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-simple text-sm font-medium text-black mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg font-simple focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block font-simple text-sm font-medium text-black mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg font-simple focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="font-simple text-sm text-[var(--color-secondary)]">Remember me</span>
                    </label>
                    <a href="#" className="font-simple text-sm text-[var(--color-accent)] hover:text-black transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white px-8 py-4 rounded-lg font-simple text-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>

                <div className="hidden">
                  {/* Divider */}
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[var(--color-border)]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white font-simple text-[var(--color-secondary)]">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center px-4 py-3 border border-[var(--color-border)] rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="font-simple text-black">Continue with Google</span>
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-3 border border-[var(--color-border)] rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="font-simple text-black">Continue with GitHub</span>
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="mt-8">
                    <p className="font-simple text-[var(--color-secondary)]">
                      Don't have an account?{' '}
                      <a href="#" className="text-[var(--color-accent)] hover:text-black transition-colors">
                        Sign up for free
                      </a>
                    </p>
                  </div>
                </div>
              </div>


              {/* Information Panel */}
              <div className="space-y-8">
                <h2 className="font-highlight text-2xl font-bold text-black">
                  Access Your Dashboard
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-simple text-sm font-medium text-black mb-2">What you'll find inside</h3>
                    <ul className="font-simple text-[var(--color-secondary)] space-y-2">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        Monitor your automation workflows
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        Track performance metrics
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        Manage integrations
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        Download reports
                      </li>
                    </ul>
                  </div>

                  <div className="hidden">
                    <h3 className="font-simple text-sm font-medium text-black mb-2">Demo Account</h3>
                    <p className="font-simple text-[var(--color-secondary)]">
                      This is a demo login page. Contact us to set up your real account and start automating your business processes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
