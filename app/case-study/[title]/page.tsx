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
                {caseStudy.client === "AI-gen" && (
                  <>
                <div>
                  <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                    The Challenge
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          Educational institutions were struggling with creating high-quality course content efficiently. Teachers spent countless hours developing course materials, lesson plans, and assessments manually.
                        </p>
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          The process was time-consuming and often resulted in inconsistent content quality. Educators needed a way to generate comprehensive course materials quickly while maintaining educational standards.
                    </p>
                    <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed">
                          AI-gen approached us to develop an automated course generation platform that could help teachers create engaging, comprehensive course content in minutes rather than weeks.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                    Our Solution
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          We built an AI-powered course generation platform that uses advanced natural language processing and educational content algorithms to create comprehensive course materials.
                        </p>
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          The platform can generate lesson plans, quizzes, assignments, and supplementary materials based on subject matter, grade level, and learning objectives. Teachers can customize the content and add their own materials as needed.
                    </p>
                    <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed">
                          The system includes features like difficulty adjustment, content personalization, and automatic assessment generation, making it a complete teaching assistant.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                    Results & Impact
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="font-highlight text-3xl font-bold text-black mb-2">
                            30+
                          </div>
                          <div className="font-simple text-sm text-[var(--color-secondary)]">
                            Active Teachers
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="font-highlight text-3xl font-bold text-black mb-2">
                            95%
                          </div>
                          <div className="font-simple text-sm text-[var(--color-secondary)]">
                            Time Saved
                          </div>
                        </div>
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="font-highlight text-3xl font-bold text-black mb-2">
                            500+
                          </div>
                          <div className="font-simple text-sm text-[var(--color-secondary)]">
                            Courses Generated
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="font-highlight text-3xl font-bold text-black mb-2">
                            4.8/5
                        </div>
                        <div className="font-simple text-sm text-[var(--color-secondary)]">
                            Teacher Satisfaction
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {caseStudy.client === "Automating BookingKoala and Jobber" && (
                  <>
                    <div>
                      <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                        The Challenge
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          Service-based businesses using BookingKoala and Jobber were facing inventory management challenges. Manual tracking of supplies, equipment, and resources led to frequent stockouts and inefficient operations.
                        </p>
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          The disconnect between booking systems and inventory management created operational bottlenecks. Businesses needed real-time visibility into their resources while managing customer appointments seamlessly.
                        </p>
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed">
                          The client required an AI-powered solution that could integrate with their existing booking platforms and provide intelligent inventory optimization.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                        Our Solution
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          We developed an AI-powered inventory management system that integrates seamlessly with BookingKoala and Jobber platforms. The system uses machine learning algorithms to predict inventory needs based on booking patterns and historical data.
                        </p>
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          The platform provides real-time inventory tracking, automated reorder alerts, and optimization recommendations. It analyzes booking trends to suggest optimal stock levels and prevent both stockouts and overstocking.
                        </p>
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed">
                          Advanced analytics help businesses make data-driven decisions about inventory management, reducing waste and improving operational efficiency.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                        Results & Impact
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="font-highlight text-3xl font-bold text-black mb-2">
                            40%
                          </div>
                          <div className="font-simple text-sm text-[var(--color-secondary)]">
                            Inventory Cost Reduction
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="font-highlight text-3xl font-bold text-black mb-2">
                            99%
                          </div>
                          <div className="font-simple text-sm text-[var(--color-secondary)]">
                            Stock Accuracy
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="font-highlight text-3xl font-bold text-black mb-2">
                            25+
                      </div>
                      <div className="font-simple text-sm text-[var(--color-secondary)]">
                        Hours Saved Weekly
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="font-highlight text-3xl font-bold text-black mb-2">
                            0
                          </div>
                          <div className="font-simple text-sm text-[var(--color-secondary)]">
                            Stockout Incidents
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {caseStudy.client === "Carbonfootprint.store" && (
                  <>
                    <div>
                      <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                        The Challenge
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          Carbonfootprint.store wanted to create an innovative platform for businesses and individuals to offset their carbon emissions by purchasing carbon credits. However, they faced challenges in creating a user-friendly marketplace that could handle complex carbon credit transactions.
                        </p>
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          The platform needed to integrate with various carbon credit providers, handle different types of credits, and provide transparent tracking of environmental impact. Manual processes were inefficient and prone to errors.
                        </p>
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed">
                          They needed a robust e-commerce platform specifically designed for carbon credit trading with advanced analytics and reporting capabilities.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                        Our Solution
                      </h2>
                      <div className="prose prose-lg max-w-none">
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          We developed a comprehensive carbon credit marketplace platform that connects buyers with verified carbon credit providers. The platform features an intuitive interface for browsing and purchasing carbon credits from various projects worldwide.
                        </p>
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed mb-4">
                          The system includes advanced features like impact tracking, certificate generation, and detailed analytics showing the environmental benefits of each purchase. Smart algorithms help users find the most suitable carbon credits based on their needs and budget.
                        </p>
                        <p className="font-simple text-lg text-[var(--color-secondary)] leading-relaxed">
                          Integration with payment processors and automated certificate delivery makes the entire process seamless for both buyers and sellers of carbon credits.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h2 className="font-highlight text-2xl md:text-3xl font-bold text-black mb-6">
                        Results & Impact
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="font-highlight text-3xl font-bold text-black mb-2">
                            1000+
                          </div>
                          <div className="font-simple text-sm text-[var(--color-secondary)]">
                            Carbon Credits Sold
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="font-highlight text-3xl font-bold text-black mb-2">
                            50+
                          </div>
                          <div className="font-simple text-sm text-[var(--color-secondary)]">
                            Partner Projects
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="font-highlight text-3xl font-bold text-black mb-2">
                            98%
                          </div>
                          <div className="font-simple text-sm text-[var(--color-secondary)]">
                            Transaction Success Rate
                          </div>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                          <div className="font-highlight text-3xl font-bold text-black mb-2">
                            85%
                          </div>
                          <div className="font-simple text-sm text-[var(--color-secondary)]">
                            Customer Satisfaction
                      </div>
                    </div>
                  </div>
                </div>
                  </>
                )}
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
                      <div className="font-simple text-sm text-[var(--color-secondary)]">
                        {caseStudy.client === "AI-gen" && "Education Technology"}
                        {caseStudy.client === "Automating BookingKoala and Jobber" && "Service Industry & Business Management"}
                        {caseStudy.client === "Carbonfootprint.store" && "Environmental & Sustainability"}
                      </div>
                    </div>
                    <div>
                      <div className="font-simple text-sm font-medium text-black mb-1">Duration</div>
                      <div className="font-simple text-sm text-[var(--color-secondary)]">
                        {caseStudy.client === "AI-gen" && "4 months"}
                        {caseStudy.client === "Automating BookingKoala and Jobber" && "6 months"}
                        {caseStudy.client === "Carbonfootprint.store" && "5 months"}
                      </div>
                    </div>
                    <div>
                      <div className="font-simple text-sm font-medium text-black mb-1">Team Size</div>
                      <div className="font-simple text-sm text-[var(--color-secondary)]">
                        {caseStudy.client === "AI-gen" && "3 AI Engineers + 2 Educators"}
                        {caseStudy.client === "Automating BookingKoala and Jobber" && "4 Full-stack Developers"}
                        {caseStudy.client === "Carbonfootprint.store" && "5 Specialists"}
                      </div>
                    </div>
                    <div>
                      <div className="font-simple text-sm font-medium text-black mb-1">Technologies</div>
                      <div className="font-simple text-sm text-[var(--color-secondary)]">
                        {caseStudy.client === "AI-gen" && "Python, OpenAI GPT, React, Node.js"}
                        {caseStudy.client === "Automating BookingKoala and Jobber" && "Python, Machine Learning, APIs, React"}
                        {caseStudy.client === "Carbonfootprint.store" && "Next.js, Stripe, PostgreSQL, AWS"}
                      </div>
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
