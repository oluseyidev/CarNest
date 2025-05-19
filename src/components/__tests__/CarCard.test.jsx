/// <reference types="vitest" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import CarCard from '../CarCard';

const mockCar = {
  id: '1',
  name: 'Toyota Camry',
  price: '20000',
  image: '',
};

describe('CarCard', () => {
  it('renders car name and price', () => {
    render(<CarCard car={mockCar} toggleWishlist={() => {}} isWishlisted={false} />);
    expect(screen.getByText(/Toyota Camry/i)).toBeInTheDocument();
    expect(screen.getByText(/\$20000/i)).toBeInTheDocument();
  });
});
