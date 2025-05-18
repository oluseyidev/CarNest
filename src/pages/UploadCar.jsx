import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const UploadCar = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'cars'), {
        ...form,
        price: parseFloat(form.price),
        ownerId: auth.currentUser.uid,
        createdAt: new Date(),
      });
      navigate('/');
    } catch (err) {
      console.error('Error uploading car:', err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Your Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Car name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="image" placeholder="Image URL" onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full p-2 border rounded" />
        <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Uploading...' : 'Upload Car'}
        </button>
      </form>
    </div>
  );
};

export default UploadCar;
