'use client';

import { useAuth } from '@/hooks/useAuth';
import ContactForm from '@/components/ContactForm';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          ⚠️ You are not using any of our services at the moment. Please contact us using the form below.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-8">
        <ContactForm />
      </div>
    </div>
  );
}