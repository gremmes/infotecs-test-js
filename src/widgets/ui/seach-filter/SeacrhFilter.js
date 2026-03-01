import React, { useState } from 'react';
import { searchQueryParams } from '../../../entities/seach-params';

const SearchFilter = ({ onFilterChange }) => {
  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleSubmit = () => {
    onFilterChange({ category, searchText });
  };

  return (
    <div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
      {searchQueryParams.map(heading => (
          <option value={heading.key} key={heading.key}>{heading.value}</option>
      ))}
      </select>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSubmit}>Поиск</button>
    </div>
  );
};