import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">EventHub</h3>
            <p className="text-gray-400">Your platform for events, businesses, jobs, and news.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/events" className="hover:text-white transition">Events</Link></li>
              <li><Link to="/businesses" className="hover:text-white transition">Services</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition">Jobs</Link></li>
              <li><Link to="/news" className="hover:text-white transition">News</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-pink-500 transition">📘</a>
              <a href="#" className="text-2xl hover:text-blue-400 transition">𝕏</a>
              <a href="#" className="text-2xl hover:text-pink-400 transition">📷</a>
              <a href="#" className="text-2xl hover:text-red-500 transition">▶️</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 EventHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
