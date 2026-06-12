import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { businessService } from '../services/api';

export default function Businesses() {
  const [businesses, setBusinesses] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    businessService.getAll().then(res => {
      setBusinesses(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = category ? businesses.filter(b => b.category === category) : businesses;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Service Providers</h1>
        
        {/* Filter */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <button onClick={() => setCategory('')} className={`px-4 py-2 rounded-lg font-semibold transition ${!category ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}>
            All
          </button>
          {['catering', 'photography', 'venue', 'decoration'].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${category === cat ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Businesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(business => (
            <Link key={business._id} to={`/businesses/${business._id}`}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-40 flex items-center justify-center">
                  <span className="text-white text-4xl">🏢</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{business.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{business.description?.substring(0, 80) || 'Professional services'}...</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-yellow-500 text-sm">{'⭐'.repeat(Math.round(business.rating))}</span>
                    <span className="text-gray-600 text-sm capitalize">{business.category}</span>
                  </div>
                  <div className="text-gray-600 text-sm">{business.city}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
