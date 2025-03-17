import React from "react";
import "./Pagination.css"; // Import the CSS file

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const totalPageNumbersToShow = 3;
    const halfWay = Math.floor(totalPageNumbersToShow / 2);
    let startPage = Math.max(0, currentPage - halfWay);
    let endPage = Math.min(totalPages - 1, currentPage + halfWay);

    if (startPage === 0) {
      endPage = Math.min(totalPages - 1, totalPageNumbersToShow - 1);
    } else if (endPage === totalPages - 1) {
      startPage = Math.max(0, totalPages - totalPageNumbersToShow);
    }

    const pages = [];
    if (startPage > 0) {
      pages.push(0);
      if (startPage > 1) {
        pages.push("...");
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages - 1);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <ul className="pagination-container">
      {pageNumbers.map((page, index) => (
        <li
          key={index}
          className={`pagination-item ${currentPage === page ? "active" : ""}`}
        >
          {page === "..." ? (
            <span className="dots">...</span>
          ) : (
            <button
              className="page-button"
              onClick={() => typeof page === "number" && onPageChange(page)}
            >
              {typeof page === "number" ? page + 1 : page}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
