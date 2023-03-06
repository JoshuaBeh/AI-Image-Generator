import React from 'react';
export default function Select({ onSelect }) {
  return (
    <select name="size" id="size" className='size-button' onChange={onSelect}>
      <option value="Small">Small</option>
      <option value="Medium">Medium</option>
      <option className='large' value="Large">Large</option>
    </select>
  );
}
