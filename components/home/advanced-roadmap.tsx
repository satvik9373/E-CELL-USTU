"use client";

import { useState } from 'react';
import Image from 'next/image';

interface RoadmapItem {
  id: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
}

interface RoadmapProps {
  items: RoadmapItem[];
  direction?: 'horizontal' | 'vertical';
  curved?: boolean;
  className?: string;
}

export default function AdvancedRoadmap({ 
  items, 
  direction = 'horizontal', 
  curved = true,
  className = '' 
}: RoadmapProps) {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  if (items.length === 0) {
    return null;
  }

  // Generate SVG path for curved connections
  const generateCurvedPath = (startX: number, startY: number, endX: number, endY: number) => {
    const midX = (startX + endX) / 2;
    const controlY = direction === 'horizontal' ? startY - 30 : startY;
    return `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`;
  };

  return (
    <div className={`w-full ${className}`} style={{ backgroundColor: '#FAFAFA' }}>
      <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {direction === 'horizontal' ? (
          // Horizontal Layout with SVG Curves
          <div className="relative">
            {/* SVG for curved paths */}
            {curved && items.length > 1 && (
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                style={{ zIndex: 1 }}
              >
                {items.slice(0, -1).map((_, index) => {
                  const pathCount = items.length;
                  const spacing = 100 / (pathCount - 1);
                  const startX = `${index * spacing}%`;
                  const endX = `${(index + 1) * spacing}%`;
                  
                  return (
                    <path
                      key={`path-${index}`}
                      d={`M ${index * (100 / (pathCount - 1))}% 50% Q ${(index + 0.5) * (100 / (pathCount - 1))}% 40% ${(index + 1) * (100 / (pathCount - 1))}% 50%`}
                      fill="none"
                      stroke="#444444"
                      strokeWidth="2"
                      strokeDasharray="8,8"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            )}

            <div className="flex items-center justify-between relative" style={{ zIndex: 2 }}>
              {items.map((item, index) => (
                <div key={item.id} className="flex flex-col items-center text-center group roadmap-item">
                  {/* Image Container */}
                  <div 
                    className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-solid mb-4 overflow-hidden bg-white flex items-center justify-center roadmap-item-image"
                    style={{ borderColor: '#DDDDDD' }}
                  >
                    {!imageErrors[item.id] ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-full"
                        onError={() => handleImageError(item.id)}
                        priority={index < 2}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        {item.title}
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs lg:text-sm text-gray-600 max-w-[120px]">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Vertical Layout
          <div className="relative max-w-md mx-auto">
            {/* SVG for vertical curved paths */}
            {curved && items.length > 1 && (
              <svg 
                className="absolute left-10 lg:left-12 top-0 w-0.5 h-full pointer-events-none" 
                style={{ zIndex: 1 }}
              >
                {items.slice(0, -1).map((_, index) => {
                  const itemHeight = 192; // Approximate height per item (96px image + 96px spacing)
                  const startY = index * itemHeight + 48; // Center of image
                  const endY = (index + 1) * itemHeight + 48;
                  
                  return (
                    <path
                      key={`vpath-${index}`}
                      d={`M 1 ${startY} Q 20 ${(startY + endY) / 2} 1 ${endY}`}
                      fill="none"
                      stroke="#444444"
                      strokeWidth="2"
                      strokeDasharray="8,8"
                      strokeLinecap="round"
                    />
                  );
                })}
              </svg>
            )}

            {items.map((item, index) => (
              <div key={item.id} className="relative mb-12 lg:mb-16 roadmap-item" style={{ zIndex: 2 }}>
                <div className="flex items-center">
                  {/* Image Container */}
                  <div 
                    className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-solid overflow-hidden bg-white flex items-center justify-center flex-shrink-0 roadmap-item-image"
                    style={{ borderColor: '#DDDDDD' }}
                  >
                    {!imageErrors[item.id] ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-full"
                        onError={() => handleImageError(item.id)}
                        priority={index < 2}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center">
                        {item.title}
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="ml-6 lg:ml-8">
                    <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm lg:text-base text-gray-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Simple roadmap for basic use cases
export function SimpleRoadmap({ 
  items, 
  direction = 'horizontal', 
  className = '' 
}: Omit<RoadmapProps, 'curved'>) {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`} style={{ backgroundColor: '#FAFAFA' }}>
      <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {direction === 'horizontal' ? (
          <div className="flex items-center justify-between">
            {items.map((item, index) => (
              <div key={item.id} className="flex items-center">
                <div className="flex flex-col items-center text-center group">
                  <div 
                    className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-solid mb-4 overflow-hidden bg-white flex items-center justify-center"
                    style={{ borderColor: '#DDDDDD' }}
                  >
                    {!imageErrors[item.id] ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-full"
                        onError={() => handleImageError(item.id)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        {item.title}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs lg:text-sm text-gray-600 max-w-[120px]">
                      {item.description}
                    </p>
                  )}
                </div>

                {index < items.length - 1 && (
                  <div className="flex-1 mx-8 lg:mx-12">
                    <div 
                      className="w-full h-0.5"
                      style={{
                        background: `repeating-linear-gradient(
                          to right,
                          #444444 0px,
                          #444444 8px,
                          transparent 8px,
                          transparent 16px
                        )`
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="relative max-w-md mx-auto">
            {items.map((item, index) => (
              <div key={item.id} className="relative">
                <div className="flex items-center mb-12 lg:mb-16">
                  <div 
                    className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-solid overflow-hidden bg-white flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: '#DDDDDD' }}
                  >
                    {!imageErrors[item.id] ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-full"
                        onError={() => handleImageError(item.id)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center">
                        {item.title}
                      </div>
                    )}
                  </div>
                  
                  <div className="ml-6 lg:ml-8">
                    <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm lg:text-base text-gray-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {index < items.length - 1 && (
                  <div className="absolute left-10 lg:left-12 top-20 lg:top-24 w-0.5 h-12 lg:h-16">
                    <div 
                      className="w-full h-full"
                      style={{
                        background: `repeating-linear-gradient(
                          to bottom,
                          #444444 0px,
                          #444444 8px,
                          transparent 8px,
                          transparent 16px
                        )`
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
