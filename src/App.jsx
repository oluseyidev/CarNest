

import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import AdminPanel from './pages/AdminPanel';
import ApiCars from './pages/ApiCars';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyCars from './pages/MyCars';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [cars, setCars] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activePage, setActivePage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      setCars(JSON.parse(storedCars));
      setLoading(false);
    } else {
      fetch('/data/cars.json')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch cars');
          return res.json();
        })
        .then((data) => {
          setCars(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load cars.');
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cars', JSON.stringify(cars));
    }
  }, [cars, loading]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (car) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === car.id);
      return exists ? prev.filter((item) => item.id !== car.id) : [...prev, car];
    });
  };

  const addCar = (newCar) => {
    setCars((prev) => [newCar, ...prev]);
  };

  const adminEmails = ['oluseyiolalere@gmail.com'];
  const isAdmin = user && adminEmails.includes(user.email);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading cars...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
     <header className="bg-blue-100 shadow py-4 px-6 mb-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-extrabold text-blue-700">🚗 CarNest – Ultimate Auto Trade Hub</h1>
          <nav className="flex flex-wrap gap-3 items-center">
            {[
              { label: 'All Cars', page: 'home', color: 'blue' },
              { label: `Wishlist (${wishlist.length})`, page: 'wishlist', color: 'pink' },
              { label: 'My Cars', page: 'mycars', color: 'yellow' },
              { label: 'Admin Panel', page: 'admin', color: 'green' },
              { label: 'API Cars', page: 'api', color: 'purple' },
            ].map(({ label, page, color }) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
                  activePage === page
                    ? `bg-${color}-600 text-white`
                    : `bg-${color}-200 hover:bg-${color}-300`
                }`}
                onClick={() => setActivePage(page)}
                aria-current={activePage === page ? 'page' : undefined}
              >
                {label}
              </button>
            ))}

            {!user ? (
              <button
                className={`px-4 py-2 rounded-full font-semibold shadow-md transition-colors duration-300 ${
                  activePage === 'login' ? 'bg-gray-700 text-white' : 'bg-gray-400 hover:bg-gray-500'
                }`}
                onClick={() => setActivePage('login')}
              >
                Log In / Sign Up
              </button>
            ) : (
              <button
                className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold shadow-md hover:bg-red-700"
                onClick={() => signOut(auth)}
              >
                Log Out
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-10 min-h-[70vh]">
        {activePage === 'home' && (
          <Home cars={cars} wishlist={wishlist} toggleWishlist={toggleWishlist} />
        )}
        {activePage === 'wishlist' && (
          <Wishlist wishlist={wishlist} toggleWishlist={toggleWishlist} />
        )}
        {activePage === 'mycars' && user && <MyCars />}
        {activePage === 'admin' && (
          isAdmin ? (
            <AdminPanel onAddCar={addCar} cars={cars} setCars={setCars} />
          ) : (
            <p className="text-center text-red-600 font-semibold mt-6">
              {user
                ? 'You do not have permission to access Admin Panel.'
                : 'Please log in as admin to access Admin Panel.'}
            </p>
          )
        )}
        {activePage === 'api' && <ApiCars />}
        {activePage === 'login' && !user && (
          <div className="max-w-md mx-auto mt-8">
            {authMode === 'login' ? (
              <>
                <Login onLogin={setUser} />
                <p className="mt-4 text-center text-gray-700">
                  Don't have an account?{' '}
                  <button
                    className="text-blue-600 underline hover:text-blue-800"
                    onClick={() => setAuthMode('signup')}
                  >
                    Sign Up
                  </button>
                </p>
              </>
            ) : (
              <>
                <Signup onSignup={setUser} />
                <p className="mt-4 text-center text-gray-700">
                  Already have an account?{' '}
                  <button
                    className="text-blue-600 underline hover:text-blue-800"
                    onClick={() => setAuthMode('login')}
                  >
                    Log In
                  </button>
                </p>
              </>
            )}
          </div>
        )}
      </main>
      <footer className="bg-gray-200 py-6 mt-12 text-center text-sm text-gray-700">
        <p>&copy; {new Date().getFullYear()} CarNest – Ultimate Auto Trade Hub. All rights reserved.</p>
        <p className="mt-2">Built with 💙 by <span className="font-medium text-blue-700">Oluseyi Olalere</span></p>
      </footer>   

    </div>
  );
}

export default App;
