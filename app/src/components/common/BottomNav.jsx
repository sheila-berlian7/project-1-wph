import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Plus, User } from 'lucide-react';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center space-x-6 bg-[#1a1a24]/90 backdrop-blur-lg border border-purple-900/30 px-6 py-3 rounded-full shadow-2xl shadow-purple-900/20">
        
        {/* Home / Feed */}
        <button
          onClick={() => navigate('/')}
          className={`p-2.5 rounded-full transition-all ${
            isActive('/') ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
        </button>

        {/* Add Post Button */}
        <button
          onClick={() => navigate('/add-post')}
          className={`p-2.5 rounded-full transition-all ${
            isActive('/add-post') ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate('/profile')}
          className={`p-2.5 rounded-full transition-all ${
            isActive('/profile') ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40' : 'text-gray-400 hover:text-white'
          }`}
        >
          <User className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};

export default BottomNav;