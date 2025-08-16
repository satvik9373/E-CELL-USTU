
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      <Header />
      <section
        className="flex flex-col md:flex-row items-center justify-center px-6 py-16 gap-12 max-w-6xl mx-auto w-full mt-10 md:mt-16"
      >
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/Images/about-us.png"
            alt="E-Cell Event Fireworks"
            className="rounded-[48px] shadow-xl object-cover w-full max-w-2xl h-auto"
            style={{ background: 'linear-gradient(135deg, #F5E9D7 0%, #F9F6F2 100%)' }}
          />
        </div>
        {/* Right: Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-[#142257] mb-4 tracking-wide">
            Origins of E-Cell
          </h2>
          <p className="text-base md:text-lg font-normal text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
            The Entrepreneurship Cell at IIT Bombay was founded in 1998 with the motto of <span className="font-semibold">‘Creating Job Creators’</span>.<br />
            Currently, we are a team of 22 Managers, 2 Overall Coordinators, and many enthusiastic students sharing a common mission. The team meets up in an 18x18x14 room, popularly known as the ‘E-Cell office’ inside the Students Activity Centre (SAC), where the strategy to uplift the flame of startups across the globe originates.
          </p>
        </div>
      </section>
      {/* Our Vision Section */}
      <section className="w-full py-16 px-4 flex flex-col items-center justify-center bg-white dark:bg-neutral-950">
  <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-[#142257] mb-6 tracking-wide text-center">Our Vision</h2>
        <p className="text-lg md:text-xl font-normal text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-3xl text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
          Entrepreneurs have a clear vision. These are the thinkers, innovators, the action takers who change society for a better tomorrow. The vision of E-Cell IIT Bombay is to enable these action-takers to efficiently traverse their road to an enterprise by giving them exposure, mentorship, network, funding opportunities and wisdom to turn their dreams into reality.
        </p>
      </section>

      {/* Our Reach Section */}
      <section
        className="w-full py-16 px-4 flex flex-col items-center justify-center relative"
        style={{ minHeight: '400px' }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/Images/about-us.png"
            alt="Background"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35)' }}
          />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-white mb-10 tracking-wide text-center" style={{ color: '#F5E9D7' }}>
            OUR REACH
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-full max-w-xl">
            {/* Instagram Stat */}
            <div className="flex flex-col items-center justify-center">
              <img src="/icons/instagram.png" alt="Instagram" className="mb-2 w-12 h-12 object-contain" />
              <div className="text-2xl md:text-3xl font-extrabold text-white">10K+</div>
              <div className="text-base md:text-lg font-extrabold text-white">Reach</div>
            </div>
            {/* LinkedIn Stat */}
            <div className="flex flex-col items-center justify-center">
              <img src="/icons/linkedin.png" alt="LinkedIn" className="mb-2 w-12 h-12 object-contain" />
              <div className="text-2xl md:text-3xl font-extrabold text-white">15K+</div>
              <div className="text-base md:text-lg font-extrabold text-white">Reach</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}