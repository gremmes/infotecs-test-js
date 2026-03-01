import React from 'react';

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{user.firstName} {user.lastName} {user.maidenName}</h2>
        <img src={user.image} alt={`${user.firstName} ${user.lastName}`} style={{ width: '100px', borderRadius: '50%' }} />
        <p><strong>Возраст:</strong> {user.age}</p>
        <p><strong>Рост:</strong> {user.height} см</p>
        <p><strong>Вес:</strong> {user.weight} кг</p>
        <p><strong>Телефон:</strong> {user.phone}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Адрес:</strong> {user.address.address}, {user.address.city}, {user.address.state}, {user.address.country}</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default UserModal;