import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Fish, Dna, Search, Map, Database, BookOpen, Star, Briefcase } from 'lucide-react';

// Video Component for the Hero Section
const HeroVideoBackground = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
    <video
      className="min-w-full min-h-full absolute object-cover"
      src="https://www.pexels.com/download/video/18304134/"
      autoPlay
      muted
      loop
      playsInline 
    />
    <div className="absolute inset-0 bg-black opacity-50"></div>
  </div>
);

// Scientist Card Component (NEW AESTHETIC DESIGN)
const ScientistCard = ({ imageUrl, name, institution, field, experience, impactScore, bio, color }) => (
  <div className="group relative bg-white rounded-xl shadow-md border border-slate-200/80
              transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex overflow-hidden">
    {/* Left Side: Image */}
    <div className="relative w-1/3 overflow-hidden">
      <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
    </div>

    {/* Right Side: Information */}
    <div className="w-2/3 p-6 flex flex-col">
      <div>
        <div className={`inline-block bg-${color}-100 text-${color}-800 text-xs font-semibold px-3 py-1 rounded-full mb-2`}>
          {field}
        </div>
        <h3 className="text-2xl font-bold text-slate-800 font-google-sans-code">{name}</h3>
        <p className="text-slate-500 text-sm mt-1">{institution}</p>
        
        <div className="flex items-center space-x-5 mt-4 text-slate-600">
          <div className="flex items-center space-x-1.5 text-sm">
            <Briefcase className="w-4 h-4" />
            <span>{experience}+ Years</span>
          </div>
          <div className="flex items-center space-x-1.5 text-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
            <span>{impactScore} Impact</span>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 mt-4 border-t border-slate-200 pt-4 font-zakartra-sans">
          {bio}
        </p>
      </div>

      <div className="mt-auto pt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <button className={`flex-1 bg-${color}-500 text-white px-5 py-2.5 rounded-lg
                          font-semibold hover:bg-${color}-600 transition-all duration-300 shadow-sm`}>
          View Research
        </button>
        <button className="flex-1 border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg
                          font-semibold hover:bg-slate-100 transition-all duration-300">
          Contact
        </button>
      </div>
    </div>
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-xl p-8 text-left transition-all duration-300 hover:shadow-xl hover:border-slate-300 hover:-translate-y-1">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2 font-google-sans-code">{title}</h3>
    <p className="text-sm text-slate-600 font-zakartra-sans">{description}</p>
  </div>
);

// Full-width information section component
const InfoSection = ({ icon, title, text, imageUrl, imageAlt, reverse = false }) => (
  <section className="py-24 px-6 bg-white">
    <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center ${reverse ? 'md:grid-flow-col-dense' : ''}`}>
      <div className={`text-left ${reverse ? 'md:col-start-2' : ''}`}>
        <div className="mb-6">{icon}</div>
        <h3 className="text-3xl font-bold text-slate-800 mb-4 font-google-sans-code">{title}</h3>
        <p className="text-lg text-slate-600 leading-relaxed font-zakartra-sans">
          {text}
        </p>
      </div>
      <div className={`flex items-center justify-center ${reverse ? 'md:col-start-1' : ''}`}>
        <img src={imageUrl} alt={imageAlt} className="w-full h-96 object-cover rounded-2xl shadow-lg" />
      </div>
    </div>
  </section>
);


const Home = () => {
  const scientists = [
    {
      imageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Dr. Rajesh Kumar",
      institution: "CSIR-NIO, Goa",
      field: "Physical Oceanography",
      experience: 22,
      impactScore: 4.9,
      bio: "Pioneering research in Indian Ocean monsoon dynamics and climate modeling.",
      color: "ocean",
    },
    {
      imageUrl: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      name: "Dr. Priya Nair",
      institution: "CMFRI, Kochi",
      field: "Marine Biology & Fisheries",
      experience: 18,
      impactScore: 4.8,
      bio: "Expert in tropical fisheries management and marine biodiversity conservation.",
      color: "aqua",
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center text-white p-6">
        <HeroVideoBackground />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-google-sans-code animate-fade-in-up">
            Shark
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto font-zakartra-sans animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Unifying complex marine data for sustainable ocean management through advanced AI.
          </p>
          <Link to="/ai" className="border-2 border-white text-white px-10 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 inline-flex items-center space-x-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <span>Try AI Assistant</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* --- Vision & Information Sections --- */}
      <div className="bg-slate-50 py-28">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 font-google-sans-code">A Unified Vision for Marine Intelligence</h2>
              <p className="text-lg text-slate-600 font-zakartra-sans">
                We centralize critical marine data streams into one intelligent platform, empowering researchers and policymakers with actionable insights for conservation and sustainable resource management.
              </p>
            </div>
        </div>
        
        <InfoSection 
          icon={<Globe className="w-12 h-12 text-ocean-600" />}
          title="Oceanographic Data"
          text="Analyze currents, salinity, and climate patterns for a comprehensive marine overview. Our AI models identify trends and anomalies in physical and chemical ocean properties to predict environmental changes."
          imageUrl="https://images.pexels.com/photos/3410956/pexels-photo-3410956.jpeg"
          imageAlt="Vibrant coral reef"
        />

        <InfoSection 
          icon={<Fish className="w-12 h-12 text-aqua-600" />}
          title="Fisheries Data Analytics"
          text="Monitor stock health, track catch trends, and model sustainable fishing practices. The platform integrates historical and real-time data to help ensure the longevity of marine populations and support coastal livelihoods."
          imageUrl="https://images.pexels.com/photos/889929/pexels-photo-889929.jpeg"
          imageAlt="School of fish swimming in the ocean"
          reverse={true}
        />

        <InfoSection 
          icon={<Dna className="w-12 h-12 text-deepBlue-600" />}
          title="Biodiversity & eDNA Insights"
          text="Leverage environmental DNA (eDNA), species taxonomy, and habitat mapping to protect marine ecosystems. Uncover the secrets of marine life and track biodiversity with cutting-edge genomic tools."
          imageUrl="https://images.pexels.com/photos/18069422/pexels-photo-18069422.png"
          imageAlt="Scientific equipment for DNA analysis"
        />

      </div>

      {/* Scientists Section */}
      <section className="py-28 px-6 bg-slate-100/70">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-google-sans-code">Pioneering Indian Marine Scientists</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-zakartra-sans">
              Our platform is guided by the expertise of leading researchers from India's premier institutions.
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-10 max-w-4xl mx-auto">
            {scientists.map((scientist, index) => (
              <ScientistCard key={index} {...scientist} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-google-sans-code">Platform Features</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-zakartra-sans">
              A suite of powerful tools designed for modern marine science.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<Search className="w-10 h-10 text-ocean-600" />}
              title="AI Search & Analysis"
              description="Pose complex questions in natural language and receive AI-driven insights from integrated datasets."
            />
            <FeatureCard
              icon={<Map className="w-10 h-10 text-aqua-600" />}
              title="Interactive Geovisualization"
              description="Map and visualize marine data in real-time, overlaying different datasets for spatial analysis."
            />
            <FeatureCard
              icon={<Database className="w-10 h-10 text-deepBlue-600" />}
              title="Unified Biodiversity Database"
              description="Access a comprehensive and searchable database of species, eDNA records, and habitat information."
            />
            <FeatureCard
              icon={<BookOpen className="w-10 h-10 text-seafoam-600" />}
              title="Developer API Access"
              description="Integrate our rich marine datasets into your own applications and models with a robust, documented API."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;