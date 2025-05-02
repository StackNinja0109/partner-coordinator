'use client'

import { useEffect, useState } from "react"
import { CandidateItem } from "./CandidateDataTable"
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md"

export interface CandidateDataTablePaginationProps{
  candidates: CandidateItem[]
  currentPage: number,
  setCurrentPage: (page: number) => void
}

const CandidateDataTablePagination = ({currentPage, setCurrentPage, candidates} : CandidateDataTablePaginationProps) =>{
  const [pageLength, setPageLength] = useState(0)

  useEffect(()=>{
    if(candidates.length == 0)
      setPageLength(0)
    else{
      setPageLength(Math.ceil(candidates.length / 7))
    }
  }, [candidates])

  if(candidates.length == 0){
    return <div></div>
  }

  const arrayRange = (start:number, stop:number, step:number) =>
    Array.from(
    { length: (stop - start) / step },
    (value, index) => start + index * step
  );

  return(
    <div className="">
      <div className="mt-[10px] flex items-center justify-center space-x-[20px]">
          <MdArrowBackIosNew className={`text-[14px] pc:text-[18px] ${currentPage === 0 ? "opacity-30" : "cursor-pointer"}`} onClick={()=>setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}/>

          <div className="flex items-center justify-center gap-7 pc:gap-10">
            {arrayRange(0, pageLength, 1).map((page, index) => {
              let show_flag = false
             
              if (page == 0) {
                if (currentPage > 1)
                  show_flag = false
                else
                  show_flag = true
              }
              
              if (page == pageLength-1){
                if (currentPage < pageLength -2)
                  show_flag = false
                else
                  show_flag = true
              }

              if (Math.abs(page-currentPage) <= 2){
                show_flag = true
              } else{
                show_flag = false
              }
              
              if (page == 0) {
                show_flag = true
              }

              if (page == pageLength - 1) {
                show_flag = true
              }

              if (show_flag)
                return <span key={index} className={`${currentPage == page ? "" : "opacity-30" } cursor-pointer font-bold text-h2`} onClick={()=>setCurrentPage(page)}>{page + 1}</span>
              else if(page == 1 || page == pageLength - 2)
                return <span key={index} className={`cursor-pointer font-bold text-h4 pc:text-h2`}>...</span>
              else
                return <span key={index}></span>
              
            })}
          </div>
          
          <MdArrowForwardIos className={`text-[14px] pc:text-[18px] ${currentPage === pageLength - 1 ? "" : "opacity-30"}`} onClick={()=>setCurrentPage(currentPage < pageLength - 1 ? currentPage + 1 : pageLength - 1)}/>
      </div>
    </div>
  )
}


export default CandidateDataTablePagination