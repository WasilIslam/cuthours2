import Layout from "@/components/Layout";

export default function Services() {
  return (
    <Layout>
      <section className="relative">
        <div className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="w-full">
            <h1 className="font-highlight text-5xl md:text-6xl font-normal text-black mb-6 leading-tight">
              Our Services
            </h1>
            <p className="font-simple text-xl text-[var(--color-secondary)] mb-16 max-w-3xl">
              We specialize in AI automation and modern web development to transform your business operations.
            </p>

            {/* Service Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded"></div>
                </div>
                <div>
                  <h2 className="font-highlight text-3xl font-bold text-black mb-4">
                    AI Automation
                  </h2>
                  <p className="font-simple text-lg text-[var(--color-secondary)] mb-6">
                    Intelligent workflows that handle repetitive tasks, analyze data, and make decisions automatically.
                  </p>
                  <ul className="font-simple text-[var(--color-secondary)] space-y-3">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                      Process Automation & Workflow Optimization
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                      Data Analysis & Business Intelligence
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                      Custom AI Solutions & Integration
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                      Document Processing & Analysis
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="w-16 h-16 bg-[var(--color-accent)] rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded"></div>
                </div>
                <div>
                  <h2 className="font-highlight text-3xl font-bold text-black mb-4">
                    Modern Websites
                  </h2>
                  <p className="font-simple text-lg text-[var(--color-secondary)] mb-6">
                    Beautiful, fast, and scalable web applications built with cutting-edge technologies.
                  </p>
                  <ul className="font-simple text-[var(--color-secondary)] space-y-3">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3"></span>
                      Responsive Web Design & Development
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3"></span>
                      Performance Optimization & SEO
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3"></span>
                      E-commerce & Business Platforms
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3"></span>
                      API Integration & Custom Solutions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-t border-[var(--color-border)] bg-white">
        <div className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="w-full">
            <h2 className="font-highlight text-3xl md:text-4xl font-normal text-black mb-16">
              Our Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-highlight text-2xl font-bold mx-auto mb-6">
                  01
                </div>
                <h3 className="font-highlight text-xl font-bold text-black mb-4">Discovery</h3>
                <p className="font-simple text-[var(--color-secondary)]">
                  We analyze your current processes and identify automation opportunities.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-highlight text-2xl font-bold mx-auto mb-6">
                  02
                </div>
                <h3 className="font-highlight text-xl font-bold text-black mb-4">Design</h3>
                <p className="font-simple text-[var(--color-secondary)]">
                  We create custom solutions tailored to your specific business needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-highlight text-2xl font-bold mx-auto mb-6">
                  03
                </div>
                <h3 className="font-highlight text-xl font-bold text-black mb-4">Deploy</h3>
                <p className="font-simple text-[var(--color-secondary)]">
                  We implement and support your solution for seamless integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
