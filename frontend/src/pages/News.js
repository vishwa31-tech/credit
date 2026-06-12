import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsService } from '../services/api';

export default function News() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsService.getAll().then(res => {
      setNews(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = category ? news.filter(n => n.category === category) : news;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Latest News</h1>
        
        {/* Filter */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <button onClick={() => setCategory('')} className={`px-4 py-2 rounded-lg font-semibold transition ${!category ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}>
            All
          </button>
          {['events', 'business', 'entertainment', 'lifestyle'].map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${category === cat ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(article => (
            <Link key={article._id} to={`/news/${article._id}`}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 h-40 flex items-center justify-center">
                  <span className="text-white text-4xl">📰</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.content.substring(0, 100)}...</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    <span>👁️ {article.views}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
