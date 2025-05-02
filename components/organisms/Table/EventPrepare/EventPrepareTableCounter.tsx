'use client'

import React, { useEffect, useState } from "react";
import { ArrowIcon, ArrowIconType } from "@/components/parts";

interface TableCounterProps{
  currentPage: number
  setCurrentPage: (page: number) => void
  pageSize: number
  itemsLength: number
}

const EventPrepareTableCounter: React.FC<TableCounterProps> = ({
  currentPage,
  setCurrentPage,
  pageSize,
  itemsLength,
}) => {
  const [pageLength, setPageLength] = useState(0);

  useEffect(() => {
    setPageLength(Math.ceil(itemsLength / pageSize));
  }, [itemsLength, pageSize]);

  const onPrevClick = () => {
    setCurrentPage(Math.max(currentPage - 1, 0))
  }

  const onNextClick = () => {
    setCurrentPage(Math.min(currentPage + 1, pageLength - 1))
  }

  if (itemsLength === 0) {
    return (
      <div className="h-[18px]"></div>
    );
  }
  
  const startIndex = currentPage * pageSize + 1;
  const endIndex =
    currentPage !== pageLength - 1 ? (currentPage + 1) * pageSize : itemsLength;

  return(
    <div className="flex gap-5">
      <div className="flex items-end gap-[2px] text-small">
        <span>
          {startIndex}-{endIndex}
        </span>
        <span>/</span>
        <span>{itemsLength}</span>
      </div>
      {itemsLength > pageSize ? (
        <>
          <ArrowIcon
            type={ArrowIconType.PREV}
            onClick={onPrevClick}
            disabled={currentPage == 0}
          />
          <ArrowIcon
            type={ArrowIconType.NEXT}
            onClick={onNextClick}
            disabled={currentPage == pageLength - 1}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}


export default EventPrepareTableCounter;