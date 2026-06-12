import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../services/api';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService.getAll().then(res => {
      setEvents(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = category ? events.filter(e => e.category === category) : events;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Events</h1>
        
        {/* Filter */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <button onClick={() => setCategory('')} className={`px-4 py-2 rounded-lg font-semibold transition ${!category ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}>
            All
          </button>
          {['wedding', 'festival', 'party', 'concert'].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${category === cat ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(event => (
            <Link key={event._id} to={`/events/${event._id}`}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-40 flex items-center justify-center">
                  <span className="text-white text-4xl capitalize">{event.category.charAt(0)}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{event.description.substring(0, 80)}...</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                    <span className="text-purple-600 font-bold">${event.price}</span>
                  </div>
                  <div className="mt-3 text-gray-600 text-sm">{event.location.city}, {event.location.state}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
