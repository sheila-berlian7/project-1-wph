import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { postService } from '../../services/postService';

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await postService.unlikePost(post.id);
        setLikesCount((prev) => prev - 1);
      } else {
        await postService.likePost(post.id);
        setLikesCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('Failed to update like status', err);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-[#121217] border border-gray-800 rounded-2xl overflow-hidden mb-6 shadow-xl">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <img
            src={post.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt={post.user?.username || 'User'}
            className="w-10 h-10 rounded-full object-cover border border-purple-600/40"
          />
          <div>
            <h4 className="text-sm font-semibold text-white">{post.user?.name || post.user?.username}</h4>
            <p className="text-xs text-gray-400">{post.time_ago || '1 Minute Ago'}</p>
          </div>
        </div>
      </div>

      {/* Post Image */}
      {post.image_url && (
        <div className="w-full bg-black flex items-center justify-center max-h-[500px] overflow-hidden">
          <img
            src={post.image_url}
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Post Actions Toolbar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center space-x-4">
          <button onClick={handleLikeToggle} className="flex items-center space-x-1.5 focus:outline-none group">
            <Heart
              className={`w-6 h-6 transition-colors ${
                isLiked ? 'text-red-500 fill-red-500' : 'text-gray-300 group-hover:text-white'
              }`}
            />
            <span className="text-xs text-gray-300 font-medium">{likesCount}</span>
          </button>

          <button className="flex items-center space-x-1.5 focus:outline-none group">
            <MessageCircle className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
            <span className="text-xs text-gray-300 font-medium">{post.comments_count || 0}</span>
          </button>
        </div>

        <button className="focus:outline-none text-gray-300 hover:text-white transition-colors">
          <Bookmark className="w-6 h-6" />
        </button>
      </div>

      {/* Caption & Content */}
      <div className="px-4 pb-4 pt-1">
        <p className="text-sm text-gray-200">
          <span className="font-semibold text-white mr-2">{post.user?.username}</span>
          {post.caption || post.content}
        </p>
      </div>
    </div>
  );
};

PostCard.defaultProps = {
  post: {
    id: 1,
    user: { username: 'johndoe', name: 'John Doe', avatar: '' },
    image_url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=600',
    caption: 'Creating unforgettable moments with my favorite person! ✨ Let’s cherish every second together...',
    likes_count: 20,
    comments_count: 20,
    is_liked: false,
    time_ago: '1 Minute Ago'
  }
};

export default PostCard;