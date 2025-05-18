import React, { useState, useEffect } from 'react';

const ApiCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://myfakeapi.com/api/cars/')
      .then((res) => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then((data) => {
        setCars(data.cars || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load API cars');
        setLoading(false);
      });
  }, []);

  const filteredCars = cars.filter((car) =>
    `${car.car_make} ${car.car_model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="p-4">Loading API cars...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search API cars..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCars.map((car) => (
          <div key={car.id} className="border rounded p-4 shadow bg-white">
            <img
              src={`https://www.pexels.com/search/car%20wallpapers/,${car.car_make}`}
              alt={car.car_model}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/default-car.jpg'; // Fallback to local image
              }}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="font-semibold text-lg">
              {car.car_make} {car.car_model}
            </h3>
            <p className="text-sm text-gray-600">Year: {car.car_model_year}</p>
            <p className="text-sm text-gray-600">Color: {car.car_color}</p>
            <p className="text-sm text-gray-800 font-medium">VIN: {car.car_vin}</p>
            <p className="text-blue-600 font-bold mt-2">${car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiCars;
