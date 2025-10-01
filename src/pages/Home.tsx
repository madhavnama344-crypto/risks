import React, from 'react';
import { Link } from 'react-router-dom';
import { Fish, Users, Dna, Bot, ArrowDown, Globe, BarChart2 } from 'lucide-react';

// Custom Hook for Scroll-Triggered Animations
const useIntersectionObserver = (options) => {
  const [ref, setRef] = React.useState(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return [setRef, isVisible];
};

// Story Section Component with Animation
const StorySection = ({ children, className = '' }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  return (
    <section ref={ref} className={`min-h-screen flex items-center justify-center p-8 ${className}`}>
      <div className={`w-full max-w-2xl mx-auto section-content ${isVisible ? 'is-visible' : ''}`}>
        {children}
      </div>
    </section>
  );
};

// Scientist Card using your custom glass & glow styles
const ScientistCard = ({ imageUrl, name, field }) => (
  <div className="glass-dark rounded-2xl p-4 flex items-center space-x-4 glow-hover">
    <img src={imageUrl} alt={name} className="w-20 h-20 rounded-full object-cover border-2 border-aqua-400" />
    <div className="text-left">
      <h4 className="font-bold text-xl text-pearl">{name}</h4>
      <p className="text-aqua-300">{field}</p>
    </div>
  </div>
);

export default function Home() {
  const [fishPosition, setFishPosition] = React.useState(0);
  const pageRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const pageHeight = pageRef.current ? pageRef.current.scrollHeight - window.innerHeight : 4000;
      const scrollPercent = Math.min(window.scrollY / pageHeight, 1);
      setFishPosition(scrollPercent * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div ref={pageRef} className="bg-ocean-900 font-zakartra-sans">
      {/* Animated Fish Icon using your bioluminescent color */}
      <div className="fixed top-0 left-8 h-full w-px z-20 hidden md:block">
        <div 
          className="absolute left-1/2 -translate-x-1/2 transition-transform duration-200 ease-out" 
          style={{ transform: `translateY(${fishPosition}vh) translateX(-50%)` }}
        >
          <Fish className="text-bioluminescent" size={32} style={{ transform: 'rotate(90deg)' }}/>
        </div>
      </div>

      {/* --- Scrollable Content --- */}
      <div className="relative z-10 text-center text-pearl">
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-900 via-ocean-800 to-ocean-900 opacity-80"></div>
          <div className="absolute inset-0 bg-[url('/path-to-your/wave-pattern.svg')] opacity-5"></div>
          <div className="relative z-10">
            <h1 className="text-6xl md:text-8xl font-bold font-google-sans-code animate-fade-in-up">
              Shark
            </h1>
            <p className="text-xl text-pearl/80 my-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              An AI-driven voyage into the heart of marine intelligence.
            </p>
            <div className="animate-bounce mt-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <ArrowDown className="w-8 h-8 mx-auto" />
            </div>
          </div>
        </section>

        {/* The Journey Begins */}
        <StorySection>
          <Globe className="w-16 h-16 mx-auto text-aqua-400 mb-6 animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-google-sans-code">The Journey Begins</h2>
          <p className="text-lg md:text-xl leading-relaxed text-pearl/80">
            Our platform unifies complex oceanographic, fisheries, and genomic data. We transform raw information into a clear, comprehensive narrative of our planet's most vital resource.
          </p>
        </StorySection>
        
        {/* The Mission */}
        <StorySection>
          <div className="glass-ocean rounded-2xl p-8 md:p-12 glow-soft">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-google-sans-code">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="glass p-6 rounded-lg">
                <BarChart2 size={28} className="text-coral-400 mb-2" />
                <h3 className="font-bold text-2xl text-coral-300">Illuminate</h3>
                <p className="text-pearl/80 mt-2">To bring clarity to marine data through advanced AI-powered analytics and visualization.</p>
              </div>
              <div className="glass p-6 rounded-lg">
                <Dna size={28} className="text-seaweed-400 mb-2" />
                <h3 className="font-bold text-2xl text-seaweed-300">Conserve</h3>
                <p className="text-pearl/80 mt-2">To empower researchers with actionable insights for conservation and resource management.</p>
              </div>
            </div>
          </div>
        </StorySection>

        {/* The Pioneers */}
        <StorySection>
          <Users className="w-16 h-16 mx-auto text-sand-400 mb-6 animate-pulse-soft" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-google-sans-code">The Pioneers</h2>
          <p className="text-lg md:text-xl leading-relaxed text-pearl/80 mb-8">
            Guided by the expertise of leading researchers from India's premier institutions.
          </p>
          <div className="grid grid-cols-1 gap-6">
            {scientists.map((s) => ( <ScientistCard key={s.name} {...s} /> ))}
          </div>
        </StorySection>

        {/* Discover */}
        <StorySection>
          <Bot className="w-16 h-16 mx-auto text-bioluminescent mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-google-sans-code">Ready to Dive In?</h2>
          <p className="text-lg md:text-xl leading-relaxed text-pearl/80">
            Begin your journey into the world of marine data. Our powerful AI assistant is ready to help you uncover insights.
          </p>
          <Link 
            to="/ai"
            className="mt-8 inline-block bg-bioluminescent text-charcoal font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-[0_0_20px_theme(colors.bioluminescent)]"
          >
            Start Analyzing
          </Link>
        </StorySection>
      </div>
    </div>
  );
}