import React from 'react';
import { X } from 'lucide-react';

const LikeModal = ({ isOpen, onClose, likes = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-[#121217] border border-gray-800 rounded-2xl overflow-hidden flex flex-col max-h-[70vh] shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <h3 className="text-sm font-bold text-white">Likes</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Likes List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {likes && likes.length > 0 ? (
            likes.map((user, idx) => (
              <div key={user.id || idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={user.username}
                    className="w-9 h-9 rounded-full object-cover border border-purple-600/30"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{user.name || user.username}</p>
                    <p className="text-[10px] text-gray-400">@{user.username}</p>
                  </div>
                </div>
                <span className="text-xs text-purple-400 font-semibold cursor-pointer hover:underline">Follow</span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400 text-xs">
              <p>No likes yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LikeModal;