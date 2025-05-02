'use client'

import { useEffect, useState } from "react"
import { SelectionItem } from "./SelectionDataTable"
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md"
import { useRecoilState } from "recoil"
import { projectSelectionPaginationAtom } from "@/recoil/atom/projectSelectionAtom"

export interface SelectionDataTablePaginationProps {
  numberOfSelections: number
  currentPage: number,
  setCurrentPage: (page: number) => void
  pageSize: number
}


const SelectionDataTablePagination = ({ currentPage, setCurrentPage, pageSize, numberOfSelections }: SelectionDataTablePaginationProps) => {
  const [pageLength, setPageLength] = useState(0)
  const [pagination, setPagination] = useRecoilState(projectSelectionPaginationAtom);

  useEffect(() => {
    setPageLength(Math.ceil(numberOfSelections / pageSize))
  }, [pageSize, numberOfSelections])

  useEffect(() => {
    setPagination({
      numberOfSelections: numberOfSelections,
      currentPage: currentPage,
      pageSize: pageSize,
    })
  }, [numberOfSelections, currentPage, pageSize, setPagination])

  if (numberOfSelections == 0) {
    return <div></div>
  }
  const arrayRange = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step},
      (value, index) => start + index * step
    );

  return (
    <div className="mt-10">
      <div className="flex items-center justify-center space-x-1 font-medium text-timestamp pc:text-body_sp text-gray-black">
        <span>{currentPage + 1}ページ目</span>
        <span>(全{numberOfSelections}件)</span>
      </div>
      <div className="mt-[10px] flex items-center justify-center gap-5 pc:gap-[30px]">
      <MdArrowBackIosNew className={`text-[14px] pc:text-[18px] ${currentPage === 0 ? "opacity-30" : "cursor-pointer"}`} onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)} />

      <div className="flex items-center justify-center gap-5 pc:gap-10">
          {arrayRange(0, pageLength, 1).map((page, index) => {
            let show_flag = false

            if (page == 0) {
              if (currentPage > 1)
                show_flag = false
              else
                show_flag = true
            }

            if (page == pageLength - 1) {
              if (currentPage < pageLength - 2)
                show_flag = false
              else
                show_flag = true
            }

            if (Math.abs(page - currentPage) <= 2) {
              show_flag = true
            } else {
              show_flag = false
            }

            if (page == 0) {
              show_flag = true
            }

            if (page == pageLength - 1) {
              show_flag = true
            }

            if (show_flag)
              return <span key={index} className={`${currentPage == page ? "" : "opacity-30"} cursor-pointer font-bold text-h4 pc:text-h2`} onClick={() => setCurrentPage(page)}>{page + 1}</span>
            else if (page == 1 || page == pageLength - 2)
              return <span key={index} className={`cursor-pointer font-bold text-h4 pc:text-h2`}>...</span>
            else
              return null

          })}
        </div>

        <MdArrowForwardIos className={`text-[14px] pc:text-[18px] ${currentPage === pageLength - 1 ? "opacity-30" : "cursor-pointer"}`} onClick={() => setCurrentPage(currentPage < pageLength - 1 ? currentPage + 1 : pageLength - 1)} />
      </div>
    </div>
  )
}


export default SelectionDataTablePagination