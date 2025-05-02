import React, { useState } from "react";
import TableHeader from "@/components/atoms/Table/TableHeader";
import Counters from "@/components/molecules/Table/Counter";
import Candidacy from "@/components/atoms/Table/Candidacy";
import Message from "@/components/atoms/Table/Message";
import TimeStump from "@/components/atoms/Table/TimeStump";
import RedPin from "@/components/atoms/Table/RedPin";

interface TableProps {
  data: any[];
  columns: {
    key: string;
    title: string;
    sortable?: boolean;
  }[];
}

const Table1: React.FC<TableProps> = ({ data, columns }) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");


  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = sortColumn
    ? data.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    })
    : data;

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-gray_light">
          {columns.map((column) => (
            <th key={column.key}>
              <TableHeader
                column={column}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-gray-gray_light">
            {columns.map((column, columnIndex) => {
              const isMarked = row['mark'] !== undefined ? row['mark'] : false;
              switch (column.key) {
                case "school_name":
                  return (
                    <td className="p-3 text-body_sp" key={columnIndex}>
                      <span className="relative">
                        {row[column.key]}
                        {isMarked && (
                          <RedPin className="absolute top-0 bottom-0 my-auto -left-3" />
                        )}
                      </span>
                    </td>
                  );
                case "recruit_status":
                  return (
                    <td className="p-3" key={columnIndex}>
                      <Counters
                        recruitCount={row[column.key].recruitCount}
                        adoptCount={row[column.key].adoptCount}
                        selectCount={row[column.key].selectCount}
                      />
                    </td>
                  );
                case "candidate":
                  return (
                    <td className="p-3" key={columnIndex}>
                      <Candidacy status={row[column.key]} />
                    </td>
                  );
                case "message":
                  return (
                    <td className="p-3" key={columnIndex}>
                      <Message status={row[column.key]} />
                    </td>
                  );
                case "date":
                  return (
                    <td className="p-3" key={columnIndex}>
                      <TimeStump date={row[column.key].date}/>
                    </td>
                  );
                default:
                  return (
                    <td className="p-3 text-timestamp" key={columnIndex}>
                      {row[column.key]}
                    </td>
                  );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>

  );
};

export default Table1;