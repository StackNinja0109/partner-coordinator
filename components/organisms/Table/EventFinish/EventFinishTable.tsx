'use client'

import EventFinishTableHeader from "./EventFinishTableHeader";
import { useRecoilValue } from "recoil";
import EventFinishTableRow from "./EventFinishTableRow";
import EventFinishTableCounter from "./EventFinishTableCounter";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { eventFinishListAtom } from "@/recoil/atom/events/eventFinishListAtom";
import { fromTimestampToDate } from "@/utils/convert";

export interface EventFinishTableItem {
  id: string
  title: string
  organizer: string
  status: string
  recruitCount: number
  adoptCount: number
  selectCount: number
  finishedAt: Timestamp
}

export interface SortInterface {
  name: "title" | "organizer" | "finishedAt"
  direction: "none" | "up" | "down"
}

const EventFinishTable = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentSort, setCurrentSort] = useState<SortInterface>({ name: "finishedAt", direction: "down" });
  const [pageSize, setPageSize] = useState(10);

  const items = useRecoilValue(eventFinishListAtom);
  const [tableItems, setTableItems] = useState<EventFinishTableItem[]>([]);
  useEffect(() => {
    setCurrentPage(0)
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
        <EventFinishTableCounter currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} itemsLength={items.length} />
      </div>
      <div className="relative px-[10px] rounded-lg bg-gray-white">
        <table className="w-full">
          <EventFinishTableHeader currentSort={currentSort} setCurrentSort={setCurrentSort} />
          <tbody>
            {tableItems.length > 0 ? (
              tableItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((item, index) => (
                <EventFinishTableRow key={index} item={item} />
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

export default EventFinishTable;