import React from 'react';
import { getEmoji } from '../utils/helpers';

export default function EventCard({ event, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden transform hover:scale-105"
    >
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-40 flex items-center justify-center">
        <span className="text-white text-5xl">{getEmoji(event.category)}</span>
      </div>
      <div className="p-6">
        <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold mb-2 capitalize">
          {event.category}
        </span>
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
          <span className="text-purple-600 font-bold text-lg">${event.price}</span>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-gray-600 text-xs">{event.registrations}/{event.capacity} registered</span>
          <span className="text-gray-600 text-xs">{event.location.city}</span>
        </div>
      </div>
    </div>
  );
}
