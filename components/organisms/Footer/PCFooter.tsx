'use client'

import React from "react";
import { MdCopyright } from "react-icons/md";

interface PCFooterProps {
  className?: string;
}

export const PCFooter: React.FC<PCFooterProps> = ({ className = '' }) => {
  return (
    <footer className={`flex flex-col py-5 px-[10px] z-40 mt-10 text-center ${className}`}>
      <div className="flex flex-row gap-[2px] justify-center items-center text-timestamp text-gray-black">
        <MdCopyright size={14} />
        <div>ASFEEL Inc.All Right Reserved.</div>
      </div>
    </footer>
  );
};
