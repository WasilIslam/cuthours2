import Layout from "@/components/Layout";
import AITabsWrapper from "@/components/AITabsWrapper";

export default function AI() {
  return (
    <Layout>
      <section className="min-h-screen bg-slate-50">

        <div className="relative px-6 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="font-highlight text-4xl md:text-5xl font-normal text-slate-900 mb-6 leading-tight">
                AI Chat Assistant
              </h1>

              <p className="font-simple text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Experience intelligent automation across different platforms
              </p>
            </div>

            {/* Main Content */}
            <div className="relative">
              <AITabsWrapper />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
