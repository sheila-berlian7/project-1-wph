import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Search } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 bg-[#121217]/90 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-bold text-white tracking-wide">Sociality</span>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate('/search')}
          className="p-2 rounded-xl bg-[#1a1a24] border border-gray-800 text-gray-400 hover:text-white transition-all"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;