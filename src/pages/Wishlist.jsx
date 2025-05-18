


import React from 'react';
import ListComponent from '../components/ListComponent';
import CarCard from '../components/CarCard';

const Wishlist = ({ wishlist, toggleWishlist }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
      <ListComponent
        items={wishlist}
        renderItem={(car) => (
          <CarCard
            key={car.id}
            car={car}
            toggleWishlist={toggleWishlist}
            isWishlisted={true}
          />
        )}
      />
    </div>
  );
};

export default Wishlist;
