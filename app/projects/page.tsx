"use client";

import Layout from "@/components/Layout";
import config from "@/config.json";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(config.projects.items[0]?.id || "");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const isNavigatingRef = useRef(false);

  // Filter projects based on active category
  const filteredProjects = activeCategory === "all" 
    ? config.projects.items 
    : config.projects.items.filter(project => project.category === activeCategory);

  // Handle navigation click with proper scrolling
  const handleProjectClick = (projectId: string) => {
    isNavigatingRef.current = true;
    setActiveProject(projectId);
    setShowMobileNav(false); // Close mobile nav when navigating
    
    // Use requestAnimationFrame for better timing
    requestAnimationFrame(() => {
      const element = document.getElementById(`project-${projectId}`);
      
      if (element) {
        // Use scrollIntoView for more reliable scrolling
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        
        // Reset navigation flag after scroll completes
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 1000);
      } else {
        // Fallback if element not found
        isNavigatingRef.current = false;
      }
    });
  };

  // Handle scroll to update active project
  useEffect(() => {
    let isScrolling = false;
    
    const handleScroll = () => {
      if (isNavigatingRef.current) return; // Prevent conflicts during programmatic scrolling
      
      const container = scrollContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      let currentActive = "";
      let minDistance = Infinity;

      // Find the project closest to the top of the viewport
      for (const project of filteredProjects) {
        const element = document.getElementById(`project-${project.id}`);
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const distanceFromTop = Math.abs(elementRect.top - containerRect.top - 80);
          
          if (distanceFromTop < minDistance && elementRect.top <= containerRect.top + 200) {
            minDistance = distanceFromTop;
            currentActive = project.id;
          }
        }
      }

      if (currentActive && currentActive !== activeProject) {
        setActiveProject(currentActive);
      }
    };

    // Debounce scroll events
    let scrollTimeout: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', debouncedScroll);
      return () => {
        container.removeEventListener('scroll', debouncedScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, [filteredProjects, activeProject]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSettings]);

  // Close mobile nav on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowMobileNav(false);
        setShowSettings(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden border-b border-[var(--color-border)] bg-white p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-highlight text-lg font-bold text-black">
              Projects
            </h1>
            <div className="flex items-center gap-2">
              {/* Mobile Settings */}
              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                
                {/* Mobile Settings Dropdown */}
                {showSettings && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[var(--color-border)] rounded-lg shadow-lg z-30">
                    <div className="p-3">
                      <div className="text-xs font-medium text-[var(--color-secondary)] mb-2">Filter by category</div>
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setActiveCategory("all");
                            setShowSettings(false);
                          }}
                          className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                            activeCategory === "all" 
                              ? 'bg-black text-white' 
                              : 'text-[var(--color-secondary)] hover:bg-gray-100'
                          }`}
                        >
                          All Projects
                        </button>
                        {config.projects.categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setActiveCategory(category.id);
                              setShowSettings(false);
                            }}
                            className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                              activeCategory === category.id 
                                ? 'bg-black text-white' 
                                : 'text-[var(--color-secondary)] hover:bg-gray-100'
                            }`}
                          >
                            {category.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile Navigation Toggle */}
              <button
                onClick={() => setShowMobileNav(!showMobileNav)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Dropdown */}
          {showMobileNav && (
            <div className="mt-4 border-t border-[var(--color-border)] pt-4">
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectClick(project.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeProject === project.id 
                        ? 'bg-black text-white' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`font-simple text-sm font-medium mb-1 ${
                      activeProject === project.id ? 'text-white' : 'text-black'
                    }`}>
                      {project.title}
                    </div>
                    <div className={`font-simple text-xs ${
                      activeProject === project.id ? 'text-gray-300' : 'text-[var(--color-secondary)]'
                    }`}>
                      {project.client}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Left Side - Minimal Project Navigation */}
        <div className="hidden lg:block w-64 border-r border-[var(--color-border)] bg-white overflow-y-auto">
          <div className="p-4">
            {/* Header with Settings */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-highlight text-lg font-bold text-black">
                Projects
              </h1>
              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                
                {/* Settings Dropdown */}
                {showSettings && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[var(--color-border)] rounded-lg shadow-lg z-20">
                    <div className="p-3">
                      <div className="text-xs font-medium text-[var(--color-secondary)] mb-2">Filter by category</div>
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setActiveCategory("all");
                            setShowSettings(false);
                          }}
                          className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                            activeCategory === "all" 
                              ? 'bg-black text-white' 
                              : 'text-[var(--color-secondary)] hover:bg-gray-100'
                          }`}
                        >
                          All Projects
                        </button>
                        {config.projects.categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setActiveCategory(category.id);
                              setShowSettings(false);
                            }}
                            className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                              activeCategory === category.id 
                                ? 'bg-black text-white' 
                                : 'text-[var(--color-secondary)] hover:bg-gray-100'
                            }`}
                          >
                            {category.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Minimal Project List */}
            <div className="space-y-1">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    activeProject === project.id 
                      ? 'bg-black text-white' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`font-simple text-sm font-medium mb-1 ${
                    activeProject === project.id ? 'text-white' : 'text-black'
                  }`}>
                    {project.title}
                  </div>
                  <div className={`font-simple text-xs ${
                    activeProject === project.id ? 'text-gray-300' : 'text-[var(--color-secondary)]'
                  }`}>
                    {project.client}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Project Details */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {filteredProjects.map((project) => (
              <div key={project.id} id={`project-${project.id}`} className="mb-8 md:mb-12 last:mb-8">
                {/* Project Header */}
                <div className="mb-4 md:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                    <h2 className="font-highlight text-xl md:text-2xl lg:text-3xl font-bold text-black">
                      {project.title}
                    </h2>
                    <div className={`px-2 py-1 rounded-full text-xs font-simple self-start ${
                      project.status === 'Live' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </div>
                  </div>
                  <div className="font-simple text-sm text-[var(--color-secondary)] mb-3 md:mb-4">
                    {project.client}
                  </div>
                  <p className="font-simple text-sm md:text-base text-[var(--color-secondary)] mb-4 md:mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Project Image */}
                <div className="mb-4 md:mb-6">
                  <div className="relative w-full h-40 sm:h-48 md:h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Project Details - Mobile-Responsive Layout */}
                <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                  {/* Technologies */}
                  <div>
                    <h3 className="font-simple text-sm font-medium text-black mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-simple text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Metrics - Responsive Layout */}
                  <div>
                    <h3 className="font-simple text-sm font-medium text-black mb-2">Key Results</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-4 lg:gap-6">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <div className="font-highlight text-base md:text-lg font-bold text-black">
                            {value}
                          </div>
                          <div className="font-simple text-xs text-[var(--color-secondary)] capitalize">
                            {key.replace('_', ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {project.id !== filteredProjects[filteredProjects.length - 1]?.id && (
                  <div className="border-b border-[var(--color-border)] mt-12"></div>
                )}
              </div>
            ))}

            {/* Call to Action */}
            <div className="text-center py-8 md:py-12 border-t border-[var(--color-border)]">
              <h2 className="font-highlight text-lg md:text-xl font-bold text-black mb-3">
                Ready to start your project?
              </h2>
              <p className="font-simple text-sm md:text-base text-[var(--color-secondary)] mb-6 max-w-xl mx-auto px-4">
                Let's discuss how we can help transform your business.
              </p>
              <Link 
                href="/contact" 
                className="bg-black text-white px-6 py-2 rounded-full font-simple text-sm hover:bg-gray-800 transition-colors inline-block"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
