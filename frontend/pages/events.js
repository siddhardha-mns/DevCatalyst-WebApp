import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

const EventCard = ({ event, onRegister, index }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    setIsRegistering(true);
    await onRegister(event.id);
    setIsRegistering(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="retro-card p-8 floating hover:scale-105 transition-transform duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="retro-btn text-xs px-3 py-1 border-cyan-400 text-cyan-400">
          {new Date(event.date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}
        </div>
        <div className="text-2xl">🚀</div>
      </div>
      
      <h2 className="retro-title text-2xl md:text-3xl neon-text neon-cyan mb-4 glitch" data-text={event.title}>
        {event.title}
      </h2>
      
      <p className="text-cyan-300 text-lg mb-6 leading-relaxed">
        {event.description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={handleRegister}
          disabled={isRegistering}
          className="retro-btn flex-1 border-pink-500 text-pink-500 hover:text-pink-500 disabled:opacity-50"
        >
          {isRegistering ? (
            <span className="loading-dots">Registering</span>
          ) : (
            'Register Now'
          )}
        </button>
        <button className="retro-btn border-green-500 text-green-500">
          View Details
        </button>
      </div>
    </motion.div>
  );
};

const UpcomingEvent = ({ title, date, description, type, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="retro-card p-6 mb-6"
  >
    <div className="flex items-center space-x-4 mb-3">
      <div className="retro-btn text-xs px-3 py-1 border-purple-500 text-purple-500">
        {date}
      </div>
      <div className="text-2xl">
        {type === 'workshop' ? '💻' : type === 'hackathon' ? '⚡' : '🤖'}
      </div>
    </div>
    
    <h3 className="retro-subtitle text-xl neon-purple mb-3">{title}</h3>
    <p className="text-cyan-300 mb-4">{description}</p>
    
    <div className="flex space-x-3">
      <button className="retro-btn text-sm px-4 py-2 border-orange-500 text-orange-500">
        {type === 'workshop' ? 'Register Now' : type === 'hackathon' ? 'Join Hackathon' : 'Sign Up'}
      </button>
    </div>
  </motion.div>
);

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      const response = await axios.get(`${apiUrl}/events/`);
      setEvents(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const registerEvent = async (eventId) => {
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");
    
    if (!name || !email) {
      alert('Registration cancelled. Please provide both name and email.');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
      await axios.post(`${apiUrl}/register/`, {
        event: eventId,
        name,
        email
      });
      alert("🎉 Registration successful! Welcome to the event!");
    } catch (error) {
      console.error('Registration error:', error);
      alert('⚠️ Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Events - DevCatalyst Tech Club</title>
        <meta name="description" content="Join our upcoming events and workshops" />
      </Head>

      <div className="min-h-screen retro-grid scanlines">
        <div className="matrix-bg"></div>

        {/* Navigation */}
        <nav className="retro-nav fixed w-full top-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/">
              <div className="retro-title text-2xl neon-text neon-cyan glitch cursor-pointer" data-text="DevCatalyst">
                DevCatalyst
              </div>
            </Link>
            
            <div className="flex space-x-6">
              <Link href="/">
                <span className="retro-subtitle text-cyan-400 hover:text-pink-400 transition-colors cursor-pointer">
                  Home
                </span>
              </Link>
              <span className="retro-subtitle text-pink-400 neon-text">
                Events
              </span>
            </div>
          </div>
        </nav>

        {/* Header Section */}
        <section className="pt-32 pb-12 px-6 text-center">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="retro-title text-5xl md:text-7xl mb-6 neon-text neon-green glitch"
              data-text="Events Hub"
            >
              Events Hub
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="retro-subtitle text-xl md:text-2xl text-cyan-300 mb-8"
            >
              Join our community events and level up your skills
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              onClick={fetchEvents}
              className="retro-btn border-cyan-400 text-cyan-400"
            >
              Refresh Events
            </motion.button>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Events */}
            <div className="lg:col-span-2">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="retro-title text-3xl md:text-4xl mb-8 neon-text neon-cyan"
              >
                Available Events
              </motion.h2>

              {loading && (
                <div className="retro-card p-8 text-center">
                  <div className="retro-subtitle text-xl neon-purple loading-dots">
                    Loading events
                  </div>
                </div>
              )}

              {error && (
                <div className="retro-card p-8 text-center">
                  <div className="retro-subtitle text-xl neon-pink mb-4">⚠️ Error</div>
                  <p className="text-cyan-300 mb-4">{error}</p>
                  <button onClick={fetchEvents} className="retro-btn border-pink-500 text-pink-500">
                    Retry
                  </button>
                </div>
              )}

              {!loading && !error && events.length === 0 && (
                <div className="retro-card p-8 text-center">
                  <div className="retro-subtitle text-xl neon-orange mb-4">📋 No Events</div>
                  <p className="text-cyan-300">No events available at the moment. Check back soon!</p>
                </div>
              )}

              <div className="space-y-8">
                {events.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onRegister={registerEvent}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.h2
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="retro-title text-2xl md:text-3xl mb-8 neon-text neon-purple"
              >
                Upcoming Events
              </motion.h2>

              <div className="space-y-6">
                <UpcomingEvent
                  title="React.js Workshop"
                  date="Dec 15, 2025"
                  description="Learn the fundamentals of React.js and build your first interactive web application. Perfect for beginners!"
                  type="workshop"
                  delay={0.4}
                />
                <UpcomingEvent
                  title="Winter Hackathon 2025"
                  date="Dec 20, 2025"
                  description="48-hour coding marathon! Team up with fellow developers and build innovative solutions for real-world problems."
                  type="hackathon"
                  delay={0.6}
                />
                <UpcomingEvent
                  title="AI/ML Bootcamp"
                  date="Jan 5, 2026"
                  description="Dive into the world of Artificial Intelligence and Machine Learning with hands-on projects and industry experts."
                  type="bootcamp"
                  delay={0.8}
                />
              </div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="retro-card p-6 mt-8"
              >
                <h3 className="retro-subtitle text-xl neon-green mb-4">Get In Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400">📧</span>
                    <span className="text-cyan-300">devcatalyst.2025@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400">📍</span>
                    <span className="text-cyan-300">Matrusri Engineering College</span>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button className="retro-btn text-xs px-3 py-2 border-blue-500 text-blue-500">
                    Discord
                  </button>
                  <button className="retro-btn text-xs px-3 py-2 border-green-500 text-green-500">
                    WhatsApp
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
