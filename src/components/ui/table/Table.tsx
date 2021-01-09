import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { ITableColumn } from "../../../models/interfaces/TableColumn";
import { SortingTypes } from "../../../models/enums/SortingTypes.enum";
import notSortedIcon from "../../../images/icons/not-sorted.svg";
import sortAscentIcon from "../../../images/icons/sort-ascent.svg";
import sortDescentIcon from "../../../images/icons/sort-descent.svg";

interface ITable {
  columns: ITableColumn[];
  dataSource: any[];
  children?: any;
  onSort?: (sortedColumnHeader: ITableColumn) => void;
}

const Table: React.FC<ITable> = ({ columns, dataSource, onSort }) => {
  const { Ascending, Descending } = SortingTypes;

  const [currentSortedHeader, setCurrentSortedHeader] = useState(null);

  if (currentSortedHeader) {
    const headerToUpdateIndex = columns.findIndex(
      ({ title }) => title === currentSortedHeader.title
    );

    if (headerToUpdateIndex > -1) {
      columns[headerToUpdateIndex] = currentSortedHeader;
    }
  }

  const onChangeSort = (clickedColumnHeader: ITableColumn) => {
    let newSortedHeader;
    if (clickedColumnHeader.isSortable) {
      if (!currentSortedHeader) {
        newSortedHeader = { ...clickedColumnHeader, currentSort: Ascending };
        setCurrentSortedHeader(newSortedHeader);
      } else {
        newSortedHeader = {
          ...clickedColumnHeader,
          currentSort:
            clickedColumnHeader.currentSort === Descending ? Ascending : Descending,
        };
        setCurrentSortedHeader(newSortedHeader);
      }

      if (onSort) {
        onSort(newSortedHeader);
      }
    }
  };

  const renderSortArrow = (column: ITableColumn) => {
    return (
      <span className="">
        {currentSortedHeader && column.title === currentSortedHeader.title ? (
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
            {columns.map((column: ITableColumn) => {
              return column.title && column.isVisible ? (
                <th
                  style={{ width: `${column.width}%` }}
                  className={`font-extrabold text-gray-600 text-left border-solid border-gray-400 border-b-2 ${
                    column.isSortable ? "cursor-pointer" : ""
                  }`}
                  data-tip
                  data-for={column.title}
                  key={column.title}
                  onClick={() => onChangeSort(column)}
                >
                  {column.title}
                  {column.tooltip && (
                    <ReactTooltip id={column.title} place="top" effect="solid">
                      {column.tooltip}
                    </ReactTooltip>
                  )}
                  {column.isSortable && (
                    <span className="inline-block float-right pr-2 pt-1">
                      {renderSortArrow(column)}
                    </span>
                  )}
                </th>
              ) : (
                column.isVisible && (
                  <th style={{ width: `${column.width}%` }}></th>
                )
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((data: any) => {
              return(
                <tr key={data.id} className="border-solid border-gray-300 border-b-2">
                  {columns.map((column: ITableColumn) => {
                     return (
                      <td className="py-4 pr-4">
                        {data.hasOwnProperty(column.key) ?
                          <>
                            {column.render(data[column.key])}
                          </>
                          :
                          <>
                            {column.render(data)}
                          </>
                        }
                      </td>
                     )
                  })} 
                </tr>
              )
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
