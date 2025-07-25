import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import insurance from '../assets/insurance.png';

const StartPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-y-8 max-w-2xl w-full h-full py-8">
        {/* Image (scaled down slightly for balance) */}
        <div className="flex justify-center items-center">
          <img 
            src={insurance} 
            alt="insurance" 
            className="w-[70%] max-h-[50vh] object-contain" 
          />
        </div>
        
        {/* Features (now in a single centered column) */}
        <div className="flex flex-col md:flex-row justify-center gap-x-6 gap-y-4 w-full">
          {['Real-time Processing', 'Smart Analytics', 'Secure & Fast'].map((text) => (
            <div key={text} className="flex items-center justify-center space-x-2 text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={onGetStarted}
          className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <span className="flex items-center space-x-2">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default StartPage;