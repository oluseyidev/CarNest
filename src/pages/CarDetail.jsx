

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/cars.json') // Fetch from local JSON file
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c) => String(c.id) === id);
        setCar(found);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch car details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!car) return <p>Car not found</p>;

  return (
    <div className="space-y-4">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Back</Link>
      <h2 className="text-2xl font-bold">{car.name}</h2>
      <img 
        src={car.image} 
        alt={car.name} 
        className="rounded w-full object-cover"
      />
      <p><strong>Description:</strong> {car.description}</p>
      <p><strong>Price:</strong> ${car.price}</p>
    </div>
  );
}

export default CarDetail;