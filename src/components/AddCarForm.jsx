// src/components/AddCarForm.jsx
import React, { useState, useEffect } from 'react';

const AddCarForm = ({ onSubmit, initialData = {}, isEditing, cancelEdit }) => {
  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    Vendor: '',
    ...initialData,
  });

  useEffect(() => {
    setForm({ ...form, ...initialData });
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      price: '',
      image: '',
      description: '',
      Vendor: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Car name"
        className="block border p-2 rounded w-full"
        required
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Car price"
        className="block border p-2 rounded w-full"
        required
      />
      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="block border p-2 rounded w-full"
        required
      />
      <input
        name="Vendor"
        value={form.Vendor}
        onChange={handleChange}
        placeholder="Vendor name"
        className="block border p-2 rounded w-full"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Car description"
        className="block border p-2 rounded w-full"
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          {isEditing ? 'Update Car' : 'Add Car'}
        </button>
        {isEditing && (
          <button type="button" onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddCarForm;
