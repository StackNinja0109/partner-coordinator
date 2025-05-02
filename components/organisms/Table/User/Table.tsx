'use client'

import Loading from "@/components/layouts/loading";
import { isLoadingAtom } from "@/recoil/atom/isLoadingAtom";
import { useRecoilValue } from "recoil";
import { usersListAtom } from "@/recoil/atom/usersListAtom";
import { useCallback, useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TablePagination from "./TablePagination";
import { Timestamp } from "firebase/firestore";

import { fromTimestampToDate } from "@/utils/convert";
import { DocRef, getDocIdWithData } from "@/libs/firebase/firestore";
import { getDoc } from "firebase/firestore";
import ProfilePage from "@/features/users/pages/ProfilePage";
import { v4 } from 'uuid';
import { authUserState } from "@/recoil/atom/auth/authUserAtom"

export interface TableItem {
  id: string
  userIdOfPrefecture: string
  userName: string
  groupedClubStrings: string[]
  age: number
  gender: string
  type: string
  organization: string
  address: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface SortInterface {
  name: "id" | "club" | "age" | "gender" | "createdAt" | "updatedAt";
  direction: "none" | "up" | "down";
}

export interface TableProps {
  items: TableItem[];
  onClick: () => void;
}

const Table = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentSort, setCurrentSort] = useState<SortInterface>({ name: "updatedAt", direction: "down" })
  const [pageSize, setPageSize] = useState(10);

  const [isLoading, setIsLoading] = useState(false);
  const [currentCnt, setCurrentCnt] = useState(10);

  const items = useRecoilValue(usersListAtom);
  const [tableItems, setTableItems] = useState<TableItem[]>([])

  const authUser = useRecoilValue(authUserState)
  const organizationType = authUser.organizationType

  useEffect(() => {
    setCurrentPage(0);
    let temp_arr = [...items]

    setTableItems(temp_arr.sort((a, b) => {
      let lhs, rhs;
      if (currentSort.name === 'createdAt' || currentSort.name === 'updatedAt') {
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

  useEffect(() => {
    setCurrentCnt(Math.min(items.length - currentPage * pageSize, pageSize));
  }, [currentPage, pageSize, items]);

  // PROFILE TOGGLE SECTION
  const [isProfilebarOpen, setIsProfilebarOpen] = useState(false)
  const [userId, setUserId] = useState(null)

  const handleToggleBar = () => {   // Click outside of UserProfile Part
    setIsProfilebarOpen(!isProfilebarOpen);
  }

  const toggleProfileBar = useCallback((id: string) => {    // Click userObject on Private User Table
    setUserId(id)
    setIsProfilebarOpen(!isProfilebarOpen)
  }, [isProfilebarOpen])    // PROFILE TOGGLE SECTION

  return (
    organizationType ? (
      <div className="flex flex-col">
        {isLoading && <Loading />}
        <div className="flex flex-wrap gap-3 justify-between items-center px-[10px] py-5">
          <div className="flex items-baseline gap-1 text-core-blue">
            <span className="text-h4 pc:text-h2">{currentCnt}</span>
            <span className="text-mini pc:text-small">名</span>
            <span className="text-mini pc:text-small">{`(総登録者 : ${items.length}名)`}</span>
          </div>
          <TablePagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={pageSize} items={items} />
        </div>
        <div className="px-[10px] rounded-lg bg-gray-white overflow-auto">
          <table className="w-[800px] pc:w-full">
            <TableHeader currentSort={currentSort} setCurrentSort={setCurrentSort} />
            <tbody>
              {tableItems.length > 0 ? (
                tableItems.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((item, index) => (
                  <TableRow key={index}
                    item={item}
                    authority={organizationType === '公的機関'}
                    onClick={toggleProfileBar}
                  />
                ))
              ) :
                <tr>
                  <td colSpan={9} className="py-5 text-center text-gray-gray_dark">
                    データはありません。
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <ProfilePage
          userId={userId}
          isProfilebarOpen={isProfilebarOpen}
          handleToggleBar={handleToggleBar}
          authority={organizationType === '公的機関'}
          setIsLoading={setIsLoading}
        />
      </div>
    ) : <></>
  )
}


export default Table;