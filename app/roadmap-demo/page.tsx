import AdvancedRoadmap, { SimpleRoadmap } from '@/components/home/advanced-roadmap';

// Example data based on your treasure hunt image
const treasureHuntJourney = [
  {
    id: 'strategy',
    title: 'Strategy',
    description: 'Planning our approach',
    imageSrc: '/website-images/strategy.png',
    imageAlt: 'Strategic planning icon'
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description: 'Working together',
    imageSrc: '/website-images/collaboration.png',
    imageAlt: 'Team collaboration icon'
  },
  {
    id: 'values',
    title: 'Values',
    description: 'Core principles',
    imageSrc: '/website-images/values.png',
    imageAlt: 'Company values icon'
  },
  {
    id: 'vision',
    title: 'Clear Vision',
    description: 'Seeing the path ahead',
    imageSrc: '/website-images/vision.png',
    imageAlt: 'Clear vision icon'
  },
  {
    id: 'commitment',
    title: 'Commitment',
    description: 'Dedication to success',
    imageSrc: '/website-images/commitment.png',
    imageAlt: 'Team commitment icon'
  },
  {
    id: 'treasure',
    title: 'Treasure!',
    description: 'Achieving our goals',
    imageSrc: '/website-images/treasure.png',
    imageAlt: 'Treasure achievement icon'
  }
];

// Simplified data set for testing
const simpleJourney = [
  {
    id: '1',
    title: 'Start',
    imageSrc: '/website-images/start.png',
    imageAlt: 'Journey start'
  },
  {
    id: '2',
    title: 'Progress',
    imageSrc: '/website-images/progress.png',
    imageAlt: 'Making progress'
  },
  {
    id: '3',
    title: 'Success',
    imageSrc: '/website-images/success.png',
    imageAlt: 'Success achieved'
  }
];

export default function RoadmapDemo() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-center bg-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Journey to Success
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our strategic roadmap from initial planning to achieving our ultimate goals
          </p>
        </div>
      </section>

      {/* Advanced Horizontal Roadmap with Curves */}
      <section>
        <div className="text-center py-12 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Strategic Roadmap
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our comprehensive approach to achieving excellence through strategic planning and execution
          </p>
        </div>
        <AdvancedRoadmap 
          items={treasureHuntJourney} 
          direction="horizontal" 
          curved={true}
        />
      </section>

      {/* Vertical Roadmap */}
      <section className="bg-white py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Step-by-Step Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A detailed timeline of our methodology and key milestones
          </p>
        </div>
        <AdvancedRoadmap 
          items={treasureHuntJourney} 
          direction="vertical" 
          curved={true}
        />
      </section>

      {/* Simple Roadmap Example */}
      <section className="bg-white py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple Journey
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A clean, minimal roadmap design
          </p>
        </div>
        <SimpleRoadmap 
          items={simpleJourney} 
          direction="horizontal"
        />
      </section>

      {/* Usage Instructions */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How to Use Your Roadmap
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Customize Your Images</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Replace image paths in the data array</li>
                  <li>• Add your custom titles and descriptions</li>
                  <li>• Images are automatically optimized</li>
                  <li>• Fallback text appears if images fail to load</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Layout Options</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Choose horizontal or vertical direction</li>
                  <li>• Enable curved paths for modern look</li>
                  <li>• Responsive design works on all devices</li>
                  <li>• Easy to rearrange and modify</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Code Example</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`import AdvancedRoadmap from '@/components/home/advanced-roadmap';

const myJourney = [
  {
    id: '1',
    title: 'Your Step 1',
    description: 'Description here',
    imageSrc: '/your-image-1.png',
    imageAlt: 'Step 1 description'
  },
  // Add more steps...
];

<AdvancedRoadmap 
  items={myJourney} 
  direction="horizontal" 
  curved={true}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
