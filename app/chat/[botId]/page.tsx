"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { FaPaperPlane, FaUser, FaRobot, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { doc, getDoc } from 'firebase/firestore';
import { db, BotData } from '@/lib/firebase-admin';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBotPage() {
  const params = useParams();
  const botId = params.botId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [botData, setBotData] = useState<BotData | null>(null);
  const [isLoadingBot, setIsLoadingBot] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (botId) {
      loadBotData();
    }
  }, [botId]);

  const loadBotData = async () => {
    try {
      const botDoc = await getDoc(doc(db, 'bots', botId));
      if (botDoc.exists()) {
        const data = botDoc.data() as BotData;
        setBotData(data);
        setMessages([{
          id: "1",
          text: `Hello! I am Ali, I will guide you about this site. I have information from ${data.metadata.totalPages} pages. What would you like to know?`,
          isUser: false,
          timestamp: new Date()
        }]);
      } else {
        setMessages([{
          id: "1",
          text: "Sorry, this bot doesn't exist or has been removed.",
          isUser: false,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error loading bot:', error);
      setMessages([{
        id: "1",
        text: "Error loading bot. Please try again later.",
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoadingBot(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !botData) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/bot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          botId: botId,
          botContent: botData.content
        }),
      });

      const data = await response.json();

      if (response.ok && data.response) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I couldn't process your request. Please try again.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, there was an error connecting to the server.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isLoadingBot) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your chatbot...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/create-your-own-bot-in-minutes">
              <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors">
                <FaArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            </Link>
            <div>
              <h1 className="font-simple text-2xl font-bold text-slate-900">
                Chat with Your Bot
              </h1>
              {botData && (
                <p className="text-sm text-slate-600">
                  Trained on: {botData.websiteUrl}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="h-96 overflow-hidden">
            <div className="h-full overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-slate-900 text-white rounded-br-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                  }`}>
                    <p className="font-simple text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-6">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your chatbot anything..."
                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl font-simple focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-simple disabled:cursor-not-allowed transition-colors"
              >
                <FaPaperPlane className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Limits Info */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="font-simple font-semibold text-amber-800 mb-2">Content Limits</h3>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Maximum 500KB of content per website</li>
            <li>• Up to 20 pages can be included</li>
            <li>• Content is processed and optimized for chat</li>
            <li>• External links and media files are excluded</li>
            <li>• Home page is always included</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
