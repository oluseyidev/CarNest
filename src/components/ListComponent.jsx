




// src/components/ListComponent.jsx
import React from 'react';

const ListComponent = ({ items, renderItem, loading, error, emptyMessage = "No items available." }) => {
  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!items || items.length === 0) {
    return <p className="text-center text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div key={item.id || index}>
          {renderItem ? renderItem(item) : <pre>{JSON.stringify(item, null, 2)}</pre>}
        </div>
      ))}
    </div>
  );
};

export default ListComponent;
