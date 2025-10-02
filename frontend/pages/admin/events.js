import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

// Reuse AdminLayout from dashboard
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

const EventForm = ({ event, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || '',
    image: event?.image || '',
    location: event?.location || '',
    max_participants: event?.max_participants || 100,
    is_active: event?.is_active !== undefined ? event.is_active : true
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="retro-card p-8 mb-8"
    >
      <h3 className="retro-title text-2xl neon-text neon-green mb-6">
        {isEditing ? 'Edit Event' : 'Create New Event'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block retro-subtitle text-cyan-400 mb-2">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full retro-input"
              placeholder="Enter event title"
              required
            />
          </div>
          
          <div>
            <label className="block retro-subtitle text-cyan-400 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full retro-input"
              required
            />
          </div>
          
          <div>
            <label className="block retro-subtitle text-cyan-400 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full retro-input"
              placeholder="Event location"
            />
          </div>
          
          <div>
            <label className="block retro-subtitle text-cyan-400 mb-2">Max Participants</label>
            <input
              type="number"
              name="max_participants"
              value={formData.max_participants}
              onChange={handleChange}
              className="w-full retro-input"
              min="1"
            />
          </div>
        </div>
        
        <div>
          <label className="block retro-subtitle text-cyan-400 mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full retro-input"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div>
          <label className="block retro-subtitle text-cyan-400 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full retro-input resize-none"
            rows="4"
            placeholder="Event description"
            required
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="retro-subtitle text-cyan-400">Active Event</label>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="retro-btn border-green-500 text-green-500 disabled:opacity-50"
          >
            {loading ? (
              <span className="loading-dots">{isEditing ? 'Updating' : 'Creating'}</span>
            ) : (
              isEditing ? 'Update Event' : 'Create Event'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="retro-btn border-red-500 text-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      
      const response = await axios.get(`${apiUrl}/events/`, {
        headers: { Authorization: `Token ${token}` }
      });
      
      setEvents(response.data);
    } catch (err) {
      setError('Failed to load events');
      console.error('Events error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEvent = async (eventData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      
      if (editingEvent) {
        // Update existing event
        await axios.put(`${apiUrl}/events/${editingEvent.id}/`, eventData, {
          headers: { Authorization: `Token ${token}` }
        });
      } else {
        // Create new event
        await axios.post(`${apiUrl}/events/`, eventData, {
          headers: { Authorization: `Token ${token}` }
        });
      }
      
      setShowForm(false);
      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      setError('Failed to save event');
      console.error('Save event error:', err);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      
      await axios.delete(`${apiUrl}/events/${eventId}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      
      fetchEvents();
    } catch (err) {
      setError('Failed to delete event');
      console.error('Delete event error:', err);
    }
  };

  return (
    <AdminLayout title="Events Management">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="retro-title text-4xl md:text-6xl neon-text neon-green"
          >
            Events Management
          </motion.h1>
          
          <button
            onClick={() => {
              setShowForm(true);
              setEditingEvent(null);
            }}
            className="retro-btn border-cyan-500 text-cyan-500"
          >
            Create New Event
          </button>
        </div>

        {error && (
          <div className="retro-card p-4 mb-6 border-red-500">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {showForm && (
          <EventForm
            event={editingEvent}
            onSave={handleSaveEvent}
            onCancel={() => {
              setShowForm(false);
              setEditingEvent(null);
            }}
            isEditing={!!editingEvent}
          />
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="loading-dots text-cyan-400 text-xl">Loading events</div>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="retro-card p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="retro-subtitle text-xl neon-cyan">{event.title}</h3>
                      <span className={`px-3 py-1 text-xs rounded ${
                        event.is_active 
                          ? 'bg-green-900/50 text-green-400 border border-green-500' 
                          : 'bg-red-900/50 text-red-400 border border-red-500'
                      }`}>
                        {event.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-cyan-300 mb-2">{event.description}</p>
                    <div className="text-sm text-gray-400 space-y-1">
                      <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                      {event.location && <p>📍 {event.location}</p>}
                      <p>👥 {event.registration_count}/{event.max_participants} registered</p>
                    </div>
                  </div>
                  
                  {event.image && (
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-24 h-24 object-cover rounded border border-cyan-400 ml-4"
                    />
                  )}
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => {
                      setEditingEvent(event);
                      setShowForm(true);
                    }}
                    className="retro-btn text-sm px-4 py-2 border-yellow-500 text-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="retro-btn text-sm px-4 py-2 border-red-500 text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
            
            {events.length === 0 && (
              <div className="text-center py-12">
                <p className="text-cyan-300 text-xl">No events found</p>
                <p className="text-gray-400 mt-2">Create your first event to get started!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}