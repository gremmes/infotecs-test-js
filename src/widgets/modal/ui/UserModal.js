import React, { useState, useEffect } from 'react';
import { getUser } from '../../../features/user';
import './UserModal.css';


export const UserModal = ({ userId, onClose, isOpen }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getUser(userId);
        setUser(result);
      } catch (err) {
        console.error(err);
        setError('Ошибка при загрузке данных пользователя');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (!userId) return null;

  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} role="dialog" tabIndex="-1" aria-modal="true">
      <div className="modal-content">
        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {user && (
        <>
          <h2>{user.firstName} {user.lastName} {user.maidenName}</h2>
          <img src={user.image} alt={`${user.firstName} ${user.lastName}`} style={{ width: '100px', borderRadius: '50%' }} />
          <p><strong>Возраст:</strong> {user.age}</p>
          <p><strong>Рост:</strong> {user.height} см</p>
          <p><strong>Вес:</strong> {user.weight} кг</p>
          <p><strong>Телефон:</strong> {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Адрес:</strong> {user.address.address}, {user.address.city}, {user.address.state}, {user.address.country}</p>
          <button onClick={onClose}>Закрыть</button>
        </>
        )}
      </div>
    </div>
  );
};