'use client';

import Layout from "@/components/Layout";
import config from "@/config.json";
import { notFound } from 'next/navigation';

interface CaseStudyPageProps {
  params: {
    title: string;
  };
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const decodedTitle = decodeURIComponent(params.title);
  
  // Find the case study by client name (title)
  const caseStudy = config.case_studies.find(
    study => study.client.toLowerCase() === decodedTitle.toLowerCase()
  );

  if (!caseStudy) {
    notFound();
  }

  return (
    <Layout>
      <section className="relative min-h-screen">
        <div className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="w-full max-w-6xl mx-auto">
            
            {/* Hero Section */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="font-highlight text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-6 leading-tight">
                    {caseStudy.client}
                  </h1>
                  <p className="font-simple text-xl md:text-2xl text-[var(--color-secondary)] mb-8">
                    {caseStudy.description}
                  </p>
                  {caseStudy.metric && (
                    <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-xl inline-block">
                      <div className="font-highlight text-3xl md:text-4xl font-bold mb-2">
                        {caseStudy.metric}
                      </div>
                      <div className="font-simple text-sm opacity-90">
                        {caseStudy.metric_label || 'Improvement'}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div 
                    className="w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      backgroundImage: `url(${caseStudy.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Challenge */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                    The Challenge
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                      {caseStudy.client} was facing significant operational inefficiencies that were impacting their growth and productivity. Their existing processes were manual, time-consuming, and prone to errors.
                    </p>
                    <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed">
                      The organization needed a sophisticated solution that could automate their workflows while maintaining the flexibility to adapt to their unique business requirements.
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                    Our Solution
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                      We developed a comprehensive AI-powered automation system specifically tailored to {caseStudy.client}'s operational needs. The solution integrated seamlessly with their existing infrastructure while providing advanced analytics and optimization capabilities.
                    </p>
                    <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed">
                      {caseStudy.description} The implementation resulted in significant time savings and improved operational efficiency across all departments.
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                    Results & Impact
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {caseStudy.metric && (
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="font-highlight text-3xl font-bold text-black mb-2">
                          {caseStudy.metric}
                        </div>
                        <div className="font-simple text-sm text-[var(--color-secondary)]">
                          {caseStudy.metric_label || 'Overall Improvement'}
                        </div>
                      </div>
                    )}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="font-highlight text-3xl font-bold text-black mb-2">
                        99.9%
                      </div>
                      <div className="font-simple text-sm text-[var(--color-secondary)]">
                        System Uptime
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="font-highlight text-3xl font-bold text-black mb-2">
                        20+
                      </div>
                      <div className="font-simple text-sm text-[var(--color-secondary)]">
                        Hours Saved Weekly
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="font-highlight text-3xl font-bold text-black mb-2">
                        100%
                      </div>
                      <div className="font-simple text-sm text-[var(--color-secondary)]">
                        Error Reduction
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-highlight text-xl font-bold text-black mb-4">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="font-simple text-sm font-medium text-black mb-1">Client</div>
                      <div className="font-simple text-sm text-[var(--color-secondary)]">{caseStudy.client}</div>
                    </div>
                    <div>
                      <div className="font-simple text-sm font-medium text-black mb-1">Industry</div>
                      <div className="font-simple text-sm text-[var(--color-secondary)]">Technology & Automation</div>
                    </div>
                    <div>
                      <div className="font-simple text-sm font-medium text-black mb-1">Duration</div>
                      <div className="font-simple text-sm text-[var(--color-secondary)]">3-6 months</div>
                    </div>
                    <div>
                      <div className="font-simple text-sm font-medium text-black mb-1">Team Size</div>
                      <div className="font-simple text-sm text-[var(--color-secondary)]">4-6 specialists</div>
                    </div>
                  </div>
                </div>

                <div className="bg-black text-white p-6 rounded-lg">
                  <h3 className="font-highlight text-xl font-bold mb-4">
                    Ready to Transform Your Business?
                  </h3>
                  <p className="font-simple text-sm mb-6 opacity-90">
                    Get started with a free consultation to see how we can automate your processes.
                  </p>
                  <button className="w-full bg-white text-black px-6 py-3 rounded-lg font-simple text-sm font-medium hover:bg-gray-100 transition-colors">
                    Schedule a Call
                  </button>
                </div>

                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="font-highlight text-xl font-bold text-black mb-4">
                    Similar Projects
                  </h3>
                  <div className="space-y-3">
                    {config.case_studies
                      .filter(study => study.client !== caseStudy.client)
                      .slice(0, 2)
                      .map((study, index) => (
                        <a 
                          key={index}
                          href={`/case-study/${encodeURIComponent(study.client)}`}
                          className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="font-simple text-sm font-medium text-black mb-1">
                            {study.client}
                          </div>
                          <div className="font-simple text-xs text-[var(--color-secondary)]">
                            {study.description.substring(0, 80)}...
                          </div>
                        </a>
                      ))
                    }
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
