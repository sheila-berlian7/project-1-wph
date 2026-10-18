import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ArrowLeft, X } from 'lucide-react';
import api from '../services/api';
import BottomNav from '../components/common/BottomNav';

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      // Adjust endpoint based on your Swagger API search route (e.g., /api/v1/search?q=...)
      const response = await api.get(`/api/v1/search`, {
        params: { query: query }
      });
      setResults(response.data.users || response.data.results || response.data || []);
    } catch (err) {
      console.error('Search error', err);
      // Fallback mock search results for testing UI (Matches Figma "Found" state)
      if (query.toLowerCase().includes('john')) {
        setResults([
          { id: 1, name: 'John Doe', username: 'johndoe', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
          { id: 2, name: 'John Doe', username: 'johndoe', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
          { id: 3, name: 'John Doe', username: 'johndoe', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
        ]);
      } else {
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="min-h-screen bg-[#0f0f12] text-white pb-24">
      
      {/* Top Header with Search Bar */}
      <header className="sticky top-0 z-40 bg-[#0f0f12]/90 backdrop-blur-md border-b border-gray-800 px-4 py-3 max-w-lg mx-auto flex items-center space-x-3">
        <button onClick={() => navigate(-1)} className="text-gray-300 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearch} className="flex-1 relative flex items-center">
          <SearchIcon className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-[#1a1a24] border border-gray-800 rounded-full pl-9 pr-8 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-all"
            autoFocus
          />
          {query && (
            <button type="button" onClick={clearSearch} className="absolute right-3 text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </form>
      </header>

      {/* Main Content Area */}
      <main className="max-w-lg mx-auto px-4 pt-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : searched && results.length === 0 ? (
          /* Not Found State (Matches Figma) */
          <div className="text-center py-24 bg-[#121217] border border-gray-800 rounded-2xl p-6 mt-4">
            <h3 className="text-sm font-bold text-white mb-1">No results found</h3>
            <p className="text-xs text-gray-400">Change your keyword and try again.</p>
          </div>
        ) : (
          /* Found Results List */
          <div className="space-y-4">
            {results.map((user) => (
              <div key={user.id || Math.random()} className="flex items-center justify-between bg-[#121217] border border-gray-800 p-3 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover border border-purple-600/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{user.name}</h4>
                    <p className="text-[10px] text-gray-400">@{user.username}</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-xs font-semibold shadow-md shadow-purple-600/20 transition-all">
                  Follow
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Search;