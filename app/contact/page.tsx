import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <Layout>
      <section className="relative min-h-screen">
        <div className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="w-full">
            <h1 className="font-highlight text-5xl md:text-6xl font-normal text-black mb-6 leading-tight">
              Let's Talk Further
            </h1>
            <p className="font-simple text-xl text-[var(--color-secondary)] mb-16 max-w-3xl">
              Request a demo or email us—we'll spin up a live automation workflow for you, free of charge, in under a week.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <ContactForm />

              {/* Contact Information */}
              <div className="space-y-8">
                <h2 className="font-highlight text-2xl font-bold text-black">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-simple text-sm font-medium text-black mb-2">Email</h3>
                    <a href="mailto:hi@cuthours.com" className="font-simple text-lg text-[var(--color-accent)] hover:text-black transition-colors">
                      hi@cuthours.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="font-simple text-sm font-medium text-black mb-2">Response Time</h3>
                    <p className="font-simple text-[var(--color-secondary)]">
                      We typically respond within 24 hours
                    </p>
                  </div>
                  
                </div>

                <div className="pt-8 border-t border-[var(--color-border)]">
                  <h3 className="font-simple text-sm font-medium text-black mb-4">What happens next?</h3>
                  <ol className="font-simple text-[var(--color-secondary)] space-y-2">
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                      We'll review your project requirements
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                      Schedule a 30-minute discovery call
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                      Provide a detailed proposal with timeline
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
