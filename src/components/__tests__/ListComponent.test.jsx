/// <reference types="vitest" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import ListComponent from '../ListComponent';

describe('ListComponent', () => {
  const mockItems = [
    { id: '1', name: 'Toyota' },
    { id: '2', name: 'Honda' },
  ];

  const renderItem = (item) => <div key={item.id}>{item.name}</div>;

  it('displays loading state', () => {
    render(<ListComponent loading={true} items={[]} renderItem={renderItem} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays error state', () => {
    render(<ListComponent error="Failed to load" items={[]} renderItem={renderItem} />);
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });

  it('displays empty message if no items', () => {
    render(<ListComponent loading={false} items={[]} renderItem={renderItem} emptyMessage="Nothing found." />);
    expect(screen.getByText(/nothing found/i)).toBeInTheDocument();
  });

  it('renders items using renderItem', () => {
    render(<ListComponent loading={false} items={mockItems} renderItem={renderItem} />);
    expect(screen.getByText('Toyota')).toBeInTheDocument();
    expect(screen.getByText('Honda')).toBeInTheDocument();
  });
});
