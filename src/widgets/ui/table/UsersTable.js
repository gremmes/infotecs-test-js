import React from 'react';
import { activeHeadings, User } from '../entities';

const UsersTable = ({ users, onSort, onUserClick }) => {
  const handleHeaderClick = (key) => {
    onSort(key);
  };

  return (
    <table>
      <thead>
        <tr>
          {activeHeadings.map(heading => (
            <th onClick={() => handleHeaderClick(heading.key)}>{heading.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map(user => 
          <User key={user.id} user={user} onClick={()=> onUserClick(user)} />
        )}
      </tbody>
    </table>
  );
};

export default UsersTable;