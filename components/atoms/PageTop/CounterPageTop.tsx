'use client'

import { ArrowIcon, ArrowIconType } from "@/components/parts";
import React, { useState } from "react";

export interface CounterPageTopProps {
  step?: number;
  totalNumber: number;
}

export const CounterPageTop = ({
  step = 50,
  totalNumber,
}: CounterPageTopProps) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const nextPage = () => {
    setCurrentNumber(currentNumber + step);
  };
  const prevPage = () => {
    setCurrentNumber(currentNumber - step);
  };
  return (
    <div className="flex flex-row gap-5">
      <div className="flex flex-row gap-[2px] font-bold text-xs">
        <p>
          {currentNumber}-{" "}
          {currentNumber + step < totalNumber
            ? currentNumber + step - 1
            : totalNumber}
        </p>
        <p>/</p>
        <p>{totalNumber}</p>
      </div>
      {totalNumber > 50 ? (
        <>
          <ArrowIcon
            type={ArrowIconType.PREV}
            onClick={prevPage}
            disabled={currentNumber == 1}
          />
          <ArrowIcon
            type={ArrowIconType.NEXT}
            onClick={nextPage}
            disabled={currentNumber + step > totalNumber}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
