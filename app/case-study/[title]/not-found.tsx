import Layout from "@/components/Layout";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout>
      <section className="relative min-h-screen">
        <div className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
          <div className="w-full max-w-4xl mx-auto text-center">
            <h1 className="font-highlight text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-6 leading-tight">
              Case Study Not Found
            </h1>
            <p className="font-simple text-xl md:text-2xl text-[var(--color-secondary)] mb-8">
              The case study you're looking for doesn't exist or may have been moved.
            </p>
            <div className="space-x-4">
              <Link 
                href="/"
                className="bg-black text-white px-6 py-3 rounded-lg font-simple text-base hover:bg-gray-800 transition-colors inline-block"
              >
                Back to Home
              </Link>
              <Link 
                href="/contact"
                className="bg-white text-black border border-gray-300 px-6 py-3 rounded-lg font-simple text-base hover:bg-gray-50 transition-colors inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
