import React, { useState, useEffect } from 'react';
import { SearchFilter } from '../../../widgets/search-filter';
import { UsersTable } from '../../../widgets/table';
import { Pagination } from '../../../widgets/pagination';
import { UserModal } from '../../../widgets/modal';
import { fetchUsers } from '../../../features/users';

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
        console.error('Ошибка загрузки:', err);
      }
    };

    loadUsers();
  }, [currentPage, filter, sort]);

  const handleFilterChange = (newFilter) => {
    const filter = {
      category: newFilter.category === '' ? null : newFilter.category,
      searchText: newFilter.searchText === '' ? null : newFilter.searchText,
    };
    setFilter(filter);
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
    setModalUser(user.id);
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
        sortRules={sort} 
        onUserClick={handleUserClick}
      />
      
      <Pagination 
        total={total} 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        itemsPerPage={usersPerPage}
      />

      <UserModal
        isOpen={isModalOpen}
        userId={modalUser}
        onClose={closeModal}
      />
    </>
  );
};