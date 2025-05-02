'use client'

import { useEffect, useState } from "react"
import { TableItem } from "./Table"
import { ArrowIcon, ArrowIconType } from "@/components/parts";

export interface TablePaginationProps{
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  items: TableItem[];
}

const TablePagination = ({currentPage, setCurrentPage, pageSize, items} : TablePaginationProps) =>{
  const [pageLength, setPageLength] = useState(0)

  useEffect(() => {
    if(items.length == 0)
      setPageLength(0)
    else{
      setPageLength(Math.ceil(items.length / pageSize))
    }
  }, [items, pageSize])

  const onPrevClick = () => {
    setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)
  }

  const onNextClick = () => {
    setCurrentPage(currentPage < pageLength - 1 ? currentPage + 1 : pageLength - 1)
  }

  if (items.length === 0) {
    return <div></div>
  }

  return(
    <div className="">
      <div className="flex items-center gap-2 pc:gap-5">
        <div className="flex items-end gap-[2px] text-small">
          <span>
            {currentPage * pageSize + 1}-{" "}
            {Math.min(pageSize * (currentPage + 1), items.length)}
          </span>
          <span>/</span>
          <span>{items.length}</span>
        </div>
        {items.length > pageSize ? (
          <>
            <ArrowIcon
              type={ArrowIconType.PREV}
              onClick={onPrevClick}
              disabled={currentPage == 0}
            />
            <ArrowIcon
              type={ArrowIconType.NEXT}
              onClick={onNextClick}
              disabled={currentPage == pageLength-1}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}


export default TablePagination;