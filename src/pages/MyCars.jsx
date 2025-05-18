


import React, { useState, useEffect } from 'react';
import AddCarForm from '../components/AddCarForm';
import ListComponent from '../components/ListComponent';
import CarCard from '../components/CarCard';
import { auth, db } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const MyCars = () => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(collection(db, 'cars'), where('userId', '==', currentUser.uid));
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const userCars = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCars(userCars);
          setLoading(false);
        }, (err) => {
          setError('Failed to load your cars.');
          setLoading(false);
          console.error(err);
        });

        return () => unsubscribeSnapshot();
      } else {
        setCars([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddOrUpdate = async (car) => {
    if (!user) return alert('Login required to add a car');

    if (editingCar) {
      const updatedCar = { ...editingCar, ...car };
      try {
        const docRef = doc(db, 'cars', updatedCar.id);
        await updateDoc(docRef, updatedCar);
        setEditingCar(null);
      } catch (err) {
        console.error('Error updating car:', err);
      }
    } else {
      const newCar = {
        ...car,
        userId: user.uid,
        Vendor: user.email,
      };
      try {
        await addDoc(collection(db, 'cars'), newCar);
      } catch (err) {
        console.error('Error adding car:', err);
      }
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Delete this car?');
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'cars', id));
    } catch (err) {
      console.error('Error deleting car:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        {editingCar ? 'Edit Your Car' : 'Add a New Car'}
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <AddCarForm
          onSubmit={handleAddOrUpdate}
          initialData={editingCar}
          isEditing={!!editingCar}
          cancelEdit={() => setEditingCar(null)}
        />
      </div>

      <h2 className="text-xl font-semibold mb-3 text-gray-700">Your Cars</h2>
      <ListComponent
        items={cars}
        loading={loading}
        error={error}
        emptyMessage="You have not added any cars yet."
        renderItem={(car) => (
          <div className="bg-white border rounded-lg p-4 shadow-md mb-4">
            <CarCard car={car} />
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleEdit(car)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(car.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default MyCars;
