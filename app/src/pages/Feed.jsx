import React, { useEffect, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import PostCard from '../components/post/PostCard';
import BottomNav from '../components/common/BottomNav';

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await postService.getFeed();
        // Adjust depending on whether data is an array or wrapped in an object (e.g., data.posts or data.data)
        setPosts(Array.isArray(data) ? data : data.posts || data.data || []);
      } catch (err) {
        setError('Failed to load feed. Please try again later.');
        // Fallback mock post so your UI looks populated even if backend is offline
        setPosts([
          {
            id: 1,
            user: { username: 'johndoe', name: 'John Doe', avatar: '' },
            image_url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=600',
            caption: 'Creating unforgettable moments with my favorite person! ✨ Let’s cherish every second together...',
            likes_count: 20,
            comments_count: 20,
            is_liked: false,
            time_ago: '1 Minute Ago'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f12] text-white pb-24">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0f0f12]/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <h1 className="text-lg font-bold tracking-tight">Sociality</h1>
        </div>
        
        <button
          onClick={() => navigate('/search')}
          className="p-2 rounded-full bg-[#1a1a24] text-gray-300 hover:text-white transition-colors border border-gray-800"
        >
          <Search className="w-5 h-5" />
        </button>
      </header>

      {/* Main Timeline Content */}
      <main className="max-w-lg mx-auto px-4 pt-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error && posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            No posts available yet. Be the first to share something!
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id || Math.random()} post={post} />
          ))
        )}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <BottomNav />

    </div>
  );
};

export default Feed;