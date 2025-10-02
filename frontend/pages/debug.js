import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import axios from 'axios';

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState({
    environment: '',
    apiUrl: '',
    frontendUrl: '',
    backendStatus: 'Checking...',
    backendResponse: null,
    corsTest: 'Checking...',
    adminEndpoint: 'Checking...',
    timestamp: new Date().toISOString()
  });

  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const addTestResult = (test, status, details) => {
    setTestResults(prev => [...prev, {
      test,
      status,
      details,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const runDiagnostics = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
    const frontendUrl = typeof window !== 'undefined' ? window.location.origin : 'N/A';
    
    setDebugInfo(prev => ({
      ...prev,
      environment: process.env.NODE_ENV || 'development',
      apiUrl,
      frontendUrl
    }));

    addTestResult('Environment Detection', 'INFO', {
      nodeEnv: process.env.NODE_ENV,
      apiUrl,
      frontendUrl,
      isProduction: process.env.NODE_ENV === 'production'
    });

    // Test 1: Basic Backend Connectivity
    try {
      addTestResult('Backend Connectivity', 'TESTING', 'Attempting to connect...');
      
      const response = await axios.get(`${apiUrl}/test/`, {
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      setDebugInfo(prev => ({
        ...prev,
        backendStatus: 'Online ✅',
        backendResponse: response.data
      }));
      
      addTestResult('Backend Connectivity', 'PASS', {
        status: response.status,
        data: response.data,
        responseTime: `${Date.now()}ms`
      });
      
    } catch (error) {
      setDebugInfo(prev => ({
        ...prev,
        backendStatus: 'Failed ❌',
        backendResponse: error.message
      }));
      
      addTestResult('Backend Connectivity', 'FAIL', {
        error: error.message,
        code: error.code,
        status: error.response?.status,
        responseData: error.response?.data
      });
    }

    // Test 2: CORS Test
    try {
      addTestResult('CORS Configuration', 'TESTING', 'Testing cross-origin requests...');
      
      const corsResponse = await fetch(`${apiUrl}/test/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (corsResponse.ok) {
        setDebugInfo(prev => ({ ...prev, corsTest: 'CORS Working ✅' }));
        addTestResult('CORS Configuration', 'PASS', {
          status: corsResponse.status,
          headers: Object.fromEntries(corsResponse.headers.entries())
        });
      } else {
        throw new Error(`HTTP ${corsResponse.status}`);
      }
      
    } catch (error) {
      setDebugInfo(prev => ({ ...prev, corsTest: 'CORS Failed ❌' }));
      addTestResult('CORS Configuration', 'FAIL', {
        error: error.message,
        suggestion: 'Check CORS_ALLOWED_ORIGINS in backend settings'
      });
    }

    // Test 3: Admin Endpoint
    try {
      addTestResult('Admin Endpoint', 'TESTING', 'Testing admin login endpoint...');
      
      const adminResponse = await axios.post(`${apiUrl}/admin/login/`, {
        username: 'test',
        password: 'test'
      }, {
        timeout: 5000,
        validateStatus: (status) => status < 500 // Accept 4xx as valid responses
      });
      
      setDebugInfo(prev => ({ ...prev, adminEndpoint: 'Admin Endpoint Available ✅' }));
      addTestResult('Admin Endpoint', 'PASS', {
        status: adminResponse.status,
        endpoint: 'Login endpoint responding correctly'
      });
      
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 401) {
        // These are expected for invalid credentials
        setDebugInfo(prev => ({ ...prev, adminEndpoint: 'Admin Endpoint Available ✅' }));
        addTestResult('Admin Endpoint', 'PASS', {
          status: error.response.status,
          note: 'Endpoint responding (invalid credentials expected)'
        });
      } else {
        setDebugInfo(prev => ({ ...prev, adminEndpoint: 'Admin Endpoint Failed ❌' }));
        addTestResult('Admin Endpoint', 'FAIL', {
          error: error.message,
          status: error.response?.status
        });
      }
    }
  };

  const testConnection = async () => {
    setTestResults([]);
    await runDiagnostics();
  };

  const copyDebugInfo = () => {
    const debugText = JSON.stringify({
      debugInfo,
      testResults,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    }, null, 2);
    
    navigator.clipboard.writeText(debugText);
    alert('Debug information copied to clipboard!');
  };

  return (
    <>
      <Head>
        <title>Production Debug - DevCatalyst</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen retro-grid scanlines px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="retro-title text-4xl md:text-6xl neon-text neon-cyan mb-8 text-center"
          >
            🔍 Production Debug Center
          </motion.h1>

          {/* Quick Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="retro-card p-4 text-center">
              <div className="text-2xl mb-2">🌍</div>
              <div className="retro-subtitle text-cyan-400">Environment</div>
              <div className="text-green-400">{debugInfo.environment}</div>
            </div>

            <div className="retro-card p-4 text-center">
              <div className="text-2xl mb-2">🔗</div>
              <div className="retro-subtitle text-cyan-400">Backend</div>
              <div className={debugInfo.backendStatus.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                {debugInfo.backendStatus}
              </div>
            </div>

            <div className="retro-card p-4 text-center">
              <div className="text-2xl mb-2">🌐</div>
              <div className="retro-subtitle text-cyan-400">CORS</div>
              <div className={debugInfo.corsTest.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                {debugInfo.corsTest}
              </div>
            </div>

            <div className="retro-card p-4 text-center">
              <div className="text-2xl mb-2">👤</div>
              <div className="retro-subtitle text-cyan-400">Admin</div>
              <div className={debugInfo.adminEndpoint.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                {debugInfo.adminEndpoint}
              </div>
            </div>
          </div>

          {/* Configuration Details */}
          <div className="retro-card p-6 mb-8">
            <h2 className="retro-subtitle text-2xl neon-green mb-4">📋 Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-cyan-400">API URL:</strong>
                <div className="text-green-400 break-all">{debugInfo.apiUrl}</div>
              </div>
              <div>
                <strong className="text-cyan-400">Frontend URL:</strong>
                <div className="text-green-400 break-all">{debugInfo.frontendUrl}</div>
              </div>
              <div>
                <strong className="text-cyan-400">Environment:</strong>
                <div className="text-green-400">{debugInfo.environment}</div>
              </div>
              <div>
                <strong className="text-cyan-400">Timestamp:</strong>
                <div className="text-green-400">{debugInfo.timestamp}</div>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="retro-card p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="retro-subtitle text-2xl neon-purple">🧪 Test Results</h2>
              <button
                onClick={testConnection}
                className="retro-btn border-purple-500 text-purple-500 px-4 py-2 text-sm"
              >
                🔄 Rerun Tests
              </button>
            </div>

            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="border border-cyan-800 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="retro-subtitle text-cyan-400">{result.test}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      result.status === 'PASS' ? 'bg-green-900 text-green-400' :
                      result.status === 'FAIL' ? 'bg-red-900 text-red-400' :
                      result.status === 'TESTING' ? 'bg-yellow-900 text-yellow-400' :
                      'bg-blue-900 text-blue-400'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    <strong>Time:</strong> {result.timestamp}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(result.details, null, 2)}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={copyDebugInfo}
              className="retro-btn border-cyan-500 text-cyan-500 px-6 py-3"
            >
              📋 Copy Debug Info
            </button>
            <a
              href="/admin/login"
              className="retro-btn border-green-500 text-green-500 px-6 py-3"
            >
              🔐 Go to Admin Login
            </a>
            <a
              href="/"
              className="retro-btn border-orange-500 text-orange-500 px-6 py-3"
            >
              🏠 Back to Home
            </a>
          </div>

          {/* Help Section */}
          <div className="retro-card p-6 mt-8">
            <h2 className="retro-subtitle text-2xl neon-orange mb-4">🆘 Common Solutions</h2>
            <div className="space-y-4 text-sm">
              <div>
                <strong className="text-red-400">If Backend is Offline:</strong>
                <ul className="list-disc list-inside text-gray-300 ml-4">
                  <li>Check Railway deployment status</li>
                  <li>Verify Railway app isn't sleeping (upgrade to paid plan)</li>
                  <li>Check Railway logs for errors</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-400">If CORS Failed:</strong>
                <ul className="list-disc list-inside text-gray-300 ml-4">
                  <li>Add your frontend domain to CORS_ALLOWED_ORIGINS in Railway</li>
                  <li>Ensure domain format matches exactly (https://your-app.vercel.app)</li>
                </ul>
              </div>
              <div>
                <strong className="text-red-400">If Wrong API URL:</strong>
                <ul className="list-disc list-inside text-gray-300 ml-4">
                  <li>Update NEXT_PUBLIC_API_URL in Vercel environment variables</li>
                  <li>Redeploy frontend after updating environment variables</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}