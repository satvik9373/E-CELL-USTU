"use client";

import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export default function VideoBackgroundAbout() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (videoRef.current) {
          videoRef.current.style.transform = `translateY(${parallax}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110"
          poster="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop"
        >
          {/* Fallback to images since we can't use actual video files */}
          <source src="data:video/mp4;base64," type="video/mp4" />
        </video>
        
        {/* Fallback Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop)'
          }}
        ></div>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
        
        {/* Additional Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
      </div>

      {/* Video Controls */}
      <button
        onClick={toggleVideo}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
        ) : (
          <Play className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
        )}
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <div 
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Main Text Block */}
          <div className="backdrop-blur-sm bg-white/10 rounded-3xl border border-white/20 p-8 lg:p-12 shadow-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              About Universal Skill Tech University
            </h1>
            
            <div className="space-y-6 text-lg md:text-xl text-white/90 leading-relaxed">
              <p>
                We are pioneering the future of technology education through immersive experiences, 
                cutting-edge innovation labs, and a global community of learners and leaders.
              </p>
              
              <p>
                Our mission is to democratize access to world-class tech education, fostering 
                innovation and empowering the next generation to solve tomorrow's challenges.
              </p>
              
              <p>
                From virtual summits connecting thousands globally to hands-on campus programs 
                driving local impact, we're building bridges between education and industry.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-sm text-white/80">Students Empowered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">75+</div>
                <div className="text-sm text-white/80">Countries Reached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-sm text-white/80">Industry Partners</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}