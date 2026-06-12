import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../services/api';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService.getAll().then(res => {
      setEvents(res.data.slice(0, 6));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
        <div className="text-center text-white max-w-2xl">
          <h1 className="text-6xl font-bold mb-4">Welcome to EventHub</h1>
          <p className="text-xl mb-8">Discover events, find catering services, explore jobs, and stay updated with the latest news</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/events" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Explore Events
            </Link>
            <Link to="/businesses" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition">
              Find Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <Link key={event._id} to={`/events/${event._id}`}>
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-40 flex items-center justify-center">
                  <span className="text-white text-4xl">{event.category.charAt(0).toUpperCase()}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{event.description.substring(0, 60)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-600 font-bold">${event.price}</span>
                    <span className="text-gray-500 text-sm">{event.location.city}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Events', icon: '🎉', desc: 'Register for your favorite events' },
              { title: 'Catering', icon: '🍽️', desc: 'Find perfect catering services' },
              { title: 'Jobs', icon: '💼', desc: 'Explore job opportunities' },
              { title: 'News', icon: '📰', desc: 'Stay updated with latest news' }
            ].map((service, idx) => (
              <div key={idx} className="text-center p-6 rounded-xl hover:bg-gray-50 transition">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
