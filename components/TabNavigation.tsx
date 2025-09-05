"use client";

import { FaWhatsapp, FaComments, FaEnvelope } from "react-icons/fa";

interface Tab {
  id: string;
  label: string;
  icon: any;
  color: string;
  gradient: string;
}

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: Tab[] = [
    {
      id: "webchat",
      label: "Web Chatbot",
      icon: <FaComments />,
      color: "text-blue-600",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      id: "whatsapp",
      label: "WhatsApp Bot",
      icon: <FaWhatsapp />,
      color: "text-green-600",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: "gmail",
      label: "Gmail Auto Replier",
      icon: <FaEnvelope />,
      color: "text-red-600",
      gradient: "from-red-500 to-rose-600"
    },
  ];

  return (
    <div className="flex justify-center gap-2 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-simple transition-colors ${
            activeTab === tab.id
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
          }`}
        >
          <span className="text-sm">
            {tab.icon}
          </span>
          <span className="text-sm font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
