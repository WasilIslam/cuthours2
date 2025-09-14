import Layout from "@/components/Layout";
import CaseStudyCard from "@/components/CaseStudyCard";
import Link from "next/link";
import config from "@/config.json";

export default function Home() {
  return (
    <Layout>
          
      {/* Hero Section */}
      <section className="relative">
        <div className="px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16 xl:py-24">
          <div className="w-full">
            
            {/* Mobile CTA Button */}
            <div className="flex justify-end mb-6 lg:hidden">
              <Link href="/contact" className="bg-black text-white px-4 py-2 rounded-full font-simple text-sm hover:bg-gray-800 transition-colors inline-block">
                {config.hero.cta_primary}
              </Link>
            </div>

            {/* Desktop: Headline with aligned CTA button */}
            <div className="hidden lg:flex items-start justify-between mb-4">
              <h1 className="font-highlight text-4xl xl:text-5xl font-normal text-black leading-tight max-w-4xl">
                {config.hero.headline}
              </h1>
              <Link href="/contact" className="bg-black text-white px-6 py-3 rounded-full font-simple text-sm hover:bg-gray-800 transition-colors ml-8 flex-shrink-0 inline-block">
                {config.hero.cta_primary}
              </Link>
            </div>

            {/* Mobile: Headline only */}
            <h1 className="lg:hidden font-highlight text-2xl md:text-3xl font-normal text-black mb-3 leading-tight">
              {config.hero.headline}
            </h1>
            <h2 className="font-highlight text-base md:text-lg lg:text-xl text-[var(--color-secondary)] mb-6 md:mb-8 font-normal max-w-3xl">
              {config.hero.subheading}
            </h2>


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
      <section className="border-t border-[var(--color-border)] bg-white client-section">
        <div className="px-4 md:px-8 lg:px-12 py-12 md:py-16">
          <div className="w-full">
            <h2 className="font-highlight text-xl md:text-2xl font-normal text-black mb-3 md:mb-4">
              {config.clients.title}
            </h2>
            <p className="font-simple text-sm md:text-base text-[var(--color-secondary)] mb-6 md:mb-8 max-w-3xl">
              {config.clients.subtitle}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center">
              {config.clients.list.map((client, index) => (
                <a 
                  key={index} 
                  href={config.clients.list_links[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:scale-105"
                >
                  {config.clients.show_images && config.clients.list_images && (
                    <div className="relative w-full h-16 md:h-20 mb-3 flex items-center justify-center">
                      <img
                        src={config.clients.list_images[index]}
                        alt={`${client} logo`}
                        className="client-logo max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="font-simple text-sm md:text-base font-medium text-center text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                    {client}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="w-full">
            <h1 className="font-highlight text-3xl md:text-4xl font-normal text-black mb-6 leading-tight">
              {config.services.title}
            </h1>
            <p className="font-simple text-xl text-[var(--color-secondary)] mb-16 max-w-3xl">
              {config.services.subtitle}
            </p>

            {/* Service Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {config.services.categories.map((service, index) => (
                <div key={index} className="space-y-6">
                  <div className={`w-16 h-16 ${service.icon === 'ai' ? 'bg-black' : 'bg-[var(--color-accent)]'} rounded-lg flex items-center justify-center`}>
                    <div className="w-8 h-8 bg-white rounded"></div>
                  </div>
                  <div>
                    <h2 className="font-highlight text-3xl font-bold text-black mb-4">
                      {service.title}
                    </h2>
                    <p className="font-simple text-lg text-[var(--color-secondary)] mb-6">
                      {service.description}
                    </p>
                    <ul className="font-simple text-[var(--color-secondary)] space-y-3">
                      {service.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center">
                          <span className={`w-2 h-2 ${service.icon === 'ai' ? 'bg-black' : 'bg-[var(--color-accent)]'} rounded-full mr-3`}></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="w-full">
            <h2 className="font-highlight text-3xl md:text-4xl font-normal text-black mb-16">
              {config.services.process.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {config.services.process.steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-highlight text-2xl font-bold mx-auto mb-6">
                    {step.number}
                  </div>
                  <h3 className="font-highlight text-xl font-bold text-black mb-4">{step.title}</h3>
                  <p className="font-simple text-[var(--color-secondary)]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* People Section */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="w-full">
            <h2 className="font-highlight text-3xl md:text-4xl font-normal text-black mb-6">
              {config.people.title}
            </h2>
            <p className="font-simple text-xl text-[var(--color-secondary)] mb-16 max-w-3xl">
              {config.people.subtitle}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {config.people.team.map((person, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="font-highlight text-2xl font-bold text-gray-600">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-highlight text-lg font-bold text-black mb-2">{person.name}</h3>
                  <p className="font-simple text-sm text-[var(--color-accent)] mb-3 font-medium">{person.role}</p>
                  <p className="font-simple text-sm text-[var(--color-secondary)] leading-relaxed">{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-gray-50">
        <div className="px-4 md:px-8 lg:px-12 py-12">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <h3 className="font-highlight text-2xl font-bold text-black mb-2">
                  {config.footer.company}
                </h3>
                <p className="font-simple text-[var(--color-secondary)] mb-4">
                  {config.footer.description}
                </p>
              </div>
              
              {/* Quick Links */}
              <div>
                <h4 className="font-highlight text-lg font-bold text-black mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href={config.footer.links.services} className="font-simple text-[var(--color-secondary)] hover:text-black transition-colors">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href={config.footer.links.contact} className="font-simple text-[var(--color-secondary)] hover:text-black transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href={config.footer.links.about} className="font-simple text-[var(--color-secondary)] hover:text-black transition-colors">
                      About
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="font-highlight text-lg font-bold text-black mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li>
                    <a href={config.footer.social.linkedin} target="_blank" rel="noopener noreferrer" className="font-simple text-[var(--color-secondary)] hover:text-black transition-colors">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href={config.footer.social.twitter} target="_blank" rel="noopener noreferrer" className="font-simple text-[var(--color-secondary)] hover:text-black transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href={config.footer.social.github} target="_blank" rel="noopener noreferrer" className="font-simple text-[var(--color-secondary)] hover:text-black transition-colors">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-[var(--color-border)] mt-8 pt-8">
              <p className="font-simple text-sm text-[var(--color-secondary)] text-center">
                {config.footer.copyright}
              </p>
            </div>
          </div>
        </div>
      </footer>

    </Layout>
  );
}
