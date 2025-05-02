'use client'

import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"
import { Timestamp } from "firebase/firestore"
import TableCounter from "./TableCounter"
import Loading from "@/components/layouts/loading";
import { projectListAtom } from "@/recoil/atom/projects/projectListAtom"
import { fromTimestampToDate } from "@/utils/convert"

export interface TableItem {
  id: string
  organizationName: string
  eventName: string
  gender: string
  recruitCount: number
  adoptCount: number
  selectCount: number
  candidate: boolean
  message: boolean
  startedAt: Timestamp
}

export interface SortInterface {
  name: "organizationName" | "eventName" | "gender" | "startedAt";
  direction: "none" | "up" | "down";
}

export interface TableProps {
  items: TableItem[]
}

const Table = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentSort, setCurrentSort] = useState<SortInterface>({ name: "startedAt", direction: "down" })
  const [pageSize, setPageSize] = useState(10)

  const items = useRecoilValue(projectListAtom);
  const [tableItems, setTableItems] = useState<TableItem[]>(items)


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
        <TableCounter currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} items={items} />
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