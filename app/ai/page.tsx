import Layout from "@/components/Layout";
import AITabsWrapper from "@/components/AITabsWrapper";

export default function AI() {
  return (
    <Layout>
      <section className="relative min-h-screen bg-gray-50">
        <div className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-highlight text-5xl md:text-6xl font-normal text-black mb-6 leading-tight">
                Chat with our live automation demos
              </h1>
              <p className="font-simple text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the power of AI automation across different platforms
              </p>
            </div>
            
            <AITabsWrapper />
          </div>
        </div>
      </section>
    </Layout>
  );
}
