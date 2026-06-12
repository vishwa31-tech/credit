import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    };

    updateUser();
    window.addEventListener('userUpdated', updateUser);

    return () => {
      window.removeEventListener('userUpdated', updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('userUpdated'));
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            🎉 EventHub
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition"
                >
                  <span className="text-lg">👤</span>
                  <span className="hidden sm:inline">{user.name}</span>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-xl">
                    <button
                      onClick={() => {
                        navigate('/');
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-t"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition text-sm">
                  Login
                </Link>
                <Link to="/signup" className="bg-transparent border-2 border-white text-white px-4 py-2 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition text-sm">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-sm md:text-base">
          <Link to="/" className="hover:text-gray-200 transition font-semibold">Home</Link>
          <Link to="/events" className="hover:text-gray-200 transition font-semibold">Events</Link>
          <Link to="/businesses" className="hover:text-gray-200 transition font-semibold">Services</Link>
          <Link to="/jobs" className="hover:text-gray-200 transition font-semibold">Jobs</Link>
          <Link to="/news" className="hover:text-gray-200 transition font-semibold">News</Link>
          <div className="flex gap-1">
            {user?.role === 'vendor' && (
              <>
                <Link to="/events/create" className="bg-white text-purple-600 px-2 py-1 rounded text-xs font-bold hover:bg-gray-100 transition">
                  + Event
                </Link>
                <Link to="/businesses/create" className="bg-white text-purple-600 px-2 py-1 rounded text-xs font-bold hover:bg-gray-100 transition">
                  + Service
                </Link>
                <Link to="/jobs/create" className="bg-white text-purple-600 px-2 py-1 rounded text-xs font-bold hover:bg-gray-100 transition">
                  + Job
                </Link>
              </>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin" className="bg-white text-purple-600 px-2 py-1 rounded text-xs font-bold hover:bg-gray-100 transition">
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
