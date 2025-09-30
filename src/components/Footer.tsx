import React from 'react';

const Footer = () => {
  return (
    <footer className="glass py-12 mt-20 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-12 mb-8">
            <div className="text-gray-700 font-medium">MoES</div>
            <div className="text-gray-700 font-medium">CMLRE</div>
            <div className="text-gray-700 font-medium">AICTE</div>
          </div>
          
          <div className="flex justify-center space-x-8 mb-8">
            <a href="#" className="text-gray-600 hover:text-coral-700 hover:underline text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-coral-700 hover:underline text-sm transition-colors">Help</a>
            <a href="#" className="text-gray-600 hover:text-coral-700 hover:underline text-sm transition-colors">Contact</a>
          </div>
          
          <p className="text-ocean-700 text-sm">
            © 2025 Shark - AI-Driven Marine Insights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;