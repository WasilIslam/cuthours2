import Layout from "@/components/Layout";

export default function Chat() {
  return (
    <Layout>
      <section className="relative min-h-screen">
        <div className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-5xl">
            <h1 className="font-highlight text-5xl md:text-6xl font-normal text-black mb-6 leading-tight">
              Chat with Cuthours.ai
            </h1>
            <p className="font-simple text-xl text-[var(--color-secondary)] mb-16 max-w-3xl">
              Experience our AI automation assistant. Ask questions about your business processes and get instant insights.
            </p>

            {/* Chat Interface */}
            <div className="bg-white border border-[var(--color-border)] rounded-lg shadow-lg max-w-4xl mx-auto">
              
              {/* Chat Header */}
              <div className="border-b border-[var(--color-border)] px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-simple font-medium text-black">Cuthours AI Assistant</h3>
                    <p className="font-simple text-sm text-[var(--color-secondary)]">Online • Ready to help</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 max-w-md">
                    <p className="font-simple text-black">
                      Hello! I'm your AI automation assistant. I can help you understand how to automate your business processes, analyze workflows, and suggest improvements. What would you like to know?
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-black text-white rounded-lg p-4 max-w-md">
                    <p className="font-simple">
                      How can AI help automate my customer service?
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 bg-white rounded"></div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 max-w-md">
                    <p className="font-simple text-black">
                      Great question! AI can transform your customer service in several ways:
                      <br /><br />
                      • <strong>Chatbots</strong> for 24/7 instant responses
                      <br />
                      • <strong>Ticket routing</strong> to the right department
                      <br />
                      • <strong>Sentiment analysis</strong> for priority handling
                      <br />
                      • <strong>Knowledge base</strong> automation
                      <br /><br />
                      Would you like me to explain any of these in more detail?
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-[var(--color-border)] p-6">
                <div className="flex space-x-4">
                  <input 
                    type="text" 
                    placeholder="Ask me about AI automation, workflows, or business processes..."
                    className="flex-1 px-4 py-3 border border-[var(--color-border)] rounded-lg font-simple focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button className="bg-black text-white px-6 py-3 rounded-lg font-simple hover:bg-gray-800 transition-colors">
                    Send
                  </button>
                </div>
                <p className="font-simple text-xs text-[var(--color-secondary)] mt-2">
                  This is a demo interface. For real AI automation, please contact our team.
                </p>
              </div>
            </div>

            {/* Suggested Questions */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h2 className="font-highlight text-2xl font-bold text-black mb-8 text-center">
                Popular Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "How can AI reduce manual data entry?",
                  "What processes are best for automation?",
                  "How do you measure automation ROI?",
                  "Can AI integrate with existing systems?",
                  "What's the implementation timeline?",
                  "How do you ensure data security?"
                ].map((question, index) => (
                  <button 
                    key={index}
                    className="text-left p-4 border border-[var(--color-border)] rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-simple text-[var(--color-secondary)]">{question}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
