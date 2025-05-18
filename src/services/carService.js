// src/services/carService.js

import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

// Add new car with current user as owner
export const addCar = async (carData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const carWithOwner = {
    ...carData,
    userId: user.uid,
    createdAt: serverTimestamp(),
  };

  await addDoc(collection(db, "cars"), carWithOwner);
};

// Get all cars (for buyers)
export const getAllCars = async () => {
  const snapshot = await getDocs(collection(db, "cars"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update car if user is owner
export const updateCar = async (carId, updatedData, ownerId) => {
  const user = auth.currentUser;
  if (!user || user.uid !== ownerId) throw new Error("Unauthorized");

  const docRef = doc(db, "cars", carId);
  await updateDoc(docRef, updatedData);
};

// Delete car if user is owner
export const deleteCar = async (carId, ownerId) => {
  const user = auth.currentUser;
  if (!user || user.uid !== ownerId) throw new Error("Unauthorized");

  const docRef = doc(db, "cars", carId);
  await deleteDoc(docRef);
};
