'use client'

import { AiFillWarning } from "react-icons/ai";
interface Props {
  applyType: string
  attention?: boolean
}

export const HowToApply = (props: Props) => {
  const {applyType, attention = false} = props;

  return (
    <div className="relative inline-flex items-center justify-center w-[58px] py-[2px] rounded-[20px] bg-gray-gray">
      <span className="text-timestamp">{applyType}</span>
      {attention && (
        <AiFillWarning className="absolute w-3 text-core-red -right-[6px] -bottom-1" />
      )}
    </div>
  );
};