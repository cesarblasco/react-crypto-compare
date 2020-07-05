import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { ITableHeader } from "../../../models/interfaces/TableHeader";
import { SortingTypes } from "../../../models/enums/SortingTypes.enum";
import notSortedIcon from "../../../images/icons/not-sorted.svg";
import sortAscentIcon from "../../../images/icons/sort-ascent.svg";
import sortDescentIcon from "../../../images/icons/sort-descent.svg";

interface ITable {
  headers: ITableHeader[];
  children?: any;
  onSort?: (sortedHeader: ITableHeader) => void;
}

const Table: React.FC<ITable> = ({ children, headers, onSort }) => {
  const { Ascending, Descending } = SortingTypes;

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
        newSortedHeader = { ...clickedHeader, currentSort: Ascending };
        setCurrentSortedHeader(newSortedHeader);
      } else {
        newSortedHeader = {
          ...clickedHeader,
          currentSort:
            clickedHeader.currentSort === Descending ? Ascending : Descending,
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
      <span className="">
        {currentSortedHeader && header.title === currentSortedHeader.title ? (
          currentSortedHeader.currentSort === Descending ? (
            <img
              className="w-3 h-3 pt-1"
              alt={"column is sorted in ascending order"}
              src={sortAscentIcon}
            />
          ) : (
            <img
              className="w-3 h-3 pt-1"
              alt={"column is sorted in descending order"}
              src={sortDescentIcon}
            />
          )
        ) : (
          <img
            className="w-3 h-3 pt-1"
            alt={"sort column in ascending order"}
            src={notSortedIcon}
          />
        )}
      </span>
    );
  };

  return (
    <>
      <table className="table-fixed w-full mt-4">
        <thead>
          <tr>
            {headers.map((header: ITableHeader) => {
              return header.title && header.isVisible ? (
                <th
                  style={{ width: `${header.width}%` }}
                  className={`font-extrabold text-gray-600 text-left border-solid border-gray-400 border-b-2 ${
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
                    <span className="inline-block float-right pr-2 pt-1">
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
