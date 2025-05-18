// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import AddCarForm from '../components/AddCarForm';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

  const AdminPanel = () => {
  const adminEmails = ['oluseyiolalere@gmail.com']; // <-- your admin emails here

  const [editingCar, setEditingCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser && adminEmails.includes(currentUser.email)) {
        // Load all cars for admins (no filter)
        const q = query(collection(db, 'cars'));
        const unsubscribeCars = onSnapshot(q, (snapshot) => {
          const allCars = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCars(allCars);
          setLoading(false);
        });

        // Cleanup cars listener on unmount or user change
        return () => unsubscribeCars();
      } else {
        // Not admin or no user — clear cars and stop loading
        setCars([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddOrUpdate = async (car) => {
    if (!user || !adminEmails.includes(user.email))
      return alert('You must be logged in as admin to add or update cars.');

    if (editingCar) {
      const updatedCar = { ...editingCar, ...car };
      try {
        const docRef = doc(db, 'cars', updatedCar.id);
        await updateDoc(docRef, updatedCar);
        setEditingCar(null);
      } catch (err) {
        console.error('Failed to update Firestore car:', err);
      }
    } else {
      const newCar = { ...car, userId: user.uid, Vendor: user.email };
      try {
        await addDoc(collection(db, 'cars'), newCar);
      } catch (err) {
        console.error('Failed to add car to Firestore:', err);
      }
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this car?'
    );
    if (!confirmDelete) return;

    try {
      const docRef = doc(db, 'cars', id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error('Failed to delete from Firestore:', err);
    }
  };

  if (loading) return <p>Loading Admin Panel...</p>;

  if (!user) {
    return <p>Please log in to access Admin Panel.</p>;
  }

  if (!adminEmails.includes(user.email)) {
    return (
      <p className="text-red-600 font-semibold">
        You do not have permission to access Admin Panel.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {editingCar ? 'Edit Car' : 'Add New Car'}
      </h2>

      <AddCarForm
        onSubmit={handleAddOrUpdate}
        initialData={editingCar}
        isEditing={!!editingCar}
        cancelEdit={() => setEditingCar(null)}
      />

      <h2 className="text-lg font-semibold mb-2">All Cars</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="border rounded p-4 shadow">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <h3 className="font-bold">{car.name}</h3>
            <p>${car.price}</p>
            <p className="text-sm text-gray-600">{car.description}</p>
            <p className="text-sm text-gray-500">Vendor: {car.Vendor}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(car)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(car.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
