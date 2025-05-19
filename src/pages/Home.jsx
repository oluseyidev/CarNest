



// import React, { useEffect, useState } from 'react';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { db } from '../firebase';
// import ListComponent from '../components/ListComponent';
// import CarCard from '../components/CarCard';

// const Home = ({ wishlist, toggleWishlist }) => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   // Load from localStorage on initial mount
//   useEffect(() => {
//     const storedCars = localStorage.getItem('cars');
//     if (storedCars) {
//       setCars(JSON.parse(storedCars));
//       setLoading(false);
//     }
//   }, []);

//   // Firestore real-time sync
//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(db, 'cars'),
//       (snapshot) => {
//         const carList = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCars(carList);
//         localStorage.setItem('cars', JSON.stringify(carList));
//         setLoading(false);
//       },
//       (err) => {
//         console.error('Failed to fetch cars:', err);
//         setError('Failed to load car listings.');
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   const filteredCars = cars.filter(car =>
//     car.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//           {/* Welcome message goes here */}
//       <div className="bg-blue-50 border border-blue-300 text-blue-900 p-6 rounded-2xl shadow mb-8">
//         <h2 className="text-2xl font-bold mb-3">🚗 Welcome to CarNest – Powering the Future of Automotive Commerce 🚗</h2>
//         <p className="mb-3">Greetings, sellers & buyers!</p>
//         <p className="mb-3">
//           Whether you're here to sell your vehicle or find the perfect ride, you've come to the right place.
//           At <span className="font-semibold text-blue-800">CarNest</span>, we make auto trading seamless, secure, and <span className="font-semibold">100% FREE</span>!
//         </p>
//         <ul className="list-disc list-inside space-y-2 mb-4">
//           <li>✅ <span className="font-medium">Sellers:</span> List your vehicles with ease and connect with serious buyers—<span className="text-blue-800 font-semibold">at no cost</span>.</li>
//           <li>✅ <span className="font-medium">Buyers:</span> Discover top-quality cars at competitive prices, with <span className="font-semibold">no hidden fees</span>.</li>
//           <li>✅ <span className="font-medium">Fast, Safe, Reliable:</span> Enjoy a trusted marketplace designed for smooth, free transactions.</li>
//         </ul>
//         <p className="font-medium">
//           Start your journey now—because at <span className="font-semibold text-blue-800">CarNest</span>, the road to a great deal begins here, with <span className="text-blue-700 font-semibold">ZERO fees</span>! 🚀
//         </p>
//       </div>


//       {/* Search input and listings continue here */}

//       <input
//         type="text"
//         placeholder="Search cars..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="mb-6 p-3 border border-gray-300 rounded w-full max-w-md focus:outline-blue-500"
//       />

//       <ListComponent
//         items={filteredCars}
//         renderItem={(car) => (
//           <div className="bg-white shadow rounded p-4 mb-4 hover:shadow-lg transition-shadow duration-200">
//             <CarCard
//               car={car}
//               toggleWishlist={toggleWishlist}
//               isWishlisted={wishlist.some((c) => c.id === car.id)}
//             />
//           </div>
//         )}
//         loading={loading}
//         error={error}
//         emptyMessage="No matching cars found."
//       />
//     </div>
//   );
// };

// export default Home;




import React, { useState } from 'react';
import ListComponent from '../components/ListComponent';
import CarCard from '../components/CarCard';

const Home = ({ cars, wishlist, toggleWishlist, loading, error }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = cars.filter(car =>
    car.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="bg-blue-50 border border-blue-300 text-blue-900 p-6 rounded-2xl shadow mb-8">
        <h2 className="text-2xl font-bold mb-3">🚗 Welcome to CarNest – Powering the Future of Automotive Commerce 🚗</h2>
        <p className="mb-3">Greetings, sellers & buyers!</p>
        <p className="mb-3">
          Whether you're here to sell your vehicle or find the perfect ride, you've come to the right place.
          At <span className="font-semibold text-blue-800">CarNest</span>, we make auto trading seamless, secure, and <span className="font-semibold">100% FREE</span>!
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>✅ <span className="font-medium">Sellers:</span> List your vehicles with ease and connect with serious buyers—<span className="text-blue-800 font-semibold">at no cost</span>.</li>
          <li>✅ <span className="font-medium">Buyers:</span> Discover top-quality cars at competitive prices, with <span className="font-semibold">no hidden fees</span>.</li>
          <li>✅ <span className="font-medium">Fast, Safe, Reliable:</span> Enjoy a trusted marketplace designed for smooth, free transactions.</li>
        </ul>
        <p className="font-medium">
          Start your journey now—because at <span className="font-semibold text-blue-800">CarNest</span>, the road to a great deal begins here, with <span className="text-blue-700 font-semibold">ZERO fees</span>! 🚀
        </p>
      </div>

      <input
        type="text"
        placeholder="Search cars..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-3 border border-gray-300 rounded w-full max-w-md focus:outline-blue-500"
      />

      <ListComponent
        items={filteredCars}
        renderItem={(car) => (
          <div className="bg-white shadow rounded p-4 mb-4 hover:shadow-lg transition-shadow duration-200">
            <CarCard
              car={car}
              toggleWishlist={toggleWishlist}
              isWishlisted={wishlist.some((c) => c.id === car.id)}
            />
          </div>
        )}
        loading={loading}
        error={error}
        emptyMessage="No matching cars found."
      />
    </div>
  );
};

export default Home;
