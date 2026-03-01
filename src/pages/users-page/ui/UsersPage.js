import React, { useState, useEffect } from 'react';
import SearchFilter from '../../widgets/SearchFilter/SearchFilter';
import UsersTable from '../../widgets/UsersTable/UsersTable';
import Pagination from '../../widgets/Pagination/Pagination';
import UserModal from '../../widgets/UserModal/UserModal';
import { fetchUsers } from '../../features/users/api';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({ category: null, searchText: null });
  const [sort, setSort] = useState({ key: null, order: null });
  const [modalUser, setModalUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const usersPerPage = 10;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers({ limit: usersPerPage, skip: (currentPage - 1) * usersPerPage, filter, sort });
        setUsers(data.users);
        setTotal(data.total);
      } catch (err) {
        console.error('Ошибка загрузки:', err); // выводить более красиво ошибку?
      }
    };

    loadUsers();
  }, [currentPage, filter, sort]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSort = (headerKey) => {
    setSort(prev => {
      if (prev.key !== headerKey) {
        return { key: headerKey, order: 'asc' };
      } else {
        if (prev.order === 'asc') {
          return { key: headerKey, order: 'desc' };
        } else if (prev.order === 'desc') {
          return { key: null, order: null };
        }
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUserClick = (user) => {
    setModalUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalUser(null);
  };

  return (
    <>
      <h1>Table with user data</h1>
      <SearchFilter onFilterChange={handleFilterChange} />
      
      <UsersTable 
        users={users} 
        onSort={handleSort} 
        onUserClick={handleUserClick} 
      />
      
      <Pagination 
        total={total} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        itemsPerPage={usersPerPage}
      />

      {isModalOpen && (
        <UserModal user={modalUser} onClose={closeModal} />
      )}
    </>
  );
};