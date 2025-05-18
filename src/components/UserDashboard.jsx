// src/components/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const UserDashboard = () => {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });
  const [editingCarId, setEditingCarId] = useState(null);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'cars'), (snapshot) => {
      const allCars = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(allCars);
    });

    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const carData = {
      ...form,
      userId: user.uid,
      Vendor: user.email,
    };

    try {
      if (editingCarId) {
        await updateDoc(doc(db, 'cars', editingCarId), carData);
        setEditingCarId(null);
      } else {
        await addDoc(collection(db, 'cars'), carData);
      }
      setForm({ name: '', price: '', image: '', description: '' });
    } catch (err) {
      console.error('Error saving car:', err);
    }
  };

  const handleEdit = (car) => {
    setForm({
      name: car.name,
      price: car.price,
      image: car.image,
      description: car.description || '',
    });
    setEditingCarId(car.id);
  };

  const handleDelete = async (carId) => {
    const confirmDelete = window.confirm('Delete this car?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'cars', carId));
    } catch (err) {
      console.error('Error deleting car:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Cars</h2>

      {user && (
        <form onSubmit={handleSubmit} className="space-y-2 mb-8">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Car name"
            className="block w-full border p-2 rounded"
            required
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="block w-full border p-2 rounded"
            required
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="block w-full border p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="block w-full border p-2 rounded"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            {editingCarId ? 'Update Car' : 'Add Car'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="border p-4 rounded shadow">
            <img src={car.image} alt={car.name} className="w-full h-32 object-cover rounded mb-2" />
            <h3 className="text-lg font-semibold">{car.name}</h3>
            <p className="text-sm text-gray-600">${car.price}</p>
            <p className="text-sm text-gray-600">{car.description}</p>
            <p className="text-xs text-gray-400 italic">Added by: {car.Vendor}</p>
            {user && user.email === car.Vendor && (
              <div className="mt-2 space-x-2">
                <button onClick={() => handleEdit(car)} className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(car.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
