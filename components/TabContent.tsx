"use client";

import { FaWhatsapp, FaEnvelope, FaComments } from "react-icons/fa";
import ChatInterface from "./ChatInterface";

interface TabContentProps {
  activeTab: string;
}

export default function TabContent({ activeTab }: TabContentProps) {
  const handleEmailClick = () => {
    window.open("mailto:chatbot@cuthours.com", "_blank");
  };

  const getTabInfo = () => {
    switch (activeTab) {
      case "webchat":
        return {
          icon: <FaComments />,
          color: "text-blue-600",
          title: "Web Chatbot",
          subtitle: "Live Demo • AI Powered"
        };
      case "whatsapp":
        return {
          icon: <FaWhatsapp />,
          color: "text-green-600",
          title: "WhatsApp Bot",
          subtitle: "Demo Mode • Interactive"
        };
      case "gmail":
        return {
          icon: <FaEnvelope />,
          color: "text-red-600",
          title: "Gmail Auto Replier",
          subtitle: "Demo Mode • Interactive"
        };
      default:
        return {
          icon: <FaComments />,
          color: "text-blue-600",
          title: "Web Chatbot",
          subtitle: "Live Demo • AI Powered"
        };
    }
  };

  const tabInfo = getTabInfo();

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Tab Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-8 py-6">
        <div className="flex items-center space-x-4">
          <div className={`text-3xl ${tabInfo.color}`}>
            {tabInfo.icon}
          </div>
          <div>
            <h3 className="font-highlight text-2xl font-bold text-black">
              {tabInfo.title}
            </h3>
            <p className="font-simple text-gray-600">
              {tabInfo.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === "whatsapp" && (
          <div className="text-center py-16">
            <div className="text-8xl mb-8 text-green-500">
              <FaWhatsapp />
            </div>
            <h3 className="font-highlight text-3xl font-bold text-black mb-6">
              WhatsApp Bot Demo
            </h3>
            <p className="font-simple text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience our intelligent WhatsApp automation that handles customer inquiries 24/7 with natural language processing and instant responses.
            </p>
            <button className="bg-green-500 text-white px-10 py-4 rounded-xl font-simple hover:bg-green-600 shadow-lg flex items-center space-x-3 mx-auto text-lg">
              <FaWhatsapp />
              <span>Launch WhatsApp Demo</span>
            </button>
          </div>
        )}

        {activeTab === "webchat" && (
          <ChatInterface />
        )}

        {activeTab === "gmail" && (
          <div className="text-center py-16">
            <div className="text-8xl mb-8 text-red-500">
              <FaEnvelope />
            </div>
            <h3 className="font-highlight text-3xl font-bold text-black mb-6">
              Gmail Auto Replier
            </h3>
            <p className="font-simple text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover how our intelligent email automation can handle your inbox 24/7. Send an email to <strong className="text-red-600">chatbot@cuthours.com</strong> to see it in action.
            </p>
            <button 
              onClick={handleEmailClick}
              className="bg-red-500 text-white px-10 py-4 rounded-xl font-simple hover:bg-red-600 shadow-lg flex items-center space-x-3 mx-auto text-lg"
            >
              <FaEnvelope />
              <span>Open Email Client</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
