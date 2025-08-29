"use client";

import { FaWhatsapp, FaComments, FaEnvelope } from "react-icons/fa";

interface Tab {
  id: string;
  label: string;
  icon: JSX.Element;
  color: string;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: Tab[] = [
    { id: "webchat", label: "Web Chatbot", icon: <FaComments />, color: "text-blue-600" },
    { id: "whatsapp", label: "WhatsApp Bot", icon: <FaWhatsapp />, color: "text-green-600" },
    { id: "gmail", label: "Gmail Auto Replier", icon: <FaEnvelope />, color: "text-red-600" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-3 px-8 py-4 rounded-xl font-simple ${
            activeTab === tab.id
              ? "bg-black text-white shadow-xl"
              : "bg-white text-gray-700 hover:bg-gray-50 shadow-lg border border-gray-200"
          }`}
        >
          <span className={`text-xl ${activeTab === tab.id ? 'text-white' : tab.color}`}>
            {tab.icon}
          </span>
          <span className="font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
