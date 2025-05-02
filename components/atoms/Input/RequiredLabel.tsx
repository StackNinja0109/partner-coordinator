'use client'

import React from "react";

export interface RequiredLabelProps {
  required: boolean;
}

export const RequiredLabel = ({ required }: RequiredLabelProps) => {
  const backgroundColor =
    required ? "bg-core-red ": "bg-gray-gray_dark";

  return (
    <div
      className={
        "rounded-[3px] py-[2px] px-[6px] inline-flex text-mini text-gray-white " +
        backgroundColor
      }
    >
      {required ? "必須" : "任意"}
    </div>
  );
};
