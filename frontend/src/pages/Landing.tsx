import React from 'react';
import { Link } from 'react-router-dom';
import { Fish } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Fish className="text-cyan-600" size={28} />
          <span className="font-bold text-xl text-slate-900">Piyush Aquatic</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
            Demo Login Portal
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto py-20 px-6 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Premium Wholesale Ornamental Fish Farming
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Based in Dabhil, Ratnagiri. Managing over 200 breeding tanks with high-quality genetic stock for Discus, Angelfish, Arowana, and Cichlids.
        </p>
      </section>
    </div>
  );
};