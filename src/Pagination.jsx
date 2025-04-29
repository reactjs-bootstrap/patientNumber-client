import React from "react";

const Pagination = ({
  totalPost,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }
  //   console.log(pages);

  return (
    <>
      <button
        className={`btn btn-outline-secondary me-2 ${
          pages.length == 1 || currentPage == 1 ? "disabled" : null
        }`}
        onClick={() => setCurrentPage("1")}
      >
        {"«"}
      </button>
      {pages.map((page, index) => {
        return (
          <button
            className={`btn btn-outline-secondary me-2 ${
              page == currentPage ? "bg-success text-white" : ""
            }`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        className={`btn btn-outline-secondary me-2 ${
          currentPage == pages.length ? "disabled" : null
        }`}
        onClick={() => setCurrentPage(pages.length)}
      >
        {"»"}
      </button>
    </>
  );
};

export default Pagination;

//*https://www.youtube.com/watch?v=wAGIOCqS8tk
