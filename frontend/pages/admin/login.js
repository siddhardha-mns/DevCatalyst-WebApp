import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      console.log('Attempting login with API URL:', apiUrl);
      console.log('Credentials:', { username: credentials.username, password: credentials.password.length + ' chars' });
      
      const response = await axios.post(`${apiUrl}/admin/login/`, credentials);
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        // Store token and user info
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.user));
        
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      if (err.response?.status === 404) {
        setError('Admin login endpoint not found. Please check if the backend is running.');
      } else if (err.response?.status === 0 || err.code === 'ERR_NETWORK') {
        setError('Cannot connect to backend. Please check if the server is running on the correct URL.');
      } else {
        setError(err.response?.data?.message || err.response?.data?.errors || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Head>
        <title>Admin Login - DevCatalyst</title>
        <meta name="description" content="DevCatalyst Admin Panel Login" />
      </Head>

      <div className="min-h-screen retro-grid scanlines flex items-center justify-center px-6">
        <div className="matrix-bg"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="retro-card p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="retro-title text-3xl md:text-4xl neon-text neon-cyan glitch mb-4"
              data-text="Admin Access"
            >
              Admin Access
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-cyan-300"
            >
              Enter your credentials to access the admin panel
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <label className="block retro-subtitle text-cyan-400 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full retro-input"
                placeholder="Enter admin username"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <label className="block retro-subtitle text-cyan-400 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full retro-input"
                placeholder="Enter admin password"
                required
              />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-center bg-red-900/20 border border-red-500 rounded p-3"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              type="submit"
              disabled={loading}
              className="w-full retro-btn border-green-500 text-green-500 disabled:opacity-50"
            >
              {loading ? (
                <span className="loading-dots">Authenticating</span>
              ) : (
                'Access Admin Panel'
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center mt-6"
          >
            <a 
              href="/"
              className="text-cyan-400 hover:text-pink-400 transition-colors retro-subtitle"
            >
              ← Back to Website
            </a>
          </motion.div>

          {/* Demo credentials hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-8 p-4 bg-purple-900/20 border border-purple-500 rounded"
          >
            <p className="text-purple-300 text-sm text-center">
              <span className="retro-subtitle">Demo Credentials:</span><br />
              Username: <span className="text-cyan-400">admin</span><br />
              Password: <span className="text-cyan-400">devcatalyst2025</span>
            </p>
          </motion.div>
          
          {/* Debug info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-4 p-3 bg-gray-900/20 border border-gray-500 rounded"
          >
            <p className="text-gray-400 text-xs text-center">
              API URL: {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}