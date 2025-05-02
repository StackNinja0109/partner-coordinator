'use client'

import React from "react";

export enum CounterType {
  DEFAULT,
  DISABLED,
  ERROR,
}

export interface CounterProps {
  status?: CounterType;
  currentNumber: number;
  totalNumber?: number;
}

export const Counter = ({
  status = CounterType.DEFAULT,
  currentNumber,
  totalNumber = 100,
}: CounterProps) => {
  let textStyle = "";
  switch (status) {
    case CounterType.DEFAULT:
      textStyle = "text-gray-black";
      break;
    case CounterType.DISABLED:
      textStyle = "text-gray-black opacity-40";
      break;
    case CounterType.ERROR:
      textStyle = "text-core-red";
      break;
  }
  return (
    <div className={"text-timestamp " + textStyle}>
      {currentNumber + "/" + totalNumber}
    </div>
  );
};
