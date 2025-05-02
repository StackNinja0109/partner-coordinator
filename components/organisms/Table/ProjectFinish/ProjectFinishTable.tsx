'use client'

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import ProjectFinishTableRow from "./ProjectFinishTableRow";
import ProjectFinishTableCounter from "./ProjectFinishTableCounter";
import ProjectFinishTableHeader from "./ProjectFinishTableHeader";
import { Timestamp } from "firebase/firestore";
import { projectFinishListAtom } from "@/recoil/atom/projects/projectFinishListAtom";
import { fromTimestampToDate } from "@/utils/convert";
import Loading from "@/components/layouts/loading";

export interface ProjectFinishTableItem {
  id: string;
  organizationName: string;
  eventName: string;
  gender: string;
  recruitCount: number
  adoptCount: number
  selectCount: number
  finishedAt: Timestamp
}

export interface SortInterface {
  name: "organizationName" | "eventName" | "gender" | "finishedAt";
  direction: "none" | "up" | "down";
}

const ProjectFinishTable: React.FC = ({}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSort, setCurrentSort] = useState<SortInterface>({ name: "finishedAt", direction: "down" });
  const [pageSize, setPageSize] = useState(10);

  const items = useRecoilValue(projectFinishListAtom);
  const [tableItems, setTableItems] = useState<ProjectFinishTableItem[]>(items);

  useEffect(() => {
    setCurrentPage(0);
    let temp_arr = [...items]

    setTableItems(temp_arr.sort((a, b) => { 
      let lhs, rhs;
      if (currentSort.name === 'finishedAt') {
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
        <ProjectFinishTableCounter currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} items={items} />
      </div>
      <div className="relative px-[10px] rounded-lg bg-gray-white">
        <table className="w-full">
          <ProjectFinishTableHeader currentSort={currentSort} setCurrentSort={setCurrentSort} />
          <tbody>
            {tableItems.length > 0 ? (
              tableItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((item, index) => (
                <ProjectFinishTableRow key={index} item={item} />
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

export default ProjectFinishTable;