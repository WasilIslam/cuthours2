'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CaseStudy {
  client: string;
  description: string;
  metric?: string;
  metric_label?: string;
  image: string;
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  size?: 'large' | 'small';
  className?: string;
}

export default function CaseStudyCard({ caseStudy, size = 'small', className = '' }: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleClick = () => {
    // Navigate to case study page using the client name as title
    const titleParam = encodeURIComponent(caseStudy.client);
    router.push(`/case-study/${titleParam}`);
  };

  const heightClass = size === 'large' ? 'h-64 md:h-80 lg:h-full' : 'h-32 md:h-40 lg:h-48';

  return (
    <div 
      className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div 
        className={`${heightClass} relative group`} 
        style={{
          backgroundImage: `url(${caseStudy.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Hover overlay with animation */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6">
          <div className="flex items-center mb-2 md:mb-3">
            <span className={`font-simple ${size === 'large' ? 'text-sm md:text-base' : 'text-sm md:text-base'} text-white font-medium transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
              {caseStudy.client}
            </span>
          </div>
          <p className={`font-simple ${size === 'large' ? 'text-sm md:text-base mb-2 md:mb-3' : 'text-sm'} text-white opacity-90 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-[-2px]' : ''}`}>
            {caseStudy.description}
          </p>
          {size === 'large' && caseStudy.metric && (
            <div className={`font-highlight text-3xl md:text-4xl lg:text-5xl font-bold text-white transition-all duration-300 ${isHovered ? 'scale-105 text-blue-100' : ''}`}>
              {caseStudy.metric}
            </div>
          )}
        </div>

        {/* Floating tooltip */}
        {isHovered && (
          <div 
            className="absolute z-10 bg-black text-white px-3 py-2 rounded-lg text-sm font-simple pointer-events-none transition-opacity duration-200"
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y - 40,
              transform: 'translateX(-50%)'
            }}
          >
            Read case study
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></div>
          </div>
        )}
      </div>
    </div>
  );
}
