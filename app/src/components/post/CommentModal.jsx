import React, { useState } from 'react';
import { X, Send, Smile } from 'lucide-react';
import { postService } from '../../services/postService';

const CommentModal = ({ postId, isOpen, onClose, comments = [], onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const emojis = ['😊', '😂', '❤️', '🔥', '👍', '😍', '✨', '🙌', '🎉', '👏', '😢', '😎'];

  if (!isOpen) return null;

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      const response = await postService.addComment(postId, commentText);
      const newCommentObj = response.comment || {
        id: Date.now(),
        user: { username: 'you', name: 'You' },
        comment: commentText,
        time_ago: 'Just now'
      };
      
      if (onCommentAdded) {
        onCommentAdded(newCommentObj);
      }
      setCommentText('');
      setShowEmojiPicker(false);
    } catch (err) {
      console.error('Failed to add comment', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setCommentText((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#121217] border border-gray-800 rounded-2xl overflow-hidden flex flex-col max-h-[80vh] shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <h3 className="text-sm font-bold text-white">Comments</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments && comments.length > 0 ? (
            comments.map((item, idx) => (
              <div key={item.id || idx} className="flex items-start space-x-3">
                <img
                  src={item.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                  alt={item.user?.username}
                  className="w-8 h-8 rounded-full object-cover border border-purple-600/30 flex-shrink-0"
                />
                <div className="flex-1 bg-[#1a1a24] border border-gray-800 p-3 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{item.user?.name || item.user?.username}</span>
                    <span className="text-[10px] text-gray-500">{item.time_ago || '1m ago'}</span>
                  </div>
                  <p className="text-xs text-gray-300">{item.comment || item.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 text-xs">
              <p className="font-semibold text-white mb-1">No Comments yet</p>
              <p className="text-gray-500">Start the conversation below.</p>
            </div>
          )}
        </div>

        {/* Emoji Selector Popup Panel */}
        {showEmojiPicker && (
          <div className="bg-[#1a1a24] border-t border-gray-800 p-3 grid grid-cols-6 gap-2">
            {emojis.map((emoji, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleEmojiSelect(emoji)}
                className="text-lg hover:bg-purple-600/20 p-1.5 rounded-lg transition-all text-center"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Comment Input Footer */}
        <form onSubmit={handleAddComment} className="p-3 bg-[#0f0f12] border-t border-gray-800 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <Smile className="w-5 h-5" />
          </button>
          
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add Comment..."
            className="flex-1 bg-[#1a1a24] border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-all"
          />

          <button
            type="submit"
            disabled={loading || !commentText.trim()}
            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-50 flex items-center space-x-1"
          >
            <span>{loading ? 'Posting...' : 'Post'}</span>
            <Send className="w-3.5 h-3.5 ml-1" />
          </button>
        </form>

      </div>
    </div>
  );
};

export default CommentModal;