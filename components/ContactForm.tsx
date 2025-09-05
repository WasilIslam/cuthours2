'use client';

import { useEffect, useState } from 'react';

interface FormData {
  fullName: string;
  email: string;
  company: string;
  projectDetails: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    projectDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // Any side effects can be added here
    console.log('Contact form mounted');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you! We\'ll get back to you within 24 hours.');
        setFormData({
          fullName: '',
          email: '',
          company: '',
          projectDetails: ''
        });
      } else {
        setSubmitMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="font-highlight text-2xl font-bold text-black">
        Get Started Today
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-simple text-sm font-medium text-black mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg font-simple focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block font-simple text-sm font-medium text-black mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg font-simple focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="john@company.com"
          />
        </div>

        <div>
          <label className="block font-simple text-sm font-medium text-black mb-2">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg font-simple focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Your Company"
          />
        </div>

        <div>
          <label className="block font-simple text-sm font-medium text-black mb-2">
            Project Details
          </label>
          <textarea
            rows={4}
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg font-simple focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Tell us about your automation needs..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white px-8 py-4 rounded-lg font-simple text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Request a Demo'}
        </button>

        {submitMessage && (
          <p className={`text-center font-simple ${submitMessage.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
            {submitMessage}
          </p>
        )}
      </form>
    </div>
  );
}
