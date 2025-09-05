"use client";

import { useState } from "react";
import { FaRocket, FaArrowRight, FaCheck, FaSpinner, FaList } from "react-icons/fa";
import Link from "next/link";

interface PathOption {
  path: string;
  title: string;
  recommended: boolean;
}

interface BotData {
  id: string;
  websiteUrl: string;
  paths: string[];
  content: {
    raw: string;
    aiProcessed: string; // JSON string with structured data from xAI
    pages: {
      url: string;
      title: string;
      content: string;
      extractedAt: Date;
    }[];
  };
  metadata: {
    totalPages: number;
    contentLength: number;
    createdAt: Date;
    userIp: string;
    recommendedPaths: string[];
  };
}

export default function CreateBotPage() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pathOptions, setPathOptions] = useState<PathOption[]>([]);
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);
  const [botData, setBotData] = useState<BotData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const validateUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      if (!urlObj.protocol.startsWith('http')) {
        return "URL must start with http:// or https://";
      }
      return "";
    } catch {
      return "Please enter a valid URL";
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setWebsiteUrl(url);
    if (url) {
      const error = validateUrl(url);
      setUrlError(error);
    } else {
      setUrlError("");
    }
  };

  const handleCreateBot = async () => {
    if (urlError || !websiteUrl.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/bot/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: websiteUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setPathOptions(data.pathOptions);
        // Auto-select all recommended paths
        const recommendedPaths = data.pathOptions
          .filter((option: PathOption) => option.recommended)
          .map((option: PathOption) => option.path);
        setSelectedPaths(recommendedPaths);
        setCurrentStep(2);
      } else {
        setUrlError(data.error || "Failed to analyze website");
      }
    } catch (error) {
      setUrlError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePathSelection = (path: string) => {
    setSelectedPaths(prev => {
      if (prev.includes(path)) {
        // Remove if already selected
        return prev.filter(p => p !== path);
      } else if (prev.length < 3) {
        // Add if under limit
        return [...prev, path];
      } else {
        // Don't add if at limit
        return prev;
      }
    });
  };

  const handleExtractContent = async () => {
    if (selectedPaths.length === 0) return;

    setIsLoading(true);
    setCurrentStep(3);

    try {
      const response = await fetch('/api/bot/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: websiteUrl,
          paths: selectedPaths
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBotData(data.bot);
        setCurrentStep(4);
      } else {
        setUrlError(data.error || "Failed to extract content");
      }
    } catch (error) {
      setUrlError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6">
            <FaRocket className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-highlight text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Create Your Own Chatbot
          </h1>
          <p className="font-simple text-xl text-slate-600 max-w-2xl mx-auto">
            Transform your website into an intelligent chatbot in minutes.
            Just enter your website URL and let our AI do the magic.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-simple font-medium ${
                  step < currentStep ? 'bg-green-500 text-white' :
                  step === currentStep ? 'bg-blue-500 text-white' :
                  'bg-slate-300 text-slate-600'
                }`}>
                  {step < currentStep ? <FaCheck className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-green-500' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {currentStep === 1 && (
            <>
              {/* Input Section */}
              <div className="mb-8">
                <label htmlFor="website-url" className="block font-simple text-lg font-medium text-slate-800 mb-3">
                  Your Website URL
                </label>
                <div className="relative">
                  <input
                    id="website-url"
                    type="url"
                    value={websiteUrl}
                    onChange={handleUrlChange}
                    placeholder="https://yourwebsite.com"
                    className={`w-full px-6 py-4 border-2 rounded-2xl font-simple text-lg focus:outline-none focus:ring-4 transition-all duration-200 ${
                      urlError ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'
                    }`}
                  />
                </div>
                {urlError && (
                  <p className="font-simple text-sm text-red-500 mt-2">{urlError}</p>
                )}
                {!urlError && (
                  <p className="font-simple text-sm text-slate-500 mt-2">
                    Enter the full URL of your website to get started
                  </p>
                )}
              </div>

              {/* Create Button */}
              <div className="text-center">
                <button
                  onClick={handleCreateBot}
                  disabled={!websiteUrl.trim() || !!urlError || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 text-white px-8 py-4 rounded-2xl font-simple font-semibold text-lg transition-all duration-200 flex items-center space-x-3 mx-auto disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none"
                >
                  {isLoading ? <FaSpinner className="w-5 h-5 animate-spin" /> : <FaRocket className="w-5 h-5" />}
                  <span>{isLoading ? 'Analyzing website...' : 'Create your website chatbot in minutes'}</span>
                  {!isLoading && <FaArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="mb-6">
                <h2 className="font-simple text-2xl font-bold text-slate-900 mb-2">
                  Select Pages to Include
                </h2>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-simple text-slate-600">
                    AI analyzed your website and selected the top 2 most informative pages.
                    These are already selected for the best chatbot experience.
                  </p>
                  <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {selectedPaths.length}/3 pages selected
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              {pathOptions.length > 10 && (
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl font-simple focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <div className={`mb-8 ${pathOptions.length > 10 ? 'max-h-96 overflow-y-auto' : 'space-y-3'}`}>
                {pathOptions
                  .filter(option =>
                    searchQuery === '' ||
                    option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    option.path.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((option) => (
                    <div
                      key={option.path}
                      onClick={() => selectedPaths.length < 3 || selectedPaths.includes(option.path) ? handlePathSelection(option.path) : null}
                                          className={`p-4 border-2 rounded-xl transition-all duration-200 ${
                      selectedPaths.includes(option.path)
                        ? 'border-blue-500 bg-blue-50 cursor-pointer'
                        : selectedPaths.length >= 3
                        ? 'border-slate-200 opacity-50 cursor-not-allowed'
                        : 'border-slate-200 hover:border-slate-300 cursor-pointer'
                    }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedPaths.includes(option.path)
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-slate-300'
                          }`}>
                            {selectedPaths.includes(option.path) && (
                              <FaCheck className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-simple font-medium text-slate-900">{option.title}</p>
                            <p className="font-simple text-sm text-slate-500">{option.path}</p>
                          </div>
                        </div>
                        {option.recommended && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Top AI Pick
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="text-center">
                <button
                  onClick={handleExtractContent}
                  disabled={selectedPaths.length === 0 || isLoading}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 text-white px-8 py-4 rounded-2xl font-simple font-semibold text-lg transition-all duration-200 flex items-center space-x-3 mx-auto disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none"
                >
                  {isLoading ? <FaSpinner className="w-5 h-5 animate-spin" /> : <FaList className="w-5 h-5" />}
                  <span>{isLoading ? 'Extracting content...' : 'Extract Content & Create Bot'}</span>
                  {!isLoading && <FaArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                <FaSpinner className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h3 className="font-simple text-2xl font-bold text-slate-900 mb-4">
                Creating Your Chatbot
              </h3>
              <p className="font-simple text-slate-600 max-w-md mx-auto">
                AI is extracting content from your selected pages and building your custom chatbot.
                This may take a few moments...
              </p>
            </div>
          )}

          {currentStep === 4 && botData && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6">
                  <FaCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-simple text-2xl font-bold text-slate-900 mb-4">
                  Your Chatbot is Ready!
                </h3>
                <p className="font-simple text-slate-600 max-w-md mx-auto mb-6">
                  Successfully created a chatbot for <strong>{websiteUrl}</strong> with content from {botData.paths.length} pages.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h4 className="font-simple font-semibold text-slate-900 mb-3">Bot Details:</h4>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><strong>Website:</strong> {botData.websiteUrl}</p>
                  <p><strong>Pages Included:</strong> {botData.paths.length}</p>
                  <p><strong>Created:</strong> {new Date(botData.metadata.createdAt).toLocaleDateString()}</p>
                  <p><strong>Bot ID:</strong> {botData.id}</p>
                </div>
              </div>

              <div className="text-center">
                <Link href={`/chat/${botData.id}`}>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-simple font-semibold text-lg transition-all duration-200 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl">
                    <FaRocket className="w-5 h-5" />
                    <span>Start Chatting with Your Bot</span>
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </>
          )}

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link
              href="/ai"
              className="font-simple text-slate-500 hover:text-slate-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>← Back to AI Assistant</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
