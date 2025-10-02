import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function AdminTest() {
  const [status, setStatus] = useState('Testing...');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const tests = {};

    try {
      // Test 1: Basic connectivity
      console.log('Testing basic connectivity to:', apiUrl);
      const testResponse = await axios.get(`${apiUrl}/test/`);
      tests.connectivity = { success: true, data: testResponse.data };
      console.log('Basic connectivity test passed');
    } catch (err) {
      tests.connectivity = { success: false, error: err.message };
      console.error('Basic connectivity test failed:', err);
    }

    try {
      // Test 2: Events endpoint
      console.log('Testing events endpoint...');
      const eventsResponse = await axios.get(`${apiUrl}/events/`);
      tests.events = { success: true, count: eventsResponse.data.length };
      console.log('Events endpoint test passed');
    } catch (err) {
      tests.events = { success: false, error: err.message };
      console.error('Events endpoint test failed:', err);
    }

    try {
      // Test 3: Admin login endpoint
      console.log('Testing admin login endpoint...');
      const loginResponse = await axios.post(`${apiUrl}/admin/login/`, {
        username: 'admin',
        password: 'devcatalyst2025'
      });
      tests.adminLogin = { success: true, data: loginResponse.data };
      console.log('Admin login test passed');
    } catch (err) {
      tests.adminLogin = { success: false, error: err.response?.data || err.message };
      console.error('Admin login test failed:', err);
    }

    setResults(tests);
    setStatus('Tests completed');
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Admin Test - DevCatalyst</title>
      </Head>

      <div className="min-h-screen retro-grid scanlines p-6">
        <div className="matrix-bg"></div>
        
        <div className="max-w-4xl mx-auto pt-20">
          <h1 className="retro-title text-4xl neon-text neon-cyan mb-8 text-center">
            Backend Connection Test
          </h1>
          
          <div className="retro-card p-6 mb-6">
            <h2 className="retro-subtitle text-xl neon-green mb-4">Configuration</h2>
            <p className="text-cyan-300">
              <strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}
            </p>
            <p className="text-cyan-300">
              <strong>Status:</strong> {status}
            </p>
          </div>

          {loading ? (
            <div className="retro-card p-6 text-center">
              <div className="loading-dots text-cyan-400 text-xl">Running tests</div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Connectivity Test */}
              <div className="retro-card p-6">
                <h3 className="retro-subtitle text-lg mb-3">
                  🔗 Basic Connectivity
                  <span className={`ml-3 px-2 py-1 text-xs rounded ${
                    results.connectivity?.success 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-red-900/50 text-red-400'
                  }`}>
                    {results.connectivity?.success ? 'PASS' : 'FAIL'}
                  </span>
                </h3>
                <pre className="text-sm text-cyan-300 bg-black/30 p-3 rounded overflow-auto">
                  {JSON.stringify(results.connectivity, null, 2)}
                </pre>
              </div>

              {/* Events Test */}
              <div className="retro-card p-6">
                <h3 className="retro-subtitle text-lg mb-3">
                  📅 Events Endpoint
                  <span className={`ml-3 px-2 py-1 text-xs rounded ${
                    results.events?.success 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-red-900/50 text-red-400'
                  }`}>
                    {results.events?.success ? 'PASS' : 'FAIL'}
                  </span>
                </h3>
                <pre className="text-sm text-cyan-300 bg-black/30 p-3 rounded overflow-auto">
                  {JSON.stringify(results.events, null, 2)}
                </pre>
              </div>

              {/* Admin Login Test */}
              <div className="retro-card p-6">
                <h3 className="retro-subtitle text-lg mb-3">
                  🔐 Admin Login
                  <span className={`ml-3 px-2 py-1 text-xs rounded ${
                    results.adminLogin?.success 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-red-900/50 text-red-400'
                  }`}>
                    {results.adminLogin?.success ? 'PASS' : 'FAIL'}
                  </span>
                </h3>
                <pre className="text-sm text-cyan-300 bg-black/30 p-3 rounded overflow-auto">
                  {JSON.stringify(results.adminLogin, null, 2)}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={testConnection}
                  className="retro-btn border-cyan-500 text-cyan-500"
                >
                  Run Tests Again
                </button>
                <a href="/admin/login" className="retro-btn border-green-500 text-green-500">
                  Go to Login
                </a>
                <a href="/" className="retro-btn border-purple-500 text-purple-500">
                  Back to Home
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}