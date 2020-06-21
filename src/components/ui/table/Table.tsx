import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { ITableHeader } from "../../../types/TableHeader";

interface ITable {
  headers: ITableHeader[];
  children?: any;
  onSort?: (sortedHeader: ITableHeader) => void;
}

const Table: React.FC<ITable> = ({ children, headers, onSort }) => {
  const [currentSortedHeader, setCurrentSortedHeader] = useState();

  if (currentSortedHeader) {
    const headerToUpdateIndex = headers.findIndex(
      ({ title }) => title === currentSortedHeader.title
    );

    if (headerToUpdateIndex > -1) {
      headers[headerToUpdateIndex] = currentSortedHeader;
    }
  }

  const onChangeSort = (clickedHeader: ITableHeader) => {
    let newSortedHeader;
    if (clickedHeader.sortBy) {
      if (!currentSortedHeader) {
        newSortedHeader = { ...clickedHeader, currentSort: "asc" };
        setCurrentSortedHeader(newSortedHeader);
      } else {
        newSortedHeader = {
          ...clickedHeader,
          currentSort: clickedHeader.currentSort === "desc" ? "asc" : "desc",
        };
        setCurrentSortedHeader(newSortedHeader);
      }

      if (onSort) {
        onSort(newSortedHeader);
      }
    }
  };

  const renderSortArrow = (header: ITableHeader) => {
    return (
      <span className="pull-right">
        {currentSortedHeader &&
        header.title === currentSortedHeader.title &&
        currentSortedHeader.currentSort ? (
          currentSortedHeader.currentSort === "desc" ? (
            <span className="text-xs">▲</span>
          ) : (
            <span className="text-xs">▼</span>
          )
        ) : (
          <span className="text-lg">-</span>
        )}
      </span>
    );
  };

  return (
    <>
      <table className="w-full mt-4">
        <thead>
          <tr>
            {headers.map((header: ITableHeader) => {
              return header.title && header.isVisible ? (
                <th
                  style={{ width: `${header.width}%` }}
                  className={`font-extrabold text-gray-500 text-left border-solid border-gray-400 border-b-2 ${
                    header.sortBy ? "cursor-pointer" : ""
                  }`}
                  data-tip
                  data-for={header.title}
                  key={header.title}
                  onClick={() => onChangeSort(header)}
                >
                  {header.title}
                  {header.tooltip && (
                    <ReactTooltip id={header.title} place="top" effect="solid">
                      {header.tooltip}
                    </ReactTooltip>
                  )}
                  {header.sortBy && (
                    <span className="float-right mr-4">
                      {renderSortArrow(header)}
                    </span>
                  )}
                </th>
              ) : (
                header.isVisible && (
                  <th style={{ width: `${header.width}%` }}></th>
                )
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

export default Table;
