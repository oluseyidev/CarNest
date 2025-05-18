import React from 'react';

const fallbackImage = '/fallback.jpg'; // Your fallback image in /public

const CarCard = ({ car, toggleWishlist, isWishlisted }) => (
  <div className="border p-4 rounded shadow relative">
    <img
      src={car.image}
      alt={car.name}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = fallbackImage;
      }}
      className="w-full h-40 object-cover mb-2"
    />
    <h2 className="text-xl font-semibold">{car.name}</h2>
    <p className="text-gray-600">{car.description || 'No description available'}</p>
    <p className="text-sm text-gray-500">Vendor: {car.Vendor || 'Unknown vendor'}</p>
    <p className="text-blue-500 font-bold mt-2">${car.price || 'N/A'}</p>
    <button
      onClick={() => toggleWishlist(car)}
      className={`absolute top-2 right-2 text-xl ${
        isWishlisted ? 'text-red-500' : 'text-gray-400'
      }`}
      title="Toggle Wishlist"
    >
      ♥
    </button>
  </div>
);

export default CarCard;
