import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Grid, Bookmark, Heart, LogOut } from 'lucide-react';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';
import BottomNav from '../components/common/BottomNav';

const Profile = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' or 'saved'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await authService.getProfile();
        setUser(data.user || data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
        // Fallback mock profile for testing UI
        setUser({
          name: 'John Doe',
          username: 'johndoe',
          email: 'johndoe@email.com',
          bio: 'Creating unforgettable moments with my favorite person! ✨ Let’s cherish every second together...',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          posts_count: 50,
          followers_count: 100,
          following_count: 43,
          likes_count: 567,
          posts: [
            { id: 1, image_url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400' },
            { id: 2, image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' },
            { id: 3, image_url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400' },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0f0f12]">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] text-white pb-24">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0f0f12]/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between max-w-lg mx-auto">
        <h1 className="text-base font-bold tracking-tight">{user?.username || 'Profile'}</h1>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6">
        
        {/* User Info Header */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt={user?.username}
            className="w-20 h-20 rounded-full object-cover border-2 border-purple-600 shadow-lg shadow-purple-600/20"
          />
          <div className="flex-1 flex justify-around text-center">
            <div>
              <p className="text-base font-bold">{user?.posts_count || user?.posts?.length || 0}</p>
              <p className="text-xs text-gray-400">Posts</p>
            </div>
            <div>
              <p className="text-base font-bold">{user?.followers_count || 0}</p>
              <p className="text-xs text-gray-400">Followers</p>
            </div>
            <div>
              <p className="text-base font-bold">{user?.following_count || 0}</p>
              <p className="text-xs text-gray-400">Following</p>
            </div>
          </div>
        </div>

        {/* Name & Bio */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-white">{user?.name}</h2>
          <p className="text-xs text-gray-300 mt-1 leading-relaxed">{user?.bio || 'No bio added yet.'}</p>
        </div>

        {/* Edit Profile Button */}
        <button 
          onClick={() => alert('Edit Profile Modal can be integrated here!')}
          className="w-full py-2 bg-[#1a1a24] hover:bg-[#252532] border border-gray-800 rounded-xl text-xs font-semibold text-white transition-all shadow-sm mb-6"
        >
          Edit Profile
        </button>

        {/* Tabs (Gallery / Saved) */}
        <div className="flex border-t border-gray-800 mb-4">
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 flex items-center justify-center py-3 space-x-2 border-b-2 text-xs font-medium transition-all ${
              activeTab === 'gallery' ? 'border-purple-600 text-purple-400' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Gallery</span>
          </button>
          
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 flex items-center justify-center py-3 space-x-2 border-b-2 text-xs font-medium transition-all ${
              activeTab === 'saved' ? 'border-purple-600 text-purple-400' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved</span>
          </button>
        </div>

        {/* Post Grid */}
        {activeTab === 'gallery' ? (
          user?.posts && user.posts.length > 0 ? (
            <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden">
              {user.posts.map((post, idx) => (
                <div key={post.id || idx} className="aspect-square bg-[#1a1a24] overflow-hidden">
                  <img src={post.image_url} alt="Gallery item" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400 text-xs">
              <p className="font-semibold text-white mb-1">Your story starts here</p>
              <p className="text-gray-500 mb-4">Share your first post and let the world see your moments.</p>
              <button 
                onClick={() => navigate('/add-post')}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-purple-600/30 hover:bg-purple-500"
              >
                Upload My First Post
              </button>
            </div>
          )
        ) : (
          <div className="text-center py-16 text-gray-400 text-xs">
            No saved posts yet.
          </div>
        )}

      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;