'use client'

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import ProjectPrepareTableHeader from "./ProjectPrepareTableHeader";
import ProjectPrepareTableCounter from "./ProjectPrepareTableCounter";
import ProjectPrepareTableRow from "./ProjectPrepareTableRow";
import { Timestamp } from "firebase/firestore";
import { projectPrepareListAtom } from "@/recoil/atom/projects/projectPrepareListAtom";
import { fromTimestampToDate } from "@/utils/convert";

export interface ProjectPrepareTableItem {
  id: string
  organizationName: string
  eventName: string
  gender: string
  recruitCount: number
  adoptCount: number
  selectCount: number
  createdAt: Timestamp
}

export interface SortInterface {
  name: "organizationName" | "eventName" | "gender" | "createdAt";
  direction: "none" | "up" | "down";
}

const ProjectPrepareTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSort, setCurrentSort] = useState<SortInterface>({ name: "createdAt", direction: "down" });
  const [pageSize, setPageSize] = useState(10);

  const items = useRecoilValue(projectPrepareListAtom);
  const [tableItems, setTableItems] = useState<ProjectPrepareTableItem[]>(items);
  useEffect(() => {
    setCurrentPage(0);
    let temp_arr = [...items]

    setTableItems(temp_arr.sort((a, b) => {

      let lhs, rhs;
      if (currentSort.name === 'createdAt') {
        lhs = fromTimestampToDate(a[currentSort.name])
        rhs = fromTimestampToDate(b[currentSort.name])
      } else {
        lhs = a[currentSort.name];
        rhs = b[currentSort.name];
      }
      if (currentSort.direction !== "up") {
        return lhs < rhs ? 1 : lhs == rhs ? 0 : -1;
      } else {
        return lhs < rhs ? -1 : lhs == rhs ? 0 : 1;
      }
    }))
  }, [items, currentSort]);
  
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end pr-[10px]">
        <ProjectPrepareTableCounter currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} items={items} />
      </div>
      <div className="relative px-[10px] rounded-lg bg-gray-white">
        <table className="w-full">
          <ProjectPrepareTableHeader currentSort={currentSort} setCurrentSort={setCurrentSort} />
          <tbody>
            {tableItems.length > 0 ? (
              tableItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((item, index) => (
                <ProjectPrepareTableRow key={index} item={item} />
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-5 text-center text-gray-gray_dark">
                  データはありません。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 

export default ProjectPrepareTable;