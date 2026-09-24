import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((email === 'srm' && password === 'srm@1234') || (email === 'admin' && password === 'admin123')) {
      setLoading(true);
      setTimeout(() => {
        setUser({ name: 'SRM Hotel Manager', email: 'srm@supplyhub.com', hotelName: 'SRM Hotel', role: email === 'admin' ? 'admin' : 'user' });
        navigate('/dashboard');
      }, 800);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert('Invalid credentials! Use username: srm, password: srm@1234');
      }, 500);
    }
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setUser({ name: 'Hotel Manager', email: 'demo@supplyhub.com', hotelName: 'Demo Hotel', role: 'user' });
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-600 rounded-2xl mb-4 shadow-lg shadow-brand-600/30">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-navy-700">SupplyHub</h1>
            <p className="text-sm text-gray-500 mt-1">Smart Wholesale Grocery Finder</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email / Username
              </label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-center flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Demo Button */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full bg-navy-700 hover:bg-navy-800 text-white font-medium py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            🚀 Continue as Demo User
          </button>

          <p className="text-xs text-gray-400 text-center mt-6">
            This is a mini-project prototype. Click "Continue as Demo User" for instant access.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2024 SupplyHub — Smart Wholesale Grocery Finder
        </p>
      </div>
    </div>
  );
}
