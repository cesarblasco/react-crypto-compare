import React, { useState, useEffect } from "react";

interface IPagination {
  dataSource: any[];
  onPageChange: ({ currentPage, perPage, newPageData }: {currentPage: number, perPage: number, newPageData: any[]}) => void;
  perPageOptions?: any[];
}

const Pagination: React.FC<IPagination> = ({
  dataSource,
  onPageChange,
  perPageOptions = [{ value: 10 }, { value: 20 }, { value: 30 }],
}) => {
  const totalData = dataSource && dataSource.length;
  const [{ value: firstPerPageOptionValue }] = perPageOptions;
  const initialTotalPages = Math.ceil(totalData / firstPerPageOptionValue);

  const generatePagesArray = (currentPage: any, perPage: any) => {
    let pageOffset = (currentPage -= 3);
    let limit = currentPage + 6;
    const currentTotalPages = perPage
      ? Math.ceil(totalData / perPage)
      : initialTotalPages;
    if (currentPage < 2) pageOffset = 1;
    if (currentPage >= currentTotalPages) {
      pageOffset = currentTotalPages - 6;
      limit = currentPage;
    }
    const arrayPages = [];
    for (let i = pageOffset; i <= limit; i++) {
      if (i <= currentTotalPages) {
        arrayPages.push({ number: i });
      }
    }
    return arrayPages;
  };

  const initialState = {
    totalPages: initialTotalPages,
    currentPage: 1,
    pages: generatePagesArray(1, firstPerPageOptionValue),
    perPage: firstPerPageOptionValue,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (state.perPage) {
      setState({
        ...state,
        currentPage: 1,
        pages: generatePagesArray(1, state.perPage),
        totalPages: Math.ceil(totalData / state.perPage),
      });
    }
  }, [totalData, dataSource]);

  const handlePageChange = (currentPage: number) => {
    if (
      currentPage > 0 &&
      currentPage <= state.totalPages &&
      currentPage !== state.currentPage
    ) {
      setState({
        ...state,
        pages: generatePagesArray(currentPage, state.perPage),
        currentPage,
      });

      const newPageIndex = (currentPage - 1) * state.perPage;
      const newPageLimit = currentPage * state.perPage;

      const newPageData = dataSource.slice(newPageIndex, newPageLimit);
      onPageChange({ currentPage, perPage: state.perPage, newPageData });
    }
  };

  const handlePerPageChange = ({ target: { value: perPageValue } }: any) => {
    setState({
      ...state,
      currentPage: 1,
      pages: generatePagesArray(1, perPageValue),
      totalPages: Math.ceil(totalData / perPageValue),
      perPage: perPageValue,
    });

    const newPageLimit = 1 * perPageValue;
    const newPageData = dataSource.slice(0, newPageLimit);

    onPageChange({ currentPage: 1, perPage: perPageValue, newPageData });
  };

  return totalData > 0 ? (
    <>
      <div className="flex flex-col mt-6 mb-4 text-center md:flex-row md:text-left">
        <nav className="w-full md:w-3/4 mb-2">
          <ul>
            <li
              onClick={() => handlePageChange(state.currentPage - 1)}
              className={`pagination-btn ${
                state.currentPage === 1
                  ? "cursor-not-allowed text-gray-500"
                  : ""
              }`}
            >
              <span>{`${"<"}`}</span>
            </li>
            {state.currentPage > 4 && (
              <>
                <li
                  onClick={() => handlePageChange(1)}
                  className={`pagination-btn  ${
                    state.currentPage === 1 ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  1
                </li>
                <li className="pagination-btn cursor-not-allowed text-gray-500">
                  ...
                </li>
              </>
            )}
            {state.pages.map(({ number }) => {
              return (
                <li
                  className={`pagination-btn ${
                    number === state.currentPage ? "pagination-btn-active" : ""
                  }`}
                  onClick={() => handlePageChange(number)}
                  key={number}
                >
                  {number}
                </li>
              );
            })}
            {state.totalPages > 7 &&
              state.currentPage < state.totalPages - 3 && (
                <li className="pagination-btn cursor-not-allowed text-gray-500">
                  ...
                </li>
              )}
            {state.totalPages > 7 && state.currentPage < state.totalPages - 3 && (
              <li
                onClick={() => handlePageChange(state.totalPages)}
                className={`pagination-btn ${
                  state.totalPages === state.currentPage
                    ? "pagination-btn-active"
                    : ""
                }`}
              >
                {state.totalPages}
              </li>
            )}
            <li
              onClick={() => handlePageChange(state.currentPage + 1)}
              className={`pagination-btn ${
                state.currentPage === state.totalPages
                  ? "cursor-not-allowed text-gray-500"
                  : ""
              }`}
            >
              <span>{`${">"}`}</span>
            </li>
          </ul>
        </nav>
        {totalData > firstPerPageOptionValue && perPageOptions.length > 1 && (
          <div className="pl-2 pt-2">
            <select
              id="itemsPerPage"
              className="select"
              onChange={handlePerPageChange}
              value={state.perPage}
            >
              {perPageOptions.map(({ value }) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <label htmlFor="itemsPerPage">Items per page</label>
          </div>
        )}
      </div>
    </>
  ) : (
    <></>
  );
};

export default Pagination;
