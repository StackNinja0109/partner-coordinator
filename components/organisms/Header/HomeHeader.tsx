'use client'

export const HomeHeader = () => {
  const system_name = "{system_name}";

  return (
    <div className="flex flex-row w-[360px] justify-between items-center p-[10px] bg-core-blue_dark">
      <div className=" text-gray-white text-small hover:cursor-pointer">{system_name}</div>
      <div className="flex flex-row gap-[10px] items-start">
        <button
          className="py-[6px] px-3 flex flex-row justify-center gap-[2px] rounded-[100px]  bg-core-sky text-mini
         text-gray-white"
        >
          はじめる
        </button>
        <button
          className="py-[6px] px-3 flex flex-row justify-center gap-[2px] rounded-[100px]  bg-gray-white text-mini
         text-core-blue_dark border border-core-blue_dark"
        >
          ログイン
        </button>
      </div>
    </div>
  );
};
