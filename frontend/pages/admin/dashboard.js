import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

const AdminLayout = ({ children, title = "Admin Dashboard" }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      
      await axios.post(`${apiUrl}/admin/logout/`, {}, {
        headers: { Authorization: `Token ${token}` }
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      router.push('/admin/login');
    }
  };

  if (!user) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="loading-dots text-cyan-400 text-xl">Loading</div>
    </div>;
  }

  return (
    <>
      <Head>
        <title>{title} - DevCatalyst Admin</title>
      </Head>
      
      <div className="min-h-screen retro-grid scanlines">
        <div className="matrix-bg"></div>
        
        {/* Admin Navigation */}
        <nav className="retro-nav fixed w-full top-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="retro-title text-2xl neon-text neon-purple glitch" data-text="Admin Panel">
              Admin Panel
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-cyan-400">Welcome, {user.first_name || user.username}</span>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="retro-btn text-sm px-4 py-2 border-cyan-400 text-cyan-400"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push('/admin/events')}
                className="retro-btn text-sm px-4 py-2 border-green-500 text-green-500"
              >
                Events
              </button>
              <button
                onClick={() => router.push('/admin/gallery')}
                className="retro-btn text-sm px-4 py-2 border-purple-500 text-purple-500"
              >
                Gallery
              </button>
              <button
                onClick={handleLogout}
                className="retro-btn text-sm px-4 py-2 border-red-500 text-red-500"
              >
                Logout
              </button>
              <a
                href="/"
                className="retro-btn text-sm px-4 py-2 border-orange-500 text-orange-500"
              >
                View Site
              </a>
            </div>
          </div>
        </nav>
        
        <div className="pt-20">
          {children}
        </div>
      </div>
    </>
  );
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      
      const response = await axios.get(`${apiUrl}/admin/dashboard/`, {
        headers: { Authorization: `Token ${token}` }
      });
      
      setDashboardData(response.data.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Dashboard">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="retro-title text-4xl md:text-6xl neon-text neon-cyan mb-8"
        >
          Admin Dashboard
        </motion.h1>

        {loading && (
          <div className="text-center py-12">
            <div className="loading-dots text-cyan-400 text-xl">Loading dashboard</div>
          </div>
        )}

        {error && (
          <div className="retro-card p-6 mb-8 border-red-500">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {dashboardData && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="retro-card p-6 text-center pulse-neon"
              >
                <div className="stats-counter neon-green mb-2">{dashboardData.total_events}</div>
                <div className="retro-subtitle text-cyan-300">Total Events</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="retro-card p-6 text-center pulse-neon"
              >
                <div className="stats-counter neon-cyan mb-2">{dashboardData.active_events}</div>
                <div className="retro-subtitle text-cyan-300">Active Events</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="retro-card p-6 text-center pulse-neon"
              >
                <div className="stats-counter neon-purple mb-2">{dashboardData.total_registrations}</div>
                <div className="retro-subtitle text-cyan-300">Registrations</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="retro-card p-6 text-center pulse-neon"
              >
                <div className="stats-counter neon-orange mb-2">{dashboardData.total_gallery_images}</div>
                <div className="retro-subtitle text-cyan-300">Gallery Images</div>
              </motion.div>
            </div>

            {/* Recent Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="retro-card p-8 mb-8"
            >
              <h2 className="retro-title text-2xl neon-text neon-green mb-6">Recent Events</h2>
              <div className="space-y-4">
                {dashboardData.recent_events.map((event, index) => (
                  <div key={event.id} className="border-l-4 border-cyan-400 pl-4 py-2">
                    <h3 className="retro-subtitle text-cyan-300">{event.title}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(event.date).toLocaleDateString()} • {event.registration_count} registrations
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Registrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="retro-card p-8"
            >
              <h2 className="retro-title text-2xl neon-text neon-purple mb-6">Recent Registrations</h2>
              <div className="space-y-3">
                {dashboardData.recent_registrations.map((registration, index) => (
                  <div key={registration.id} className="flex justify-between items-center py-2 border-b border-cyan-800">
                    <div>
                      <span className="text-cyan-300">{registration.name}</span>
                      <span className="text-gray-400 ml-2">({registration.email})</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {registration.event_title}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}