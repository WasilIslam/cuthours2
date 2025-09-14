"use client";

import config from "@/config.json";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="lg:hidden border-b border-[var(--color-border)] px-4 py-4 bg-white relative">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-highlight text-xl font-bold text-black">
            {config.navigation.brand}
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-[var(--color-border)] shadow-lg z-20">
            <nav className="px-4 py-4 space-y-3">
              {config.navigation.pages.filter(page => page.id !== 'login').map((page) => (
                <Link 
                  key={page.id} 
                  href={page.href} 
                  className={`block py-2 font-simple hover:text-black transition-colors ${
                    pathname === page.href ? 'text-black font-medium' : 'text-[var(--color-secondary)]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {page.label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-[var(--color-border)]">
                <Link 
                  href="/login" 
                  className={`block py-2 font-simple hover:text-black transition-colors ${
                    pathname === '/login' ? 'text-black font-medium' : 'text-[var(--color-secondary)]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-48 bg-white border-r border-[var(--color-border)] z-10 hidden lg:block">
        <nav className="px-4 pt-6">
          <Link href="/" className="font-simple text-xl font-medium text-black mb-10 block">
            {config.navigation.brand}
          </Link>
          <div className="space-y-2 font-simple text-[var(--color-secondary)]">
            {config.navigation.pages.filter(page => page.id !== 'login').map((page) => (
              <Link 
                key={page.id} 
                href={page.href} 
                className={`block hover:text-black transition-colors mb-6 ${
                  pathname === page.href ? 'text-black font-medium' : ''
                }`}
              >
                {page.label}
              </Link>
            ))}
          </div>
          <div className="absolute bottom-5 left-4 right-0 pt-4 -mx-4 px-4">
            <Link 
              href="/login" 
              className={`block font-simple hover:text-black transition-colors ${
                pathname === '/login' ? 'text-black font-medium' : 'text-[var(--color-secondary)]'
              }`}
            >
              Log in
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-48">
        {children}
      </div>
    </div>
  );
}
