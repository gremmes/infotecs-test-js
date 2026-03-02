import React from 'react';

export const User = ({ user, onClick }) => (
  <tr onClick={() => onClick(user)}>
    <td>{user.lastName}</td>
    <td>{user.firstName}</td>
    <td>{user.maidenName}</td>
    <td>{user.age}</td>
    <td>{user.gender}</td>
    <td>{user.phone}</td>
    <td>{user.email}</td>
    <td>{user.address.country}</td>
    <td>{user.address.city}</td>
  </tr>
);