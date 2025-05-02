'use client'

import { useView } from "@/hooks";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HelpIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM6.5 9.5H5.5V8.5H6.5V9.5ZM7.535 5.625L7.085 6.085C6.835 6.34 6.655 6.57 6.565 6.93C6.525 7.09 6.5 7.27 6.5 7.5H5.5V7.25C5.5 7.02 5.54 6.8 5.61 6.595C5.71 6.305 5.875 6.045 6.085 5.835L6.705 5.205C6.935 4.985 7.045 4.655 6.98 4.305C6.915 3.945 6.635 3.64 6.285 3.54C5.73 3.385 5.215 3.7 5.05 4.175C4.99 4.36 4.835 4.5 4.64 4.5H4.49C4.2 4.5 4 4.22 4.08 3.94C4.295 3.205 4.92 2.645 5.695 2.525C6.455 2.405 7.18 2.8 7.63 3.425C8.22 4.24 8.045 5.115 7.535 5.625Z"
        fill="#FDFDFD"
      />
    </svg>
  );
};

const MenuBookIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75244 1.83875C7.77744 1.83875 6.72744 2.03875 6.00244 2.58875C5.27744 2.03875 4.22744 1.83875 3.25244 1.83875C2.52744 1.83875 1.75744 1.94875 1.11244 2.23375C0.747441 2.39875 0.502441 2.75375 0.502441 3.15875V8.79875C0.502441 9.44875 1.11244 9.92875 1.74244 9.76875C2.23244 9.64375 2.75244 9.58875 3.25244 9.58875C4.03244 9.58875 4.86244 9.71875 5.53244 10.0487C5.83244 10.1987 6.17244 10.1987 6.46744 10.0487C7.13744 9.71375 7.96744 9.58875 8.74744 9.58875C9.24744 9.58875 9.76744 9.64375 10.2574 9.76875C10.8874 9.93375 11.4974 9.45374 11.4974 8.79875V3.15875C11.4974 2.75375 11.2524 2.39875 10.8874 2.23375C10.2474 1.94875 9.47744 1.83875 8.75244 1.83875ZM10.5024 8.20374C10.5024 8.51874 10.2124 8.74874 9.90244 8.69374C9.52744 8.62374 9.13744 8.59375 8.75244 8.59375C7.90244 8.59375 6.67744 8.91875 6.00244 9.34375V3.58875C6.67744 3.16375 7.90244 2.83875 8.75244 2.83875C9.21244 2.83875 9.66744 2.88375 10.1024 2.97875C10.3324 3.02875 10.5024 3.23375 10.5024 3.46875V8.20374Z"
        fill="#FDFDFD"
      />
      <path
        d="M6.99244 5.09375C6.83244 5.09375 6.68744 4.99375 6.63744 4.83375C6.57244 4.63875 6.68244 4.42375 6.87744 4.36375C7.64744 4.11375 8.64244 4.03375 9.55744 4.13875C9.76244 4.16375 9.91244 4.34875 9.88744 4.55375C9.86244 4.75875 9.67744 4.90875 9.47244 4.88375C8.66244 4.78875 7.77744 4.86374 7.10744 5.07874C7.06744 5.08375 7.02744 5.09375 6.99244 5.09375Z"
        fill="#FDFDFD"
      />
      <path
        d="M6.99244 6.42375C6.83244 6.42375 6.68744 6.32374 6.63744 6.16374C6.57244 5.96874 6.68244 5.75375 6.87744 5.69375C7.64244 5.44375 8.64244 5.36375 9.55744 5.46875C9.76244 5.49375 9.91244 5.67875 9.88744 5.88375C9.86244 6.08875 9.67744 6.23875 9.47244 6.21375C8.66244 6.11875 7.77744 6.19375 7.10744 6.40875C7.06744 6.41875 7.02744 6.42375 6.99244 6.42375Z"
        fill="#FDFDFD"
      />
      <path
        d="M6.99244 7.75375C6.83244 7.75375 6.68744 7.65375 6.63744 7.49375C6.57244 7.29875 6.68244 7.08375 6.87744 7.02375C7.64244 6.77375 8.64244 6.69375 9.55744 6.79875C9.76244 6.82375 9.91244 7.00875 9.88744 7.21375C9.86244 7.41875 9.67744 7.56375 9.47244 7.54375C8.66244 7.44875 7.77744 7.52374 7.10744 7.73874C7.06744 7.74874 7.02744 7.75375 6.99244 7.75375Z"
        fill="#FDFDFD"
      />
    </svg>
  );
};

const SecurityIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.595 0.633125L2.095 2.18812C1.735 2.34812 1.5 2.70813 1.5 3.10313V5.45312C1.5 8.22813 3.42 10.8231 6 11.4531C8.58 10.8231 10.5 8.22813 10.5 5.45312V3.10313C10.5 2.70813 10.265 2.34812 9.905 2.18812L6.405 0.633125C6.15 0.518125 5.85 0.518125 5.595 0.633125ZM6 5.94812H9.5C9.235 8.00812 7.86 9.84313 6 10.4181V5.95312H2.5V3.10313L6 1.54813V5.94812Z"
        fill="#FDFDFD"
      />
    </svg>
  );
};

export const SchoolHeader = () => {
  const system_name = "{system_name}";
  const view = useView();

  const [open, setOpen] = React.useState(false);

  return view == "PC" ? (
    <div className="flex flex-row items-center justify-between py-[10px] px-10 gap-[10px] bg-core-blue_dark text-gray-white">
      <div className="text-h1 hover:cursor-pointer">{system_name}</div>
      <div className="flex flex-row items-center gap-5 text-timestamp">
        <div className="flex flex-row items-center gap-1 hover:cursor-pointer">
          <HelpIcon />
          <div>よくある質問</div>
        </div>
        <div className="flex flex-row items-center gap-1 hover:cursor-pointer">
          <MenuBookIcon />
          <div>利用規約</div>
        </div>
        <div className="flex flex-row items-center gap-1 hover:cursor-pointer">
          <SecurityIcon />
          <div>プライバシーポリシー</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-row items-center justify-between py-[10px] px-10 gap-[10px] bg-core-blue_dark text-gray-white">
      <div className="text-h1 hover:cursor-pointer">{system_name}</div>
      <div className="inset-y-0 left-0 flex items-center ">
        <button
          type="button"
          className="inline-flex items-center justify-center w-8 h-8 p-2 rounded-md text-gray-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={() => setOpen(!open)}
        >
          {!open ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faXmark} />
          )}
        </button>
      </div>
      {open && (
        <div className="absolute top-0 left-0 z-10 flex flex-col items-center w-full gap-4 py-4 mt-14 text-timestamp bg-core-blue_dark">
          <div className="flex flex-row items-center gap-1 hover:cursor-pointer">
            <HelpIcon />
            <div>よくある質問</div>
          </div>
          <div className="flex flex-row items-center gap-1 hover:cursor-pointer">
            <MenuBookIcon />
            <div>利用規約</div>
          </div>
          <div className="flex flex-row items-center gap-1 hover:cursor-pointer">
            <SecurityIcon />
            <div>プライバシーポリシー</div>
          </div>
        </div>
      )}
    </div>
  );
};
