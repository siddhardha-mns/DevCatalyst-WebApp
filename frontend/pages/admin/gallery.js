import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

// Reuse AdminLayout
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

const GalleryForm = ({ galleryItem, events, onSave, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: galleryItem?.title || '',
    description: galleryItem?.description || '',
    image: galleryItem?.image || '',
    event: galleryItem?.event || '',
    is_featured: galleryItem?.is_featured || false
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
      <h3 className="retro-title text-2xl neon-text neon-purple mb-6">
        {isEditing ? 'Edit Gallery Item' : 'Add New Gallery Item'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block retro-subtitle text-cyan-400 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full retro-input"
              placeholder="Enter image title"
              required
            />
          </div>
          
          <div>
            <label className="block retro-subtitle text-cyan-400 mb-2">Related Event</label>
            <select
              name="event"
              value={formData.event}
              onChange={handleChange}
              className="w-full retro-input"
            >
              <option value="">No Event (General Gallery)</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
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
            required
          />
          {formData.image && (
            <div className="mt-4">
              <img 
                src={formData.image} 
                alt="Preview"
                className="w-32 h-32 object-cover rounded border border-cyan-400"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
        
        <div>
          <label className="block retro-subtitle text-cyan-400 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full retro-input resize-none"
            rows="3"
            placeholder="Image description (optional)"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="retro-subtitle text-cyan-400">Featured Image</label>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="retro-btn border-purple-500 text-purple-500 disabled:opacity-50"
          >
            {loading ? (
              <span className="loading-dots">{isEditing ? 'Updating' : 'Adding'}</span>
            ) : (
              isEditing ? 'Update Image' : 'Add to Gallery'
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

export default function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      
      const [galleryResponse, eventsResponse] = await Promise.all([
        axios.get(`${apiUrl}/gallery/`, {
          headers: { Authorization: `Token ${token}` }
        }),
        axios.get(`${apiUrl}/events/`, {
          headers: { Authorization: `Token ${token}` }
        })
      ]);
      
      setGalleryItems(galleryResponse.data);
      setEvents(eventsResponse.data);
    } catch (err) {
      setError('Failed to load gallery data');
      console.error('Gallery error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItem = async (itemData) => {
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      
      // Convert empty string to null for event field
      const dataToSend = {
        ...itemData,
        event: itemData.event || null
      };
      
      if (editingItem) {
        // Update existing item
        await axios.put(`${apiUrl}/gallery/${editingItem.id}/`, dataToSend, {
          headers: { Authorization: `Token ${token}` }
        });
      } else {
        // Create new item
        await axios.post(`${apiUrl}/gallery/`, dataToSend, {
          headers: { Authorization: `Token ${token}` }
        });
      }
      
      setShowForm(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      setError('Failed to save gallery item');
      console.error('Save gallery error:', err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      
      await axios.delete(`${apiUrl}/gallery/${itemId}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      
      fetchData();
    } catch (err) {
      setError('Failed to delete gallery item');
      console.error('Delete gallery error:', err);
    }
  };

  return (
    <AdminLayout title="Gallery Management">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="retro-title text-4xl md:text-6xl neon-text neon-purple"
          >
            Gallery Management
          </motion.h1>
          
          <button
            onClick={() => {
              setShowForm(true);
              setEditingItem(null);
            }}
            className="retro-btn border-cyan-500 text-cyan-500"
          >
            Add New Image
          </button>
        </div>

        {error && (
          <div className="retro-card p-4 mb-6 border-red-500">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {showForm && (
          <GalleryForm
            galleryItem={editingItem}
            events={events}
            onSave={handleSaveItem}
            onCancel={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            isEditing={!!editingItem}
          />
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="loading-dots text-cyan-400 text-xl">Loading gallery</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="retro-card p-4 floating"
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded border border-cyan-400 mb-4"
                  />
                  {item.is_featured && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 text-xs rounded">
                      Featured
                    </div>
                  )}
                </div>
                
                <h3 className="retro-subtitle text-lg neon-cyan mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-cyan-300 text-sm mb-2 line-clamp-2">{item.description}</p>
                )}
                {item.event_title && (
                  <p className="text-purple-400 text-sm mb-3">📅 {item.event_title}</p>
                )}
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setShowForm(true);
                    }}
                    className="retro-btn text-xs px-3 py-1 border-yellow-500 text-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="retro-btn text-xs px-3 py-1 border-red-500 text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
            
            {galleryItems.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-cyan-300 text-xl">No gallery items found</p>
                <p className="text-gray-400 mt-2">Add your first image to get started!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}