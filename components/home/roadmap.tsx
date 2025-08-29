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
  className?: string;
}

export default function Roadmap({ 
  items, 
  direction = 'horizontal', 
  className = '' 
}: RoadmapProps) {
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
          // Horizontal Layout
          <div className="relative">
            <div className="flex items-center justify-between">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center">
                  {/* Roadmap Item */}
                  <div className="flex flex-col items-center text-center group">
                    {/* Image Container */}
                    <div 
                      className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-solid mb-4 overflow-hidden bg-white flex items-center justify-center"
                      style={{ borderColor: '#DDDDDD' }}
                    >
                      {!imageErrors[item.id] ? (
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover rounded-full"
                          onError={() => handleImageError(item.id)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          Image
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

                  {/* Dotted Line Connector */}
                  {index < items.length - 1 && (
                    <div className="flex-1 mx-8 lg:mx-12">
                      <div 
                        className="w-full h-0.5 relative"
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
          </div>
        ) : (
          // Vertical Layout
          <div className="relative max-w-md mx-auto">
            {items.map((item, index) => (
              <div key={item.id} className="relative">
                {/* Roadmap Item */}
                <div className="flex items-center mb-12 lg:mb-16">
                  {/* Image Container */}
                  <div 
                    className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-solid overflow-hidden bg-white flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: '#DDDDDD' }}
                  >
                    {!imageErrors[item.id] ? (
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-full"
                        onError={() => handleImageError(item.id)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        Image
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

                {/* Vertical Dotted Line Connector */}
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

// Example usage component with sample data
export function RoadmapExample() {
  const sampleItems: RoadmapItem[] = [
    {
      id: '1',
      title: 'Strategy',
      description: 'Planning phase',
      imageSrc: '/website-images/strategy-icon.png',
      imageAlt: 'Strategy planning'
    },
    {
      id: '2',
      title: 'Collaboration',
      description: 'Team building',
      imageSrc: '/website-images/collaboration-icon.png',
      imageAlt: 'Team collaboration'
    },
    {
      id: '3',
      title: 'Values',
      description: 'Core principles',
      imageSrc: '/website-images/values-icon.png',
      imageAlt: 'Company values'
    },
    {
      id: '4',
      title: 'Commitment',
      description: 'Dedication',
      imageSrc: '/website-images/commitment-icon.png',
      imageAlt: 'Team commitment'
    },
    {
      id: '5',
      title: 'Future State',
      description: 'Vision achieved',
      imageSrc: '/website-images/future-icon.png',
      imageAlt: 'Future vision'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Horizontal Roadmap */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Our Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow our roadmap to success through strategic planning and execution
          </p>
        </div>
        <Roadmap items={sampleItems} direction="horizontal" />
      </section>

      {/* Vertical Roadmap */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Step by Step Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A detailed vertical timeline of our methodology
          </p>
        </div>
        <Roadmap items={sampleItems} direction="vertical" />
      </section>
    </div>
  );
}
