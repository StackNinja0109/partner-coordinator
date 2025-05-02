'use client'

import React from "react";
import { CopyrightIcon } from "./DefautlFooter";

const SecurityIcon = () => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.96 0.844126L3.29333 2.91746C2.81333 3.13079 2.5 3.61079 2.5 4.13746V7.27079C2.5 10.9708 5.06 14.4308 8.5 15.2708C11.94 14.4308 14.5 10.9708 14.5 7.27079V4.13746C14.5 3.61079 14.1867 3.13079 13.7067 2.91746L9.04 0.844126C8.7 0.690793 8.3 0.690793 7.96 0.844126ZM8.5 7.93079H13.1667C12.8133 10.6775 10.98 13.1241 8.5 13.8908V7.93746H3.83333V4.13746L8.5 2.06413V7.93079Z"
        fill="#AFAFAF"
      />
    </svg>
  );
};

const TextSnippetIcon = () => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.94667 2H3.83333C3.1 2 2.5 2.6 2.5 3.33333V12.6667C2.5 13.4 3.1 14 3.83333 14H13.1667C13.9 14 14.5 13.4 14.5 12.6667V6.55333C14.5 6.2 14.36 5.86 14.1067 5.61333L10.8867 2.39333C10.64 2.14 10.3 2 9.94667 2ZM5.83333 10H11.1667C11.5333 10 11.8333 10.3 11.8333 10.6667C11.8333 11.0333 11.5333 11.3333 11.1667 11.3333H5.83333C5.46667 11.3333 5.16667 11.0333 5.16667 10.6667C5.16667 10.3 5.46667 10 5.83333 10ZM5.83333 7.33333H11.1667C11.5333 7.33333 11.8333 7.63333 11.8333 8C11.8333 8.36667 11.5333 8.66667 11.1667 8.66667H5.83333C5.46667 8.66667 5.16667 8.36667 5.16667 8C5.16667 7.63333 5.46667 7.33333 5.83333 7.33333ZM5.83333 4.66667H9.16667C9.53333 4.66667 9.83333 4.96667 9.83333 5.33333C9.83333 5.7 9.53333 6 9.16667 6H5.83333C5.46667 6 5.16667 5.7 5.16667 5.33333C5.16667 4.96667 5.46667 4.66667 5.83333 4.66667Z"
        fill="#AFAFAF"
      />
    </svg>
  );
};

export const TopFooter = () => {
  return (
    <div className="flex flex-col gap-[10px] px-[10px] py-4 w-[360px] text-mini text-gray-gray_dark bg-gray-white border  border-gray-gray">
      <div className="flex flex-row items-start justify-center ">
        <div className="flex flex-row gap-[2px] px-[10px] items-center">
          <TextSnippetIcon />
          <div>利用規約</div>
        </div>
        <div className="w-[1px] h-4 bg-gray-gray_dark"></div>
        <div className="flex flex-row gap-[2px] px-[10px] items-center">
          <SecurityIcon />
          <div>プライバシーポリシー</div>
        </div>
      </div>
      <div className="flex flex-row gap-[2px] justify-center items-center">
        <CopyrightIcon />
        <div>ASFEEL Inc.All Right Reserved.</div>
      </div>
    </div>
  );
};
