import Layout from "@/components/Layout";
import CaseStudyCard from "@/components/CaseStudyCard";
import config from "@/config.json";

export default function Home() {
  return (
    <Layout>
          
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div className="px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16 xl:py-24">
          <div className="w-full">
            
            {/* Mobile CTA Button */}
            <div className="flex justify-end mb-6 lg:hidden">
              <button className="bg-black text-white px-4 py-2 rounded-full font-simple text-sm hover:bg-gray-800 transition-colors">
                {config.hero.cta_primary}
              </button>
            </div>

            {/* Desktop: Headline with aligned CTA button */}
            <div className="hidden lg:flex items-start justify-between mb-4">
              <h1 className="font-highlight text-4xl xl:text-5xl font-normal text-black leading-tight max-w-4xl">
                {config.hero.headline}
              </h1>
              <button className="bg-black text-white px-6 py-3 rounded-full font-simple text-sm hover:bg-gray-800 transition-colors ml-8 flex-shrink-0">
                {config.hero.cta_primary}
              </button>
            </div>

            {/* Mobile: Headline only */}
            <h1 className="lg:hidden font-highlight text-2xl md:text-3xl font-normal text-black mb-3 leading-tight">
              {config.hero.headline}
            </h1>
            <h2 className="font-highlight text-base md:text-lg lg:text-xl text-[var(--color-secondary)] mb-6 md:mb-8 font-normal max-w-3xl">
              {config.hero.subheading}
            </h2>

            {/* CTA Buttons */}
            <div className="hidden flex flex-col sm:flex-row flex-wrap gap-2 md:gap-3 mb-12 md:mb-16">
              <button className="bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-simple text-sm md:text-base hover:bg-gray-800 transition-colors text-center">
                {config.hero.cta_primary}
              </button>
              <button className="bg-white text-black border border-[var(--color-border)] px-4 md:px-6 py-2 md:py-3 rounded-lg font-simple text-sm md:text-base hover:bg-gray-50 transition-colors text-center">
                {config.hero.cta_secondary}
              </button>
              <button className="bg-white text-black border border-[var(--color-border)] px-4 md:px-6 py-2 md:py-3 rounded-lg font-simple text-sm md:text-base hover:bg-gray-50 transition-colors text-center">
                {config.hero.cta_tertiary}
              </button>
            </div>

            {/* Case Study Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
              <CaseStudyCard 
                caseStudy={config.case_studies[0]} 
                size="large"
              />

              <div className="space-y-4 md:space-y-6">
                <CaseStudyCard 
                  caseStudy={config.case_studies[1]} 
                  size="small"
                />
                <CaseStudyCard 
                  caseStudy={config.case_studies[2]} 
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="px-4 md:px-8 lg:px-12 py-12 md:py-16">
          <div className="w-full">
            <h2 className="font-highlight text-xl md:text-2xl font-normal text-black mb-6 md:mb-8">
              Our track record
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center md:text-left space-y-1 md:space-y-2">
                <div className="font-highlight text-2xl md:text-3xl font-bold text-black">{config.stats.projects}</div>
                <div className="font-simple text-sm text-[var(--color-secondary)]">{config.stats.projects_label}</div>
              </div>
              <div className="text-center md:text-left space-y-1 md:space-y-2">
                <div className="font-highlight text-2xl md:text-3xl font-bold text-black">{config.stats.efficiency}</div>
                <div className="font-simple text-sm text-[var(--color-secondary)]">{config.stats.efficiency_label}</div>
              </div>
              <div className="text-center md:text-left space-y-1 md:space-y-2">
                <div className="font-highlight text-2xl md:text-3xl font-bold text-black">{config.stats.uptime}</div>
                <div className="font-simple text-sm text-[var(--color-secondary)]">{config.stats.uptime_label}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="px-4 md:px-8 lg:px-12 py-12 md:py-16">
          <div className="w-full">
            <h2 className="font-highlight text-xl md:text-2xl font-normal text-black mb-3 md:mb-4">
              {config.clients.title}
            </h2>
            <p className="font-simple text-sm md:text-base text-[var(--color-secondary)] mb-6 md:mb-8 max-w-3xl">
              {config.clients.subtitle}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center opacity-60">
              {config.clients.list.map((client, index) => (
                <div key={index} className="font-simple text-base md:text-lg font-medium text-center">
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
          <div className="w-full">
            <div className="mb-8 md:mb-12">
              <h2 className="font-highlight text-xl md:text-2xl lg:text-3xl font-normal text-black mb-3 md:mb-4">
                {config.services.title}
              </h2>
              <p className="font-simple text-sm md:text-base text-[var(--color-secondary)] max-w-3xl">
                {config.services.subtitle}
              </p>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {config.services.categories.map((service, index) => (
                <div key={index} className="text-center">
                  <h3 className="font-simple text-xs md:text-sm font-medium text-black mb-1 md:mb-2">{service.name}</h3>
                  <div className="font-highlight text-lg md:text-xl font-bold text-black mb-1">{service.time_saved}</div>
                  <div className="font-simple text-xs text-[var(--color-secondary)]">{service.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="px-4 md:px-8 lg:px-12 py-12 md:py-16">
          <div className="w-full">
            <h2 className="font-highlight text-xl md:text-2xl font-normal text-black mb-3 md:mb-4">
              {config.trust.title}
            </h2>
            <p className="font-simple text-sm md:text-base text-[var(--color-secondary)]">
              {config.trust.subtitle}
            </p>
          </div>
    </div>
      </section>

    </Layout>
  );
}
