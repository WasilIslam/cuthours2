"use client";

import { FaWhatsapp, FaEnvelope, FaComments, FaMagic } from "react-icons/fa";
import ChatInterface from "./ChatInterface";
import Link from "next/link";

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
          subtitle: "AI Powered"
        };
      case "whatsapp":
        return {
          icon: <FaWhatsapp />,
          color: "text-green-600",
          title: "WhatsApp Bot",
          subtitle: "Interactive"
        };
      case "gmail":
        return {
          icon: <FaEnvelope />,
          color: "text-red-600",
          title: "Gmail Auto Replier",
          subtitle: "Interactive"
        };
      default:
        return {
          icon: <FaComments />,
          color: "text-blue-600",
          title: "Web Chatbot",
          subtitle: "AI Powered"
        };
    }
  };

  const tabInfo = getTabInfo();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Tab Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className={`text-xl ${tabInfo.color}`}>
              {tabInfo.icon}
            </span>
            <div>
              <h3 className="font-simple text-lg font-medium text-slate-900">
                {tabInfo.title}
              </h3>
              <p className="font-simple text-sm text-slate-600">
                {tabInfo.subtitle}
              </p>
            </div>
          </div>
          {activeTab === "webchat" && (
            <Link href="/create-your-own-bot-in-minutes">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-simple font-medium transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg text-sm">
                <FaMagic className="w-3 h-3" />
                <span>Create your own</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "whatsapp" && (
          <div className="text-center">
            <FaWhatsapp className="text-6xl text-green-500 mx-auto mb-6" />
            <h3 className="font-simple text-xl font-medium text-slate-900 mb-4">
              WhatsApp Bot
            </h3>
            <p className="font-simple text-slate-600 mb-6 max-w-md mx-auto">
              Experience intelligent WhatsApp automation for customer inquiries.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-simple flex items-center space-x-2 mx-auto transition-colors">
              <FaWhatsapp className="w-4 h-4" />
              <span>Launch Demo</span>
            </button>
          </div>
        )}

        {activeTab === "webchat" && (
          <ChatInterface />
        )}

        {activeTab === "gmail" && (
          <div className="text-center">
            <FaEnvelope className="text-6xl text-red-500 mx-auto mb-6" />
            <h3 className="font-simple text-xl font-medium text-slate-900 mb-4">
              Gmail Auto Replier
            </h3>
            <p className="font-simple text-slate-600 mb-4">
              Intelligent email automation for your inbox.
            </p>
            <p className="font-simple text-sm text-slate-500 mb-6">
              Email: <span className="font-medium text-red-600">chatbot@cuthours.com</span>
            </p>
            <button
              onClick={handleEmailClick}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-simple flex items-center space-x-2 mx-auto transition-colors"
            >
              <FaEnvelope className="w-4 h-4" />
              <span>Open Email</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
