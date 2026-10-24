import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(formData);
      setAuth(data.token, data.user || { email: formData.email });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0f0f12] via-[#1a0b2e] to-[#0f0f12] px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#121217]/80 p-8 shadow-2xl backdrop-blur-md border border-purple-900/30">
        
        {/* Logo / Title - TES WARNA MERAH */}
        <div className="text-center mb-8">
          <h1 style={{ color: 'red' }} className="text-3xl font-bold tracking-tight">Sociality</h1>
          <p className="text-sm text-gray-400 mt-2">Welcome Back!</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl bg-[#1a1a24] border border-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl bg-[#1a1a24] border border-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-[#121217] transition-all disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;