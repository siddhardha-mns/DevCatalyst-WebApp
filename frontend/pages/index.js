import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex space-x-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="retro-card p-4 bg-gray-900 border-2 border-cyan-400">
            <div className="stats-counter neon-cyan">{value.toString().padStart(2, '0')}</div>
            <div className="text-sm retro-subtitle uppercase text-cyan-300">{unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const StatCard = ({ number, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="retro-card p-6 text-center pulse-neon"
  >
    <div className="stats-counter neon-green mb-2">{number}</div>
    <div className="retro-subtitle text-cyan-300">{label}</div>
  </motion.div>
);

const TeamMember = ({ name, role, avatar, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="retro-card p-6 text-center floating"
  >
    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center text-2xl font-bold retro-title">
      {avatar}
    </div>
    <h3 className="retro-subtitle neon-cyan mb-2">{name}</h3>
    <p className="text-cyan-300 text-sm">{role}</p>
  </motion.div>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nextEventDate = new Date('2025-12-15T10:00:00').getTime();

  return (
    <>
      <Head>
        <title>DevCatalyst - Fueling the Next Generation of Developers</title>
        <meta name="description" content="DevCatalyst Tech Club - Join our community of passionate developers" />
      </Head>

      <div className="min-h-screen retro-grid scanlines">
        {/* Matrix Background Effect */}
        <div className="matrix-bg"></div>

        {/* Navigation */}
        <nav className="retro-nav fixed w-full top-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="retro-title text-2xl neon-text neon-cyan glitch"
              data-text="DevCatalyst"
            >
              DevCatalyst
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'Events', 'About', 'Projects', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={item === 'Events' ? '/events' : `#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="retro-subtitle text-cyan-400 hover:text-pink-400 transition-colors duration-300 neon-text"
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="/admin/login"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="retro-subtitle text-orange-400 hover:text-yellow-400 transition-colors duration-300 neon-text"
              >
                Admin
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden retro-btn px-4 py-2"
            >
              MENU
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden mt-4 retro-card p-4"
            >
              {['Home', 'Events', 'About', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={item === 'Events' ? '/events' : `#${item.toLowerCase()}`}
                  className="block py-2 retro-subtitle text-cyan-400 hover:text-pink-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="/admin/login"
                className="block py-2 retro-subtitle text-orange-400 hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </a>
            </motion.div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 text-center">
          <div className="max-w-6xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="retro-title text-6xl md:text-8xl mb-6 neon-text neon-cyan glitch"
              data-text="DevCatalyst"
            >
              DevCatalyst
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="retro-subtitle text-2xl md:text-4xl mb-8 neon-pink"
            >
              Fueling the Next Generation of Developers
            </motion.h2>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <StatCard number="500+" label="Members" delay={0.8} />
              <StatCard number="25+" label="Events" delay={1.0} />
              <StatCard number="40+" label="Projects" delay={1.2} />
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
            >
              <button className="retro-btn neon-cyan">
                Explore Our Community
              </button>
              <Link href="/events">
                <button className="retro-btn border-pink-500 text-pink-500 hover:text-pink-500">
                  See Upcoming Events
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Community Highlights */}
        <section id="highlights" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="retro-title text-4xl md:text-6xl mb-12 text-center neon-text neon-purple"
            >
              Community Highlights
            </motion.h2>
            
            <div className="text-center mb-12">
              <p className="retro-subtitle text-xl text-cyan-300 mb-8">
                Stay updated with the latest events, achievements, and announcements from our growing developer community.
              </p>
            </div>

            {/* Achievement Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="retro-card p-8 mb-12 relative overflow-hidden"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-4xl">🏆</div>
                <div>
                  <span className="retro-btn text-sm px-3 py-1 border-yellow-500 text-yellow-500">ACHIEVEMENT</span>
                  <p className="text-cyan-300 mt-2">Jan 10, 2025</p>
                </div>
              </div>
              <h3 className="retro-subtitle text-2xl neon-green mb-4">Community Reaches 500+ Members</h3>
              <p className="text-cyan-300 text-lg">
                Dev Catalyst community has grown to over 500 active members across all platforms!
              </p>
            </motion.div>

            {/* Countdown Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="retro-card p-8 text-center"
            >
              <h3 className="retro-subtitle text-2xl neon-orange mb-2">Next: React.js Workshop</h3>
              <p className="text-cyan-300 mb-8">Countdown to the next upcoming event.</p>
              <CountdownTimer targetDate={nextEventDate} />
              <button className="retro-btn mt-6 border-orange-500 text-orange-500">View Details</button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="retro-title text-4xl md:text-6xl mb-12 text-center neon-text neon-green"
            >
              About DevCatalyst
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="retro-card p-8 mb-12"
            >
              <p className="text-xl text-cyan-300 text-center leading-relaxed">
                DevCatalyst is a student-led developer community focused on learning-by-building. 
                We bring together curious minds to explore modern technologies, collaborate on real projects, 
                and become industry-ready through practice, mentorship, and events.
              </p>
            </motion.div>

            {/* What We Are, Why Join, Activities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="retro-card p-6"
              >
                <h3 className="retro-subtitle text-xl neon-cyan mb-4">What We Are</h3>
                <p className="text-cyan-300">
                  A welcoming space for developers of all levels—beginners to advanced—to learn, 
                  experiment, and ship ideas together across web, mobile, AI/ML, and cloud.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="retro-card p-6"
              >
                <h3 className="retro-subtitle text-xl neon-pink mb-4">Why Join</h3>
                <ul className="text-cyan-300 space-y-2">
                  <li>• Hands-on workshops and guided learning paths</li>
                  <li>• Real project experience for your portfolio</li>
                  <li>• Mentorship from peers, seniors, and industry guests</li>
                  <li>• Networking, internships, and referral opportunities</li>
                  <li>• Teamwork, leadership, and public speaking practice</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="retro-card p-6"
              >
                <h3 className="retro-subtitle text-xl neon-green mb-4">Activities</h3>
                <ul className="text-cyan-300 space-y-2">
                  <li>• Weekly workshops and code-alongs</li>
                  <li>• Hackathons, coding challenges, and demo days</li>
                  <li>• Speaker sessions and tech talks</li>
                  <li>• Open-source sprints and study groups</li>
                  <li>• Community projects with real users</li>
                </ul>
              </motion.div>
            </div>

            {/* Team Section */}
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="retro-title text-3xl md:text-5xl mb-12 text-center neon-text neon-purple"
            >
              Meet Our Team
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <TeamMember name="Divyansh Teja Edla" role="President" avatar="D" delay={0.1} />
              <TeamMember name="Dhruv Gannaram" role="Vice President" avatar="DG" delay={0.2} />
              <TeamMember name="Parimitha" role="Event Planner" avatar="P" delay={0.3} />
              <TeamMember name="Hemaditya Kalakota" role="Technical Lead" avatar="HK" delay={0.4} />
            </div>

            <div className="text-center">
              <button className="retro-btn border-purple-500 text-purple-500">Join our community</button>
              <p className="text-cyan-300 mt-4">Connect to us on our Socials.</p>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="retro-title text-4xl md:text-6xl mb-12 text-center neon-text neon-orange"
            >
              Get Started in 3 Steps
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Join the Community',
                  description: 'Hop into Discord/WhatsApp for updates and support.'
                },
                {
                  step: '02',
                  title: 'Attend a Workshop',
                  description: 'Pick a beginner-friendly session this month.'
                },
                {
                  step: '03',
                  title: 'Build a Project',
                  description: 'Team up and ship something real for your portfolio.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="retro-card p-8 text-center"
                >
                  <div className="retro-title text-6xl neon-orange mb-4">{item.step}</div>
                  <h3 className="retro-subtitle text-xl neon-cyan mb-4">{item.title}</h3>
                  <p className="text-cyan-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="retro-title text-4xl md:text-6xl mb-12 text-center neon-text neon-pink"
            >
              Get In Touch
            </motion.h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="retro-card p-8"
              >
                <h3 className="retro-subtitle text-2xl neon-green mb-6">Send Message</h3>
                
                <form className="space-y-6">
                  <div>
                    <label className="block retro-subtitle text-cyan-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full retro-input"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block retro-subtitle text-cyan-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full retro-input"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block retro-subtitle text-cyan-400 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      className="w-full retro-input resize-none"
                      placeholder="Tell us what you're interested in..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full retro-btn border-cyan-400 text-cyan-400"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="retro-card p-8">
                  <h3 className="retro-subtitle text-xl neon-cyan mb-6">Contact Info</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">📧</span>
                      <div>
                        <div className="retro-subtitle text-cyan-400">Email</div>
                        <div className="text-cyan-300">devcatalyst.2025@gmail.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">📍</span>
                      <div>
                        <div className="retro-subtitle text-cyan-400">Location</div>
                        <div className="text-cyan-300">Matrusri Engineering College<br />Hyderabad, Telangana, 500059</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="retro-card p-8">
                  <h3 className="retro-subtitle text-xl neon-orange mb-6">Social</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button className="retro-btn border-blue-500 text-blue-500 text-sm">
                      Instagram
                    </button>
                    <button className="retro-btn border-cyan-500 text-cyan-500 text-sm">
                      Twitter (X)
                    </button>
                    <button className="retro-btn border-blue-600 text-blue-600 text-sm">
                      LinkedIn
                    </button>
                    <button className="retro-btn border-purple-500 text-purple-500 text-sm">
                      Discord
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-cyan-400 retro-grid">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="retro-subtitle text-xl neon-cyan mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-cyan-300 hover:text-pink-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">Our Team</a></li>
                <li><a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">Blog</a></li>
                <li><a href="#contact" className="text-cyan-300 hover:text-pink-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="retro-subtitle text-xl neon-pink mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><Link href="/events" className="text-cyan-300 hover:text-pink-400 transition-colors">Events</Link></li>
                <li><a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">Workshops</a></li>
                <li><a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">Projects</a></li>
                <li><a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">Hackathons</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="retro-subtitle text-xl neon-green mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">Roadmaps</a></li>
                <li><a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">Guides</a></li>
                <li><a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="retro-subtitle text-xl neon-purple mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors">Code of Conduct</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-cyan-400 mt-8 pt-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="retro-title text-2xl neon-text neon-cyan glitch mb-4"
              data-text="DevCatalyst"
            >
              DevCatalyst
            </motion.div>
            <p className="text-cyan-300">
              © 2025 DevCatalyst. All rights reserved. 
              <span className="neon-text neon-pink">Fueling the Next Generation of Developers</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
