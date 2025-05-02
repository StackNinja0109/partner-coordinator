'use client'

import Counter from "@/components/atoms/Table/Counter";

interface CountersProps {
  className?: string,
  recruitCount: number | string,
  adoptCount: number | string,
  selectCount: number | string,
}

const Counters: React.FC<CountersProps> = ({ className = '', recruitCount, adoptCount, selectCount}) => {
  return (
    <div className={`inline-flex items-center py-1 bg-gray-gray_light rounded ${className}`}>
      <Counter className="pl-[10px] pr-4" label="募集" count={recruitCount} />
      <span className="inline-block w-[1px] h-[23px] bg-gray-gray"></span>
      <Counter className="pl-[10px] pr-4" label="採用" count={adoptCount} />
      <span className="inline-block w-[1px] h-[23px] bg-gray-gray"></span>
      <Counter className="pl-[10px] pr-4" label="選考" count={selectCount} />
    </div>
  );
};

export default Counters;