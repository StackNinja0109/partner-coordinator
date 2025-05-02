'use client'

import { MdHelp } from "react-icons/md";

export const CoordinatorLoginHeader = () => {
  const system_name = "スポーツ・カルチャー人材バンク";

  return (
    <header id="header" className="flex flex-row items-center justify-between pc:px-10 px-[10px] pc:py-[14.5px] py-[23.5px] bg-core-blue_dark text-gray-white">
      <a href="#" className="pc:text-h1 text-small"><h1>{system_name}</h1></a>
      <div className="flex flex-row items-center gap-5 pc:text-timestamp text-mini">
        <a href="#" className="flex flex-row items-center gap-1 hover:cursor-pointer">
          <span className="pc:text-[12px] text-[20px]"><MdHelp /></span>
          <div className="hidden pc:block">ヘルプ</div>
        </a>
      </div>
    </header>
  );
};