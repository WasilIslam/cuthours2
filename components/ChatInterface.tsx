import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaUser, FaRobot } from "react-icons/fa";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your demo AI assistant. This is just a demonstration of what Cuthours can build for you. Ask me anything about AI automation!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

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
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Sorry, I couldn't process your request. This is just a demo - contact Cuthours for real implementations!",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, there was an error. This is just a demo - contact Cuthours for real implementations!",
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

  return (
    <div className="space-y-6">
      {/* Messages Container */}
      <div className="h-96 overflow-y-auto space-y-4 mb-6 p-4 bg-gray-50 rounded-xl">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start space-x-3 ${message.isUser ? 'justify-end' : ''}`}>
            {!message.isUser && (
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <FaRobot className="w-5 h-5 text-white" />
              </div>
            )}
            <div className={`rounded-2xl p-4 max-w-md ${
              message.isUser 
                ? 'bg-black text-white' 
                : 'bg-white text-gray-800 border border-gray-200'
            }`}>
              <p className="font-simple leading-relaxed">{message.text}</p>
            </div>
            {message.isUser && (
              <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                <FaUser className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <FaRobot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex space-x-4">
          <input 
            type="text" 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about AI automation, business processes, or Cuthours services..."
            className="flex-1 px-6 py-4 border border-gray-300 rounded-xl font-simple focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-simple hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
          >
            <FaPaperPlane />
            <span>Send</span>
          </button>
        </div>
        <p className="font-simple text-sm text-gray-500 mt-3 text-center">
          💡 This is a demo. Contact Cuthours for real AI automation solutions.
        </p>
      </div>
    </div>
  );
}
