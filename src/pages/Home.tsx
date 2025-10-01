import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Sun, Fish, Users, Dna, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

// A single section component for the storytelling layout
const StorySection = ({ id, title, children, className }) => (
  <section id={id} className={`min-h-screen flex items-center justify-center p-8 ${className}`}>
    <div className="w-full max-w-xl mx-auto text-center text-white/90">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 font-google-sans-code opacity-0 animate-fade-in-up">{title}</h2>
      <div className="text-lg md:text-xl space-y-4 opacity-0 animate-fade-in-up delay-200">
        {children}
      </div>
    </div>
  </section>
);

// Scientist card component for the "Team" section
const ScientistCard = ({ imageUrl, name, field }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-4 opacity-0 animate-fade-in-up">
    <img src={imageUrl} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-cyan-300" />
    <div>
      <h4 className="font-bold text-lg text-white">{name}</h4>
      <p className="text-cyan-200 text-sm">{field}</p>
    </div>
  </div>
);

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [fishPosition, setFishPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const pageRef = useRef(null);

  // --- Scroll and Animation Logic ---
  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = pageRef.current ? pageRef.current.scrollHeight - window.innerHeight : 4000;
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      
      // Update fish position based on scroll percentage
      const scrollPercent = Math.min(currentScroll / pageHeight, 1);
      setFishPosition(scrollPercent * 100);

      // Determine active section for background transitions
      const sections = ['hero', 'who-we-are', 'our-mission', 'our-team', 'discover'];
      const sectionTops = sections.map(id => document.getElementById(id)?.offsetTop ?? 0);
      const currentSectionIndex = sectionTops.findIndex(top => currentScroll < top - window.innerHeight / 2);
      setActiveSection(sections[currentSectionIndex === -1 ? sections.length - 1 : Math.max(0, currentSectionIndex - 1)]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Background Opacity Logic ---
  const getBgOpacity = (sectionId) => {
    return activeSection === sectionId ? 'opacity-100' : 'opacity-0';
  };

  const scientists = [
    {
      imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Dr. Rajesh Kumar",
      field: "Physical Oceanography",
    },
    {
      imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Dr. Priya Nair",
      field: "Marine Biology & Fisheries",
    },
  ];

  return (
    <div ref={pageRef} className="relative bg-[#000428]">
      {/* --- Animated Backgrounds --- */}
      <div className="fixed inset-0 w-full h-full z-0">
        {/* Base dark blue background is always visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000428] to-[#004e92]" />

        {/* Sunlight Zone */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${getBgOpacity('hero')}`}>
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-cyan-300/30 to-transparent" />
        </div>
        
        {/* Twilight Zone */}
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-[#004e92]/50 to-[#000428] transition-opacity duration-1000 ${getBgOpacity('who-we-are')}`} />
        
        {/* Midnight Zone */}
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-1000 ${getBgOpacity('our-mission')}`} />
        <div className={`absolute inset-0 bg-black/60 transition-opacity duration-1000 ${getBgOpacity('our-team')}`} />
      </div>

      {/* --- Animated Fish Icon --- */}
      <div className="fixed top-0 left-8 h-full w-px z-20 hidden md:block">
        <div 
          className="absolute left-1/2 -translate-x-1/2 transition-transform duration-200 ease-out" 
          style={{ transform: `translateY(${fishPosition}vh) translateX(-50%)` }}
        >
          <Fish className="text-cyan-300" size={32} style={{ transform: 'rotate(90deg)' }}/>
        </div>
      </div>
      
      {/* --- Scrollable Content --- */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="h-screen flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 font-google-sans-code animate-fade-in-up">
            EXPLORE THE DEPTHS
          </h1>
          <p className="text-xl text-white/80 mb-8 animate-fade-in-up delay-200">
            AI-Driven Marine Insights at Your Fingertips.
          </p>
          <div className="animate-bounce mt-16 animate-fade-in-up delay-300">
            <ArrowDown className="text-white w-8 h-8" />
          </div>
        </section>

        {/* Who We Are Section */}
        <StorySection id="who-we-are" title="Who We Are">
          <p>
            Shark is a comprehensive marine data platform that unifies ocean, fisheries, otolith, 
            and DNA data for sustainable marine management.
          </p>
          <p className="mt-4">
            We integrate cutting-edge research to provide holistic insights into ocean ecosystems, climate patterns, and marine biodiversity.
          </p>
        </StorySection>
        
        {/* Our Mission Section */}
        <StorySection id="our-mission" title="Our Mission">
          <div className="flex flex-col md:flex-row gap-8 text-left">
            <div className="flex-1 space-y-2">
              <Sun size={28} className="text-yellow-300" />
              <h3 className="font-bold text-2xl">Illuminate</h3>
              <p>To bring clarity to complex marine data through advanced AI-powered analytics and visualization.</p>
            </div>
            <div className="flex-1 space-y-2">
              <Dna size={28} className="text-teal-300" />
              <h3 className="font-bold text-2xl">Conserve</h3>
              <p>To empower researchers and policymakers with actionable insights for conservation and resource management.</p>
            </div>
          </div>
        </StorySection>

        {/* Our Team Section */}
        <StorySection id="our-team" title="Pioneering Scientists">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {scientists.map((s, i) => (
              <div key={s.name} className={`delay-${i*100 + 300}`}>
                <ScientistCard {...s} />
              </div>
            ))}
          </div>
        </StorySection>

        {/* Discover Section */}
        <StorySection id="discover" title="Ready to Dive In?