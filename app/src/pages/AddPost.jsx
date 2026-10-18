import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, Upload } from 'lucide-react';
import { postService } from '../services/postService';
import BottomNav from '../components/common/BottomNav';

const AddPost = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile && !imagePreview) {
      setError('Please select an image to share.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('caption', caption);

      await postService.createPost(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f12] text-white pb-24">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0f0f12]/80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between max-w-lg mx-auto">
        <button onClick={() => navigate(-1)} className="p-1 rounded-full text-gray-300 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold tracking-tight">Add Post</h1>
        <div className="w-5" /> {/* Spacer */}
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6">
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Image Upload Box */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-2">Photo</label>
            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden bg-black border border-gray-800 max-h-[400px] flex items-center justify-center">
                <img src={imagePreview} alt="Upload preview" className="w-full h-full object-cover" />
                <label className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-medium text-white cursor-pointer hover:bg-black/90 transition-all border border-white/10">
                  Change Image
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-700 rounded-2xl cursor-pointer bg-[#121217] hover:bg-[#1a1a24] transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                  <Upload className="w-8 h-8 text-purple-500 mb-2" />
                  <p className="text-xs font-semibold text-white mb-1">Click to upload or drag and drop</p>
                  <p className="text-[10px] text-gray-400">PNG or JPG (max. 800x800px)</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          {/* Caption Input */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-2">Caption</label>
            <textarea
              rows="3"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Create your caption..."
              className="w-full rounded-xl bg-[#121217] border border-gray-800 p-4 text-sm text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-[#0f0f12] transition-all disabled:opacity-50"
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>

        </form>
      </main>

      <BottomNav />
    </div>
  );
};

export default AddPost;