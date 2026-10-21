import React from 'react';
import { Edit3 } from 'lucide-react';

const UserHeader = ({ user, onEditClick }) => {
  return (
    <div className="bg-[#121217] border-b border-gray-800 p-6 flex flex-col items-center text-center">
      <div className="relative mb-3">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
          alt={user?.username}
          className="w-20 h-20 rounded-full object-cover border-2 border-purple-600 shadow-lg"
        />
      </div>

      <h2 className="text-base font-bold text-white">{user?.name || user?.username || 'User Name'}</h2>
      <p className="text-xs text-gray-400 mb-3">@{user?.username || 'username'}</p>
      
      <p className="text-xs text-gray-300 max-w-xs mb-5">
        {user?.bio || 'Building amazing apps and exploring the digital world. ✨'}
      </p>

      {/* Stats Row */}
      <div className="flex items-center justify-center space-x-8 mb-5 w-full max-w-xs border-y border-gray-800 py-3">
        <div>
          <p className="text-sm font-bold text-white">{user?.posts_count || 0}</p>
          <p className="text-[10px] text-gray-400 uppercase">Posts</p>
        </div>
        <div>
          <p className="text-sm font-bold text-white">{user?.followers_count || 0}</p>
          <p className="text-[10px] text-gray-400 uppercase">Followers</p>
        </div>
        <div>
          <p className="text-sm font-bold text-white">{user?.following_count || 0}</p>
          <p className="text-[10px] text-gray-400 uppercase">Following</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button
        onClick={onEditClick}
        className="flex items-center justify-center space-x-2 bg-[#1a1a24] hover:bg-purple-600/20 border border-gray-800 hover:border-purple-600 text-white px-6 py-2 rounded-xl text-xs font-semibold transition-all w-full max-w-xs"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Edit Profile</span>
      </button>
    </div>
  );
};

export default UserHeader;