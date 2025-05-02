'use client'

import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"
import { Timestamp } from "firebase/firestore"
import TableCounter from "./TableCounter"
import { eventListAtom } from "@/recoil/atom/events/eventListAtom"
import Loading from "@/components/layouts/loading";
import { fromTimestampToDate } from "@/utils/convert"

export interface EventTableItem {
  id: string
  title: string
  organizer: string
  createdAt: Timestamp
  recruitCount: number
  adoptCount: number
  selectCount: number
  candidate: boolean
  message: boolean
  startedAt: Timestamp
}

export interface SortInterface{
  name: "title" | "organizer" | "startedAt"
  direction: "none" | "up" | "down";
}

const Table = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentSort, setCurrentSort] = useState<SortInterface>({name: "startedAt", direction: "down"})
  const [pageSize, setPageSize] = useState(10)

  const items = useRecoilValue(eventListAtom);
  const [tableItems, setTableItems] = useState<EventTableItem[]>(items)
  
  useEffect(() => {
    setCurrentPage(0);
    let temp_arr = [...items]
    
    setTableItems(temp_arr.sort((a, b) => { 
      let lhs, rhs;
      if (currentSort.name === 'startedAt') {
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
  }, [items, currentSort])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end pr-[10px]">
        <TableCounter currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} itemsLength={items.length} />
      </div>
      <div className="px-[10px] rounded-lg bg-gray-white">
        <table className="w-full">
          <TableHeader currentSort={currentSort} setCurrentSort={setCurrentSort} />
          <tbody>
            {tableItems.length > 0 ? (
              tableItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((item, index) => (
                <TableRow key={index} item={item} />
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
  )
}


export default Table;