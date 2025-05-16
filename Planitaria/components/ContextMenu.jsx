import React from 'react';

const ContextMenu = ({ position, options }) => {
  if (!options || options.length === 0) return null;

  return (
    <ul
      className="absolute bg-gray-800 text-white rounded shadow-lg"
      style={{ top: position.y, left: position.x, listStyle: 'none', padding: '0.5rem' }}
    >
      {options.map((opt, idx) => (
        <li key={idx} className="p-1 hover:bg-gray-700 cursor-pointer">
          {opt.label}
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
