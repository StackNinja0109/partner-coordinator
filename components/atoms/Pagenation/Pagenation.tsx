'use client'

import { ArrowIcon, ArrowIconType } from "@/components/parts";
import React, { useState } from "react";

export interface PagenationProps {
  totalNumber: number;
}

export const Pagenation = ({ totalNumber }: PagenationProps) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const nextPage = () => {
    setCurrentNumber(currentNumber + 1);
  };
  const prevPage = () => {
    setCurrentNumber(currentNumber - 1);
  };
  const pages = [];

  for (let index = 0; index < 5; index++) {
    if (currentNumber <= totalNumber - 4) {
      if (currentNumber >= totalNumber - 4) {
        pages.push(
          <div
            key={index}
            className={
              "cursor-pointer " +
              (currentNumber == currentNumber + index
                ? ""
                : " text-gray-gray_dark")
            }
            onClick={() => setCurrentNumber(currentNumber + index)}
          >
            {currentNumber + index}
          </div>
        );
      } else {
        if (index == 3) {
          pages.push(<div 
          key={index}
          className=" text-gray-gray_dark">...</div>);
        } else if (index == 4) {
          pages.push(
            <div
              key={index}
              className={
                "cursor-pointer " +
                (currentNumber == currentNumber + index
                  ? ""
                  : " text-gray-gray_dark")
              }
              onClick={() => setCurrentNumber(totalNumber)}
            >
              {totalNumber}
            </div>
          );
        } else {
          pages.push(
            <div
              key={index}
              className={
                "cursor-pointer " +
                (currentNumber == currentNumber + index
                  ? ""
                  : " text-gray-gray_dark")
              }
              onClick={() => setCurrentNumber(currentNumber + index)}
            >
              {currentNumber + index}
            </div>
          );
        }
      }
    } else {
      pages.push(
        <div
          key={index}
          className={
            "cursor-pointer " +
            (currentNumber == currentNumber + index
              ? ""
              : " text-gray-gray_dark")
          }
          onClick={() => setCurrentNumber(totalNumber + index - 4)}
        >
          {totalNumber + index - 4}
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="flex flex-row gap-1 text-body">
        <div>1ページ目</div>
        <div>(全524件)</div>
      </div>
      <div className="flex flex-row gap-[30px] items-center">
        <ArrowIcon
          type={ArrowIconType.PREV}
          onClick={prevPage}
          disabled={currentNumber == 1}
        />
        <div className="flex flex-row gap-10 text-h2">{pages}</div>
        <ArrowIcon
          type={ArrowIconType.NEXT}
          onClick={nextPage}
          disabled={currentNumber > totalNumber - 5}
        />
      </div>
    </div>
  );
};
