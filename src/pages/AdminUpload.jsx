import React, { useState, useEffect } from 'react';
import AddCarForm from '../components/AddCarForm';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminUpload = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, 'cars'));
    const carsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCars(carsData);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this car?')) {
      await deleteDoc(doc(db, 'cars', id));
      fetchCars();
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <AddCarForm onSuccess={fetchCars} />

      <h2 className="text-xl font-bold mt-8">Existing Cars</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cars.map(car => (
            <div key={car.id} className="border p-4 rounded shadow">
              <img src={car.image} alt={car.name} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="font-semibold">{car.name}</h3>
              <p>${car.price}</p>
              <p className="text-sm text-gray-600">{car.Vendor}</p>
              <button
                onClick={() => handleDelete(car.id)}
                className="bg-red-600 text-white px-2 py-1 mt-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUpload;
