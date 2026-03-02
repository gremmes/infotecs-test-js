import React, { useState } from 'react';
import { activeHeadings } from '../../../entities/headings';

export const SearchFilter = ({ onFilterChange }) => {
  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ category, searchText });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="">-выберите параметр поиска-</option>
      {activeHeadings.map(heading => (
          <option value={heading.key} key={heading.key}>{heading.value}</option>
        ))}
      </select>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSubmit}>Поиск</button>
    </form>
  );
};