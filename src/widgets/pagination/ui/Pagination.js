import React, { useState, useEffect } from 'react';
import './Pagination.css';

export const Pagination = ({ total, currentPage, onPageChange, itemsPerPage }) => {
  const maxNumPages = Math.ceil(total / itemsPerPage);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (maxNumPages === 0) {
      setPages([]);
    } else if (maxNumPages <= 3) {
      setPages(Array.from({ length: maxNumPages }, (_, i) => i + 1));
    } else {
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(maxNumPages, currentPage + 1);

      if (currentPage === 1) {
        endPage = 3;
      } else if (currentPage === maxNumPages) {
        startPage = maxNumPages - 2;
      }

      setPages(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
    }
  }, [maxNumPages, currentPage]);

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleFirst = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLast = () => {
    const lastPage = Math.ceil(total / itemsPerPage);
    if (currentPage !== lastPage) {
      onPageChange(lastPage);
    }
  };

  return (
    <footer className="pagination-container">
      <button className="pagination-button" onClick={handleFirst} disabled={currentPage === 1}>В НАЧАЛО</button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`pagination-button ${page === currentPage ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
      <button className="pagination-button" onClick={handleLast} disabled={currentPage === Math.ceil(total / itemsPerPage)}>В КОНЕЦ</button>
    </footer>
  );
};    