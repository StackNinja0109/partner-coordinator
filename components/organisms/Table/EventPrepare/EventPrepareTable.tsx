'use client'

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import EventPrepareTableHeader from "./EventPrepareTableHeader";
import EventPrepareTableCounter from "./EventPrepareTableCounter";
import EventPrepareTableRow from "./EventPrepareTableRow";
import { Timestamp } from "firebase/firestore";
import { eventPrepareListAtom } from "@/recoil/atom/events/eventPrepareListAtom";
import { fromTimestampToDate } from "@/utils/convert";

export interface EventPrepareTableItem {
  id: string
  title: string
  organizer: string
  createdAt: Timestamp
  recruitCount: number
  adoptCount: number
  selectCount: number
}

export interface SortInterface {
  name: "title" | "organizer" | "createdAt"
  direction: "none" | "up" | "down"
}

const EventPrepareTable = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentSort, setCurrentSort] = useState<SortInterface>({ name: "createdAt", direction: "down" });
  const [pageSize, setPageSize] = useState(10);

  const items = useRecoilValue(eventPrepareListAtom);
  const [tableItems, setTableItems] = useState<EventPrepareTableItem[]>([]);
  useEffect(() => {
    setCurrentPage(0)
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
        <EventPrepareTableCounter currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} itemsLength={items.length} />
      </div>
      <div className="relative px-[10px] rounded-lg bg-gray-white">
        <table className="w-full">
          <EventPrepareTableHeader currentSort={currentSort} setCurrentSort={setCurrentSort} />
          <tbody>
            {tableItems.length > 0 ? (
              tableItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((item, index) => (
                <EventPrepareTableRow key={index} item={item} />
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

export default EventPrepareTable;