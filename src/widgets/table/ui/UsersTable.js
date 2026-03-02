import React from 'react';
import { User } from '../../../entities/user';
import { activeHeadings } from '../../../entities/headings';
import './UsersTable.css'

export const UsersTable = ({ users, onSort, onUserClick, sortRules }) => {
  const getSortLabel = ({ order }) => {
    if (order === 'asc') return '↑';
    if (order === 'desc') return '↓';
    return false;
  }

  const sortLabel = getSortLabel(sortRules);

  const handleHeaderClick = (key) => {
    onSort(key);
  };

  return (
    <table>
      <thead>
        <tr>
          {activeHeadings.map(heading => (
            <th key={heading.key} onClick={() => handleHeaderClick(heading.key)}>
              {heading.value}
              {heading.key === sortRules.key && <span>{sortLabel}</span>}
            </th>
          ))}
          <th key='email'>Email</th>
          <th key='country'>Cтрана</th>
          <th key='city'>Город</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => 
          <User key={user.id} user={user} onClick={onUserClick} />
        )}
      </tbody>
    </table>
  );
};