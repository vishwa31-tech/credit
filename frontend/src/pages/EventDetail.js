import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService, registrationService } from '../services/api';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    eventService.getById(id)
      .then(res => {
        setEvent(res.data);
        const firstSpecialty = res.data.specialties?.[0]?.name || '';
        setSelectedSpecialty(firstSpecialty);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load event');
        setLoading(false);
      });
  }, [id]);

  const handleRegister = async () => {
    setError('');
    setMessage('');
    try {
      const payload = {
        eventId: event._id,
        ticketCount: registrations,
        specialty: selectedSpecialty,
      };
      await registrationService.create(payload);
      setMessage(`Registration successful for ${registrations} ticket(s).`);
      setEvent(prev => ({ ...prev, registrations: prev.registrations + registrations }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to register for event');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;
  if (!event) return <div className="text-center py-12">Event not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button onClick={() => navigate('/events')} className="text-purple-600 hover:text-purple-800 mb-6 font-semibold">
          ← Back to Events
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-80 flex items-center justify-center">
            <span className="text-white text-8xl">{event.category.charAt(0).toUpperCase()}</span>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{event.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-700 mb-4">Event Details</h2>
                <div className="space-y-3">
                  <p><strong>Category:</strong> <span className="capitalize text-purple-600">{event.category}</span></p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {new Date(event.date).toLocaleTimeString()}</p>
                  <p><strong>Location:</strong> {event.location.address}, {event.location.city}, {event.location.state}</p>
                  <p><strong>Capacity:</strong> {event.capacity} people</p>
                  <p><strong>Registrations:</strong> {event.registrations}/{event.capacity}</p>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Now</h2>
                <div className="mb-6">
                  <p className="text-5xl font-bold text-purple-600 mb-2">${event.price}</p>
                  <p className="text-gray-600">per ticket</p>
                </div>
                
                {event.specialties && event.specialties.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Choose a Specialty</label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {event.specialties.map(specialty => (
                        <option key={specialty.name} value={specialty.name}>
                          {specialty.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2">Number of Tickets:</label>
                  <input
                    type="number"
                    min="1"
                    max={event.capacity - event.registrations}
                    value={registrations}
                    onChange={(e) => setRegistrations(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="mb-6 p-4 bg-white rounded border border-gray-300">
                  <p className="text-gray-600 mb-2">Total Price:</p>
                  <p className="text-3xl font-bold text-purple-600">${(event.price * registrations).toFixed(2)}</p>
                </div>

                {message && (
                  <div className="mb-4 bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    {message}
                  </div>
                )}
                {error && (
                  <div className="mb-4 bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
                <button
                  onClick={handleRegister}
                  disabled={event.registrations >= event.capacity}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {event.registrations >= event.capacity ? 'Event Full' : 'Register Now'}
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{event.description}</p>
              {event.details && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Event Details</h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{event.details}</p>
                </div>
              )}

              {event.specialties && event.specialties.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Specialties</h3>
                  <div className="space-y-3">
                    {event.specialties.map((specialty) => (
                      <div key={specialty.name} className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <p className="font-semibold text-purple-700">{specialty.name}</p>
                        <p className="text-gray-600">{specialty.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {event.tags && event.tags.length > 0 && (
                <div className="mt-6">
                  <p className="text-gray-700 font-semibold mb-3">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map(tag => (
                      <span key={tag} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {event.organizer && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Organizer</h3>
                <p className="text-gray-600"><strong>Name:</strong> {event.organizer.name}</p>
                <p className="text-gray-600"><strong>Email:</strong> {event.organizer.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
